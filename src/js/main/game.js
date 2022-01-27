/* eslint-disable class-methods-use-this */
/* eslint-disable no-lonely-if */
/* eslint-disable import/extensions */
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import $ from 'jquery'
import gsap from 'gsap'
import { Maths } from '@/utils/formula.js'

export default class Game {
  constructor() {
    const self = this

    this.isMobile = window.innerWidth <= 640

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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.autoRotate = true
    this.controls.update()
    this.controls.enabled = false

    document.getElementById('web-gl').appendChild(this.renderer.domElement)

    this.points = null
    this.pointsGSAPs = []
    this.pointPathArray = []
    this.pathIndex = -1

    this.cameraGsap = gsap
      .timeline({
        onComplete: () => {
          self.controls.enabled = true
        },
      })
      .fromTo(
        this.camera.position,
        {
          z: 2,
        },
        {
          z: self.isMobile ? 50 : 20,
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
          y: self.isMobile ? -30 : -20,
          duration: 1.75,
          ease: 'power1.out',
          onUpdate: () => {
            self.camera.lookAt(0, 0, 0)
          },
        },
        '-=1.75',
      )
      .pause()

    gsap.set('.content-button', {
      y: 20,
      opacity: 0,
    })

    gsap.set('.page-nav', {
      y: 20,
      opacity: 0,
    })

    this.create()
    this.animation()

    gsap.delayedCall(2.5, () => {
      this.changeMethod(true)
      self.cameraGsap.restart()

      gsap.to('.page-nav', {
        y: 20,
        opacity: 1,
      })
    })
  }

  create() {
    const self = this

    const vertices = []
    for (let i = 0; i < 3000; i += 1) {
      const x = THREE.MathUtils.randFloatSpread(20)
      const y = THREE.MathUtils.randFloatSpread(20)
      const z = THREE.MathUtils.randFloatSpread(20)

      vertices.push(x, y, z)
    }

    this.startGeometry = new THREE.BufferGeometry()
    this.startGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    this.pointPathArray.push({
      area: 'Bermuda',
      name1: 'Town Hill',
      name2: 'Bermuda',
      description:
        'Town Hill has an elevation of 77 metres. Town Hill is the highest point on the island of Bermuda at 79 metres.',
      pointData: new THREE.SphereGeometry(15, 64, 32),
    })
    this.pointPathArray.push({
      area: 'Guadeloupe',
      name1: 'La Grande',
      name2: 'Soufrière',
      description: `In 1976 a large amount of seismic activity led to a mass evacuation of the island's 72,000 residents.`,
      pointData: new THREE.TorusGeometry(10, 3, 16, 100),
    })
    this.pointPathArray.push({
      area: 'Falkland Islands',
      name1: 'Mount',
      name2: 'Usborne',
      description:
        'The islands lie on the boundary of the subantarctic oceanic and tundra climate zones.',
      pointData: new THREE.CylinderGeometry(5, 5, 20, 32),
    })
    this.pointPathArray.push({
      area: 'Guadeloupe',
      name1: 'La Grande',
      name2: 'Soufrière',
      description: 'The region formerly included Saint Barthélemy and Saint Martin.',
      pointData: new THREE.TorusKnotGeometry(10, 3, 100, 16),
    })

    // const texStar = new THREE.TextureLoader().load(start)
    const matStar = new THREE.PointsMaterial({
      color: 0xffffff,
      // 粒子大小
      size: 0.25,
    })

    this.points = new THREE.Points(this.startGeometry, matStar)
    this.points.rotation.y = 0

    this.scene.add(this.points)

    this.changeMethod = this.changeMesh()
  }

  setPageNum(index) {
    $('.page-nav .page-num').text(`0${index + 1}`)
  }

  setContent(index) {
    const self = this
    const underLine = $('.under-line-inner')
    const mountainArea = $('.mountain-area')
    const mountainName1 = $('.mountain-name-first-1')
    const mountainName2 = $('.mountain-name-first-2')
    const mountainDescription = $('.mountain-description')
    const contentBtn = $('.content-button')

    gsap
      .timeline()
      .fromTo(
        underLine,
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          y: '1rem',
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
        },
      )
      .fromTo(
        mountainArea,
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          y: '1rem',
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          onStart: () => {
            mountainArea.text(`${self.pointPathArray[index].area}`)
          },
        },
        '-=0.7',
      )
      .fromTo(
        mountainName1,
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          y: '1rem',
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          onStart: () => {
            mountainName1.text(`${self.pointPathArray[index].name1}`)
          },
        },
        '-=0.7',
      )
      .fromTo(
        mountainName2,
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          y: '1rem',
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          onStart: () => {
            mountainName2.text(`${self.pointPathArray[index].name2}`)
          },
        },
        '-=0.7',
      )
      .fromTo(
        mountainDescription,
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          y: '1rem',
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          onStart: () => {
            mountainDescription.text(`${self.pointPathArray[index].description}`)
          },
        },
        '-=0.7',
      )
      .fromTo(
        contentBtn,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
        },
        '-=0.7',
      )
  }

  animation(time) {
    const self = this
    this.renderer.render(this.scene, this.camera)
    this.mesh.rotation.x += 0.05
    this.mesh.rotation.y += 0.01

    this.points.rotation.y += 0.01
    this.controls.update()

    requestAnimationFrame(function () {
      self.animation()
    })
  }

  changeMesh() {
    const self = this
    const startPos = this.startGeometry.getAttribute('position')
    let destPos
    const pageNum = $('.page-nav .page-num')

    return function (forward) {
      if (forward) {
        if (self.pathIndex + 1 >= self.pointPathArray.length) {
          self.pathIndex = 0
        } else {
          self.pathIndex += 1
        }
      } else {
        if (self.pathIndex - 1 < 0) {
          self.pathIndex = self.pointPathArray.length - 1
        } else {
          self.pathIndex -= 1
        }
      }

      destPos = self.pointPathArray[self.pathIndex].pointData.getAttribute('position')

      for (let i = 0; i < startPos.count; i += 1) {
        const cur = i % destPos.count

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
          },
        )
      }

      gsap
        .timeline()
        .fromTo(
          pageNum,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            duration: 0.25,
            ease: 'power1.in',
            onComplete: () => {
              self.setPageNum(self.pathIndex)
            },
          },
        )
        .fromTo(
          pageNum,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.25,
            ease: 'power1.out',
          },
        )

      self.setContent(self.pathIndex)
    }
  }
}
