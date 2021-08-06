const enemies = document.querySelector('.enemies')
const hand = document.querySelector('.hand')

//! CURRENT DECK IMAGE DEFINITION
// this will get replaced with an array of object names that will be used to reference a json using [] during the hand display loop. 
const deck = [
  './assets/Magma_Morsel.webp',
  './assets/Antumbra_Morsel.webp',
  './assets/Morsel_Excavator.webp',
  './assets/Morsel_Jeweler.webp',
  './assets/Morsel_Miner.webp',
  './assets/Rubble_Morsel.webp'
]

const enemiesList = [
  './assets/Penumbra.webp',
  './assets/Penumbra.webp',
  './assets/Penumbra.webp'
]

// storage will be used as the "brains" to keep track of the card selected and the enemy targeted by the user.
let storage = {
  card: -1,
  enemy: -1
}

// the proxy is being used as a sort of "event listener" for when the variable changes. in this case it will run a function tha happens when the obeject changes and will act accordingly
// in this case the for loop and if statement will be resetting the selection availability for each enemy other than the one currently selected by the user. so when a user selects item 0 it will reset numbers 1 and 2, if they pick number 1 then 0 and 2 will get reset
//* look into more of what the Proxy does
//* target, function, value === target.key = value
// let storageProxy = new Proxy(storage, {
//   set: function (target, key, value) {
//     if (target[key] !== value && value !== undefined) {
//       // will console.log the key and value when it is changed as listened by the proxy
//       console.log(`${key} set to ${value}`);
//       target[key] = value;
//       let currentEnemies = document.querySelectorAll('.enemy')
//       // console.log(currentEnemies)
//       for (let i = 0; i < currentEnemies.length; i++) {
//         if (i != value) {
//           // console.log('TEST RUN')
//           currentEnemies[i].addEventListener('dragover', e => dragOver(e, i), { once: true })
//         }
//       }
//       return true;
//     }
//   }
// });

// storageProxy.enemy = "test"; // console: 'hello_world set to test'

// create array of card names to reference a json that will have all of the card listed with names, damage, block, description, effects
//! MAIN DECK LOOP 
//? possibly rephrase this to load deck order but only display hand at a time?
deck.forEach((image, index) => {
  const current = document.createElement('div')

  current.classList.add('card', `c${index}`)

  current.draggable = 'true'

  current.style.backgroundImage = `url(${image})`

  current.addEventListener('dragstart', e => dragStart(e, index))
  // current.addEventListener('dragend', dragEnd)

  hand.appendChild(current)
})

enemiesList.forEach((enemy, index) => {
  const single = document.createElement('div')
  single.style.backgroundImage = `url(${enemy})`
  single.classList.add('enemy')
  // single.addEventListener('dragover', e => dragOver(e, index), { once: true })
  single.addEventListener('dragenter', e => {
    dragEnter(e, index)
  })
  single.addEventListener('dragover', e => e.preventDefault())
  single.addEventListener('drop', e => drop(e))
  enemies.appendChild(single)
  storage.enemy = index;
})


//! FUNCTION ALLEY
function dragStart(e, i) {
  // e.preventDefault()
  console.log('started drag')

  storage.card = i
}

function dragEnter(e, i) {
  e.preventDefault()
  storage.enemy = i
  console.log(storage)
}

function drop() {
  console.log(`Card ${storage.card} dropped on enemy ${storage.enemy}`)
}


// function dragEnd(e) {
//   // console.log(`ended drag ${storage.card}`)
//   const currentEnemies = document.querySelectorAll('.enemy')
//   currentEnemies.forEach(enemy => {
//     enemy.addEventListener('dragover', dragOver, { once: true })
//     enemy.style.backgroundColor = 'initial'
//   })
//   storageProxy.card = -1
//   storageProxy.enemy = -1
// }

// function dragOver(e, i) {
//   console.log(e)
//   // console.log(`testing ${storage.card} dragover`)
//   storageProxy.enemy = i
//   const currentEnemies = document.querySelectorAll('.enemy')
//   currentEnemies.forEach((enemy, index) => {
//     if (index == i) {
//       enemy.style.backgroundColor = 'black'
//     } else {
//       enemy.style.backgroundColor = 'initial'
//     }
//   })
// }