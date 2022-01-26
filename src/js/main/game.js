import * as THREE from 'three'
import $ from 'jquery'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import gsap from 'gsap'

import start from '@/images/main/star.png'

export default class Game {
  constructor() {
    const self = this

    this.name = `Game Constructor`

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100)
    this.camera.position.z = 50

    this.scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    const material = new THREE.MeshNormalMaterial()

    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.autoRotate = true
    this.controls.update()
    document.getElementById('web-gl').appendChild(this.renderer.domElement)

    this.points = null
    this.pointsGSAPs = []

    this.setup()
    this.create()
    this.animation()

    $('#web-gl').on('click', function (e) {
      self.pointsGSAPs.forEach((el) => el.restart())
    })
  }

  setup() {
    console.log(`setup / name: ${this.name}`)
  }

  create() {
    const vertices = []
    for (let i = 0; i < 1500; i += 1) {
      const x = THREE.MathUtils.randFloatSpread(30)
      const y = THREE.MathUtils.randFloatSpread(30)
      const z = THREE.MathUtils.randFloatSpread(30)

      vertices.push(x, y, z)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const ball = new THREE.SphereGeometry(30, 30, 30)
    console.log(ball)

    // const texStar = new THREE.TextureLoader().load(start)
    const matStar = new THREE.PointsMaterial({
      color: 0xffffff,
      // 粒子大小
      size: 0.25,
    })

    this.points = new THREE.Points(geometry, matStar)

    this.scene.add(this.points)

    const startPos = geometry.getAttribute('position')
    const destPos = ball.getAttribute('position')

    for (let i = 0; i < startPos.count; i += 1) {
      const cur = i % destPos.count

      this.pointsGSAPs.push(
        gsap.to(startPos.array, {
          [i * 3]: destPos.array[cur * 3],
          [i * 3 + 1]: destPos.array[cur * 3 + 1],
          [i * 3 + 2]: destPos.array[cur * 3 + 2],
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            startPos.needsUpdate = true
          },
          paused: true,
        }),
      )
    }

    // const fbxLoader = new FBXLoader()
    // fbxLoader.load('/src/images/model/guitar/guitar.FBX', function (obj) {
    //   console.log(obj.children[0].geometry.getAttribute('position'))
    //   // console.log(glft.scene.children[0])

    //   // const startPos = geometry.getAttribute('position')
    //   // const destPos = obj.children[0].geometry.getAttribute('position')

    //   // console.log(destPos)

    //   // for (let i = 0; i < startPos.count; i + 1) {
    //   //   const cur = i % destPos.count

    //   //   gsap.to(startPos, {
    //   //     [0 * 3 + 0]: destPos.array[cur * 3 + 0],
    //   //     [0 * 3 + 1]: destPos.array[cur * 3 + 1],
    //   //     [0 * 3 + 2]: destPos.array[cur * 3 + 2],
    //   //     duration: 3,
    //   //     delay: 2,
    //   //     onUpdate: function () {
    //   //       startPos.needsUpdate = true
    //   //     },
    //   //   })
    //   // }
    // })
  }

  animation(time) {
    const self = this
    // console.log(`animation / this: `, this)
    this.renderer.render(this.scene, this.camera)
    this.mesh.rotation.x += 0.05
    this.mesh.rotation.y += 0.01
    this.controls.update()

    requestAnimationFrame(function () {
      self.animation()
    })
  }
}
