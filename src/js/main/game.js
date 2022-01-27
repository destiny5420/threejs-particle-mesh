import * as THREE from 'three'
import $ from 'jquery'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import gsap from 'gsap'

import start from '@/images/main/star.png'

const ORBIT_CONTROL_ENABLE = false

export default class Game {
  constructor() {
    const self = this

    this.name = `Game Constructor`

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100)
    this.camera.position.z = 2
    this.camera.lookAt(0, 0, 0)

    this.scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    const material = new THREE.MeshNormalMaterial()

    this.mesh = new THREE.Mesh(geometry, material)

    // this.camera.lookAt(new THREE.Vector3(this.mesh.position))
    this.scene.add(this.mesh)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    if (ORBIT_CONTROL_ENABLE) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.autoRotate = true
      this.controls.update()
    }

    document.getElementById('web-gl').appendChild(this.renderer.domElement)

    this.points = null
    this.pointsGSAPs = []

    this.cameraGsap = gsap
      .timeline()
      .fromTo(
        this.camera.position,
        {
          z: 2,
        },
        {
          z: 50,
          duration: 1.75,
          ease: 'power1.out',
        },
      )
      .fromTo(
        this.camera.position,
        {
          y: 0,
        },
        {
          y: -40,
          duration: 1.75,
          ease: 'power1.out',
          onUpdate: () => {
            self.camera.lookAt(0, 0, 0)
          },
        },
        '-=1.75',
      )
      .pause()

    this.create()
    this.animation()

    // $('#web-gl').on('click', function (e) {
    //   self.pointsGSAPs.forEach((el) => el.restart())
    //   self.cameraGsap.restart()
    // })
    gsap.delayedCall(2, () => {
      self.pointsGSAPs.forEach((el) => el.restart())
      self.cameraGsap.restart()
    })
  }

  create() {
    const self = this

    const vertices = []
    for (let i = 0; i < 1500; i += 1) {
      const x = THREE.MathUtils.randFloatSpread(20)
      const y = THREE.MathUtils.randFloatSpread(20)
      const z = THREE.MathUtils.randFloatSpread(20)

      vertices.push(x, y, z)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const ball = new THREE.SphereGeometry(30, 30, 30)

    // const texStar = new THREE.TextureLoader().load(start)
    const matStar = new THREE.PointsMaterial({
      color: 0xffffff,
      // 粒子大小
      size: 0.25,
    })

    this.points = new THREE.Points(geometry, matStar)
    this.points.rotation.y = 0

    this.scene.add(this.points)

    const startPos = geometry.getAttribute('position')
    const destPos = ball.getAttribute('position')

    for (let i = 0; i < startPos.count; i += 1) {
      const cur = i % destPos.count

      this.pointsGSAPs.push(
        gsap.fromTo(
          startPos.array,
          {
            [i * 3]: startPos.array[i * 3],
            [i * 3 + 1]: startPos.array[i * 3 + 1],
            [i * 3 + 2]: startPos.array[i * 3 + 2],
          },
          {
            [i * 3]: destPos.array[cur * 3],
            [i * 3 + 1]: destPos.array[cur * 3 + 1],
            [i * 3 + 2]: destPos.array[cur * 3 + 2],
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              startPos.needsUpdate = true
            },
            paused: true,
          },
        ),
      )
    }

    // const fbxLoader = new FBXLoader()
    // fbxLoader.load('/src/images/model/guitar/guitar.FBX', function (obj) {
    //   console.log(obj.children[0].geometry.getAttribute('position'))
    //   const startPos = geometry.getAttribute('position')
    //   const destPos = obj.children[0].geometry.getAttribute('position')

    //   for (let i = 0; i < startPos.count; i += 1) {
    //     const cur = i % destPos.count

    //     self.pointsGSAPs.push(
    //       gsap.fromTo(
    //         startPos.array,
    //         {
    //           [i * 3]: startPos.array[i * 3],
    //           [i * 3 + 1]: startPos.array[i * 3 + 1],
    //           [i * 3 + 2]: startPos.array[i * 3 + 2],
    //         },
    //         {
    //           [i * 3]: destPos.array[cur * 3],
    //           [i * 3 + 1]: destPos.array[cur * 3 + 1],
    //           [i * 3 + 2]: destPos.array[cur * 3 + 2],
    //           duration: 2,
    //           ease: 'power2.out',
    //           onUpdate: () => {
    //             startPos.needsUpdate = true
    //           },
    //           paused: true,
    //         },
    //       ),
    //     )
    //   }
    // })
  }

  animation(time) {
    const self = this
    this.renderer.render(this.scene, this.camera)
    this.mesh.rotation.x += 0.05
    this.mesh.rotation.y += 0.01

    this.points.rotation.y += 0.01

    if (ORBIT_CONTROL_ENABLE) {
      this.controls.update()
    }

    requestAnimationFrame(function () {
      self.animation()
    })
  }
}
