/* eslint-disable import/extensions */
import 'main.css'
import '@/js/common/common'
import gsap from 'gsap'
import Game from '@/js/main/game'

const game = new Game()

gsap.to('.text-reveal', {
  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  y: 0,
  duration: 1,
  ease: 'power2.out',
  stagger: 0.3,
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
