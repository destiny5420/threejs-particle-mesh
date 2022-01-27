/* eslint-disable import/extensions */
import 'main.css'
import '@/js/common/common'
import gsap from 'gsap'
import $ from 'jquery'
import Game from '@/js/main/game'

const game = new Game()

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
