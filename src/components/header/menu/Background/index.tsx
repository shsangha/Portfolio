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
precision highp float;
uniform vec2 res;
uniform float time;

#define PI 3.141592657

mat2 rot2D(float a){
float c =cos(a);
float s = sin(a);

return mat2(c,s,-s,c);
}

vec3 getColor(float v){
float r = cos((v-.02)*PI);
float g = cos((v-10.02)*PI);
float b = cos((v-0.0,1.0,0.0)*PI);

return vec3(r,g,b);
}

// 	vec3 getColor(float v){
//  float r = v*1.0;
// 	// r = smoothstep(0.,1.,r);
//  float g = v*1.0;
//  float b = 0.0;

//  return vec3(r,g,b);
// }

vec2 hash2(vec2 uv){
float drive = 1.0+time*0.1*PI;
float r = fract(sin(dot(uv,vec2(3.7345236,PI))*PI*128493.0));
float r1 = fract(sin(dot(uv,vec2(r,PI))*PI*14327.0));

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
float freq = 0.2;
float ampli = 5.0;
float ret   = 0.9;
for (int i=0;i<8;i++){
 ret+= noise2D(uv*freq)*ampli;
 //0.3425617
 uv +=vec2(ret,ret);
 //freq*=ret;
 freq*=2.0;
 ampli*=0.65;
}
return ret;
}

void main( void ) {

// Normalized pixel coordinates (from 0 to 1)
vec2 uv = gl_FragCoord.xy/res.xy-vec2(.5);
float as =  res.x/res.y;
uv.x*=as;

// Time varying pixel color
vec3 col = vec3(2.0);

float a = atan(uv.y,uv.x);
uv *= 2.;
float v = fbm(uv*4.);
col = getColor(v*.3 );
col = smoothstep(0.,1.,col);
col = pow(col,vec3(0.8));
// Output to screen

    gl_FragColor = vec4(col,1.0);

} `

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
    const { width, height } = container.current!.getBoundingClientRect()

    const camera = new OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    )
    camera.position.z = 1

    const renderer = new WebGLRenderer({ canvas: canvas.current! })
    renderer.setClearColor("black", 0)

    renderer.setSize(width, height)

    const plane = new PlaneBufferGeometry(width, height)

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

      const { width, height } = container.current!.getBoundingClientRect()

      renderer.setSize(width, height)
    }

    const recursiveAnimation = () => {
      animationFrameID = requestAnimationFrame(recursiveAnimation)

      shaderMat.uniforms.time.value += 0.025

      renderer.render(scene, camera)
    }

    window.addEventListener("resize", handleResize)

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
