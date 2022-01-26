/* eslint-disable import/extensions */
import 'main.css'
import '@/js/common/common'
import Game from '@/js/main/game'

const game = new Game()

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
