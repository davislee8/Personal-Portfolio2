import { people } from '../data/people.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

const header = document.querySelector('header')
const main = document.querySelector('main')

const allCharsButton = document.createElement('button')
allCharsButton.textContent = 'All Characters'
allCharsButton.addEventListener('click', function () {
  populateDOM(people)
})

const maleCharacters = people.filter((person) => person.gender === 'male') // elegant filter!

/* const maleCharacters = people.filter((person) => {
  console.log(person)
  return person.gender === 'male'
}) */

// TODO: make a filter for female characters

const otherCharacters = people.filter((person) => {
  if (
    person.gender !== 'male' && person.gender !== 'female'
    // person.gender === 'hermaphrodite'  ||
    // person.gender === 'none' ||
    // person.gender === 'n/a'
  ) {
    return person
  }
})

const maleCharsButton = document.createElement('button')
maleCharsButton.textContent = 'Male Characters'
maleCharsButton.addEventListener('click', () => populateDOM(maleCharacters))

const femaleCharacters = people.filter((person) => person.gender === 'female')

const femaleCharsButton = document.createElement('button')
femaleCharsButton.textContent = 'Female Characters'
femaleCharsButton.addEventListener('click', () => populateDOM(femaleCharacters))

const otherCharactersButton = document.createElement('button')
otherCharactersButton.textContent = 'Other Characters'
otherCharactersButton.addEventListener('click', () => populateDOM(otherCharacters))

header.appendChild(allCharsButton)
header.appendChild(maleCharsButton)
header.appendChild(otherCharactersButton)
header.appendChild(femaleCharsButton)

function populateDOM(characters) {
  // loop through all the characters and make figure elements and insert them into DOM
  removeChildren(main)
  characters.forEach((person) => {
    const personFig = document.createElement('figure')
    const personImg = document.createElement('img')

    // Set the new image's source property to a valid URL or path
    let charNum = getLastNumber(person.url)

    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    const personCap = document.createElement('figcaption')
    personCap.textContent = person.name

    personFig.appendChild(personImg)
    personFig.appendChild(personCap)
    main.appendChild(personFig)
  })
}

populateDOM(people)

