const enemies = document.querySelectorAll('.enemy')
const hand = document.querySelector('.hand')

//! CURRENT DECK IMAGE DEFINITION
const deck = [
  './assets/Magma_Morsel.webp',
  './assets/Antumbra_Morsel.webp',
  './assets/Morsel_Excavator.webp',
  './assets/Morsel_Jeweler.webp',
  './assets/Morsel_Miner.webp',
  './assets/Rubble_Morsel.webp'
]

let storage = {
  card: -1,
}
//* look into more of what the Proxy does
//* target, function, value === target.key = value
let storageProxy = new Proxy(storage, {
  set: function (target, key, value) {
    if(target[key] !== value){
      // will console.log the key and value when it is changed as listened by the proxy
      console.log(`${key} set to ${value}`);
      target[key] = value;
      for(let i = 0; i < enemies.length; i++){
        if(i != value){
          // console.log('TEST RUN')
          enemies[i].addEventListener('dragover', e => dragOver(e, i), { once: true })
        }
      }
      return true;
    }
  }
});

storageProxy.enemy = "test"; // console: 'hello_world set to test'

// create array of card names to reference a json that will have all of the card listed with names, damage, block, description, effects
//! MAIN DECK LOOP 
//? possibly rephrase this to load deck order but only display hand at a time?
deck.forEach((image, index) => {
  const current = document.createElement('div')

  current.classList.add('card', `c${index}`)

  current.draggable = 'true'

  current.style.backgroundImage = `url(${image})`

  current.addEventListener('dragstart', e => dragStart(e,index))
  current.addEventListener('dragend', dragEnd)

  hand.appendChild(current)
})

enemies.forEach((enemy, index) => {
  enemy.addEventListener('dragover', e => dragOver(e,index), { once: true })
  storageProxy.enemy = index;
})


//! FUNCTION ALLEY
function dragStart(e,i) {
  // console.log('started drag')

  storageProxy.card = i
}

function dragEnd(e) {
  // console.log(`ended drag ${storage.card}`)

  enemies.forEach(enemy => {
    enemy.addEventListener('dragover', dragOver, { once: true })
    enemy.style.backgroundColor = 'initial'
  })
}

function dragOver(e,i) {
  // console.log(`testing ${storage.card} dragover`)
  storageProxy.enemy = i
  enemies.forEach((enemy, index) => {
    if(index == i){
      enemy.style.backgroundColor = 'black'
    } else {
      enemy.style.backgroundColor = 'initial'
    }
  })
}