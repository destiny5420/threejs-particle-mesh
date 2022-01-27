/* eslint-disable import/extensions */
import 'main.css'
import '@/js/common/common'
import gsap from 'gsap'
import $ from 'jquery'
import Game from '@/js/main/game'

const game = new Game()

gsap
  .timeline()
  .to('.text-reveal', {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    y: 0,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.3,
  })
  .fromTo(
    '.content-button',
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power1.out',
    },
    '-=0.5',
  )

const changeMesh = game.changeMesh()

$('.btn-arrow-prev').on('click', function () {
  changeMesh(false)
})

$('.btn-arrow-next').on('click', function () {
  changeMesh(true)
})

/*!
 * -- Preload Sample --
 *
 * 1. The picture that be compressed by webpack at images folder
 * import logoImage from '@/images/tmpPic.png'
 * document.getElementById('logo').src = logoImage
 *
 * 2. The image at static folder
 * document.getElementById('logo').src = './static/images/logo.png'
 */
