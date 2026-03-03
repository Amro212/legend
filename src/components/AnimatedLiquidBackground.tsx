"use client";

import React, { useEffect, useRef, useMemo } from "react";

const PatternShapes = { Checks: 0, Stripes: 1, Edge: 2 };

const warpFragmentShader = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define PI 3.14159265358979323846
#define TWO_PI 6.283185307179586

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv_original = uv;

    float t = .5 * u_time;

    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);

    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);

    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

const vertexShaderSource = `#version 300 es
layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}`;

function hexToRgba(hex: string): [number, number, number, number] {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    if (hex.length === 6) hex += "ff";
    return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
        parseInt(hex.slice(6, 8), 16) / 255,
    ];
}

class ShaderMountVanilla {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    program: WebGLProgram | null = null;
    uniformLocations: Record<string, WebGLUniformLocation | null> = {};
    fragmentShader: string;
    rafId: number | null = null;
    lastFrameTime: number = 0;
    totalAnimationTime: number = 0;
    speed: number = 1;
    providedUniforms: Record<string, any>;
    hasBeenDisposed: boolean = false;
    resolutionChanged: boolean = true;
    resizeObserver: ResizeObserver | null = null;

    constructor(
        canvas: HTMLCanvasElement,
        fragmentShader: string,
        uniforms: Record<string, any> = {},
        webGlContextAttributes?: WebGLContextAttributes,
        speed: number = 1,
        seed: number = 0
    ) {
        this.canvas = canvas;
        this.fragmentShader = fragmentShader;
        this.providedUniforms = uniforms;
        this.totalAnimationTime = seed;

        const gl = canvas.getContext("webgl2", webGlContextAttributes);
        if (!gl) throw new Error("WebGL2 not supported");
        this.gl = gl;

        this.initWebGL();
        this.updateProvidedUniforms();
        this.setupResizeObserver();
        this.setSpeed(speed);
    }

    initWebGL = () => {
        const program = this.createProgram(this.gl, vertexShaderSource, this.fragmentShader);
        if (!program) return;
        this.program = program;

        const positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(positionAttributeLocation);
        this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);

        this.uniformLocations = {
            u_time: this.gl.getUniformLocation(this.program, "u_time"),
            u_pixelRatio: this.gl.getUniformLocation(this.program, "u_pixelRatio"),
            u_resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
            ...Object.fromEntries(
                Object.keys(this.providedUniforms).map((key) => [
                    key,
                    this.gl.getUniformLocation(this.program!, key),
                ])
            ),
        };
    };

    createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile error: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    createProgram = (gl: WebGL2RenderingContext, vsSource: string, fsSource: string) => {
        const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        if (!vertexShader || !fragmentShader) return null;

        const program = gl.createProgram();
        if (!program) return null;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link error: " + gl.getProgramInfoLog(program));
            return null;
        }
        return program;
    };

    setupResizeObserver = () => {
        this.resizeObserver = new ResizeObserver(() => this.handleResize());
        this.resizeObserver.observe(this.canvas);
        this.handleResize();
    };

    handleResize = () => {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
        const newWidth = Math.floor(this.canvas.clientWidth * pixelRatio);
        const newHeight = Math.floor(this.canvas.clientHeight * pixelRatio);
        if (this.canvas.width !== newWidth || this.canvas.height !== newHeight) {
            this.canvas.width = newWidth;
            this.canvas.height = newHeight;
            this.resolutionChanged = true;
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            this.render(performance.now());
        }
    };

    render = (currentTime: number) => {
        if (this.hasBeenDisposed || !this.program) return;
        const dt = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;
        if (this.speed !== 0) {
            this.totalAnimationTime += dt * this.speed;
        }

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this.program);
        this.gl.uniform1f(this.uniformLocations.u_time, this.totalAnimationTime * 0.001);

        if (this.resolutionChanged) {
            this.gl.uniform2f(this.uniformLocations.u_resolution, this.gl.canvas.width, this.gl.canvas.height);
            this.gl.uniform1f(this.uniformLocations.u_pixelRatio, Math.min(window.devicePixelRatio || 1, 1.25));
            this.resolutionChanged = false;
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

        if (this.speed !== 0) {
            this.requestRender();
        } else {
            this.rafId = null;
        }
    };

    requestRender = () => {
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        this.rafId = requestAnimationFrame(this.render);
    };

    updateProvidedUniforms = () => {
        if (!this.program) return;
        this.gl.useProgram(this.program);
        Object.entries(this.providedUniforms).forEach(([key, value]) => {
            const location = this.uniformLocations[key];
            if (location) {
                if (Array.isArray(value)) {
                    if (value.length === 2) this.gl.uniform2fv(location, value);
                    else if (value.length === 3) this.gl.uniform3fv(location, value);
                    else if (value.length === 4) this.gl.uniform4fv(location, value);
                } else if (typeof value === "number") {
                    this.gl.uniform1f(location, value);
                } else if (typeof value === "boolean") {
                    this.gl.uniform1i(location, value ? 1 : 0);
                }
            }
        });
    };

    setSeed = (newSeed: number) => {
        this.totalAnimationTime = newSeed * (1000 / 120);
        this.lastFrameTime = performance.now();
        this.render(performance.now());
    };

    setSpeed = (newSpeed: number = 1) => {
        this.speed = newSpeed;
        if (this.rafId === null && newSpeed !== 0) {
            this.lastFrameTime = performance.now();
            this.rafId = requestAnimationFrame(this.render);
        }
        if (this.rafId !== null && newSpeed === 0) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    };

    setUniforms = (newUniforms: Record<string, any>) => {
        this.providedUniforms = { ...this.providedUniforms, ...newUniforms };
        this.updateProvidedUniforms();
        this.render(performance.now());
    };

    dispose = () => {
        this.hasBeenDisposed = true;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
        if (this.gl && this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    };
}

export interface AnimatedLiquidBackgroundProps {
    color1?: string;
    color2?: string;
    color3?: string;
    scale?: number;
    rotation?: number;
    speed?: number;
    proportion?: number;
    softness?: number;
    distortion?: number;
    swirl?: number;
    swirlIterations?: number;
    shapeScale?: number;
    shape?: keyof typeof PatternShapes;
    seed?: number;
    className?: string;
}

export const AnimatedLiquidBackground = React.memo(function AnimatedLiquidBackground({
    color1 = "#0a0a0b",
    color2 = "#c9a96e",
    color3 = "#131315",
    scale = 0.52,
    rotation = 114,
    speed = 1.5,
    proportion = 45,
    softness = 80,
    distortion = 7,
    swirl = 18,
    swirlIterations = 16,
    shapeScale = 10,
    shape = "Edge",
    seed = 42,
    className = "",
}: AnimatedLiquidBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shaderMountRef = useRef<ShaderMountVanilla | null>(null);

    const uniforms = useMemo(() => {
        return {
            u_scale: scale,
            u_rotation: (rotation * Math.PI) / 180,
            u_color1: hexToRgba(color1),
            u_color2: hexToRgba(color2),
            u_color3: hexToRgba(color3),
            u_proportion: proportion / 100,
            u_softness: softness / 100,
            u_distortion: distortion / 50,
            u_swirl: swirl / 100,
            u_swirlIterations: swirl === 0 ? 0 : swirlIterations,
            u_shapeScale: shapeScale / 100,
            u_shape: PatternShapes[shape],
        };
    }, [
        scale,
        rotation,
        color1,
        color2,
        color3,
        proportion,
        softness,
        distortion,
        swirl,
        swirlIterations,
        shapeScale,
        shape,
    ]);

    useEffect(() => {
        if (canvasRef.current && !shaderMountRef.current) {
            shaderMountRef.current = new ShaderMountVanilla(
                canvasRef.current,
                warpFragmentShader,
                uniforms,
                { alpha: true, antialias: false },
                speed,
                seed
            );
        }
        return () => {
            shaderMountRef.current?.dispose();
            shaderMountRef.current = null;
        };
    }, []);

    useEffect(() => {
        shaderMountRef.current?.setUniforms(uniforms);
    }, [uniforms]);

    useEffect(() => {
        shaderMountRef.current?.setSpeed(speed);
    }, [speed]);

    useEffect(() => {
        shaderMountRef.current?.setSeed(seed);
    }, [seed]);

    return (
        <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
            {/* Optional subtle noise overlay to add texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")',
                    backgroundSize: '100px',
                    backgroundRepeat: 'repeat',
                }}
            />
        </div>
    );
});
