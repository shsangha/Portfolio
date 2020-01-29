import React, { createRef, useEffect, RefObject } from "react"
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneBufferGeometry,
  Mesh,
  ShaderMaterial,
  Vector2,
  Color,
} from "three"
import "./style.scss"

const vertexShader = `void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}`

const fragmentShader = `   


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 res;
uniform float time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}


float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 7
#define PI 3.141592657

mat2 rot2D(float a){
 float c =cos(a);
 float s = sin(a);

 return mat2(c,s,-s,c);
}


vec2 hash2(vec2 uv){
 float drive = time;
 float r = fract(sin(dot(uv,vec2(3.239,PI))*PI*128493.200));
 float r1 = floor(sin(dot(uv,vec2(r,PI))*PI*14327.368));

 return vec2(r,r1)*rot2D(drive);
}


float noise2D(vec2 uv){
 vec2 p = floor(uv);
 vec2 f = fract(uv);
 vec2 e = vec2(1,0);
 vec2 p00 = p;
 vec2 p10 = p+e;
 vec2 p11 = p+e.xx;
 vec2 p01 = p+e.yx;
 float v00 = dot(f-e.yy,hash2(p00));
 float v10 = dot(f-e.xy,hash2(p10));
 float v11 = dot(f-e.xx,hash2(p11));
 float v01 = dot(f-e.yx,hash2(p01));

 f = f*f*f*(f*(f*6.-15.)+10.);

 return mix(mix(v00,v10,f.x),mix(v01,v11,f.x),f.y);
}


float fbm(vec2 uv){
  float freq = 0.320;
  float ampli = 3.784;
  float ret   = 2.052;
  for (int i=0;i< NUM_OCTAVES;i++){
     ret+= noise2D(uv*freq)*ampli;
     //0.3425617
     //freq*=ret;
     freq*=1.8;
     ampli*=0.612;
  }
  return ret;
}
void main() {
  vec2 st = gl_FragCoord.xy/res.xy*3.;
  // st += st * abs(sin(time*0.1)*3.0);
  vec3 color = vec3(0.416,0.438,0.940);

  vec2 q = vec2(-0.400,0.570);
  q.x = fbm( st + 0.00*time);
  q.y = fbm( st + vec2(1.0));

  vec2 r = vec2(0.);
  r.x = fbm( st + 1.3*q + vec2(-0.150,-0.110)+ 1.024*time );
  r.y = fbm( st + 1.2*q + vec2(0.930,0.740)+ 0.992*time);

  float f = fbm(st+r);

  color = mix(vec3(0.033,0.097,0.565),
              vec3(0.033,0.085,0.600),
              clamp((f*f)*1.288,0.0,1.));

  color = mix(color,
              vec3(0.011,0.012,0.015),
              clamp(length(q),0.0,.1));

  color = mix(color,
              vec3(0.005,0.008,0.050),
              clamp(length(r.x),0.0,.8));

  gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
}


`

export default () => {
  const canvas: RefObject<HTMLCanvasElement> = createRef() as RefObject<
    HTMLCanvasElement
  >

  const container: RefObject<HTMLDivElement> = createRef() as RefObject<
    HTMLDivElement
  >

  let animationFrameID: number

  useEffect(() => {
    const scene = new Scene()
    scene.background = new Color("black")

    const { innerHeight, innerWidth } = window

    const camera = new OrthographicCamera(
      innerWidth / -2,
      innerWidth / 2,
      innerHeight / 2,
      innerHeight / -2,
      1,
      1000
    )
    camera.position.z = 1

    const renderer = new WebGLRenderer({ canvas: canvas.current! })

    renderer.setSize(innerWidth, innerHeight)

    const plane = new PlaneBufferGeometry(innerWidth, innerHeight)

    const shaderMat = new ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        time: { value: Math.random() * Math.PI * 2 + Math.PI },
        res: {
          value: new Vector2(window.innerWidth, window.innerHeight),
        },
      },
    })

    const quad = new Mesh(plane, shaderMat)

    scene.add(quad)

    const handleResize = () => {
      camera.updateProjectionMatrix()

      if (container.current) {
        const { innerHeight, innerWidth } = window

        renderer.setSize(innerWidth, innerHeight)
      }
    }

    const recursiveAnimation = () => {
      animationFrameID = requestAnimationFrame(recursiveAnimation)

      shaderMat.uniforms.time.value += 0.025

      renderer.render(scene, camera)
    }

    window.addEventListener("resize", handleResize)

    handleResize()
    recursiveAnimation()

    return () => {
      window.cancelAnimationFrame(animationFrameID)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="three_container" ref={container}>
      <canvas className="three_canvas" ref={canvas} />
    </div>
  )
}
