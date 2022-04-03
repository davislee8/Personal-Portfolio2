import { starships } from '../data/starships.js'
import { removeChildren, getLastNumber } from '../utils/index.js'

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipViewer = document.querySelector('.shipViewer')

const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const shipMessage = document.querySelector('.shipMessage')

closeButton.addEventListener('click', () => {
  modal.classList.toggle('is-active')
})

function populateNav() {
  starships.forEach((starship) => {
    let anchor = document.createElement('a')
    anchor.href = '#'
    anchor.textContent = starship.name
    const listItem = document.createElement('li')

    anchor.addEventListener('click', () => populateShipView(starship))

    listItem.appendChild(anchor)
    navList.appendChild(listItem)
  })
}

populateNav()

function populateShipView(shipData) {
  removeChildren(shipViewer)
  const shipImage = document.createElement('img')
  let shipNum = getLastNumber(shipData.url)
  shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`

  shipImage.addEventListener('error', () => {
    console.log('We got an error!')
    shipImage.hidden = true
    modal.classList.toggle('is-active')
    shipMessage.textContent = `The ship known as "${shipData.name}" is in space port for repairs.`
  })

  shipViewer.appendChild(shipImage)
}

modal.addEventListener('click', () => {
  modal.classList.remove('is-active');
})