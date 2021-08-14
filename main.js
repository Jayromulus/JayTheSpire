const enemies = document.querySelector('.enemies')
const hand = document.querySelector('.hand')
// const draw = document.querySelector('button')
const energyDisplay = document.querySelector('.energy')
const endTurn = document.querySelector('.endTurn')

//! CURRENT DECK IMAGE DEFINITION
// this will get replaced with an array of object names that will be used to reference a json using [] during the hand display loop. 
const deck = [
  // './assets/Magma_Morsel.webp',
  // './assets/Antumbra_Morsel.webp',
  // './assets/Morsel_Excavator.webp',
  // './assets/Morsel_Jeweler.webp',
  // './assets/Morsel_Miner.webp',
  // './assets/Rubble_Morsel.webp'
  {
    name: 'Strike',
    id: 1,
    image: './assets/Strike_R.webp',
    energy: 1,
    damage: 6,
  },
  {
    name: 'Strike',
    id: 1,
    image: './assets/Strike_R.webp',
    energy: 1,
    damage: 6,

  },
  {
    name: 'Strike',
    id: 1,
    image: './assets/Strike_R.webp',
    energy: 1,
    damage: 6,

  },
  {
    name: 'Strike',
    id: 1,
    image: './assets/Strike_R.webp',
    energy: 1,
    damage: 6,

  },
  {
    name: 'Strike',
    id: 1,
    image: './assets/Strike_R.webp',
    energy: 1,
    damage: 6,

  },
  {
    name: 'Defend',
    id: 2,
    image: './assets/Defend_R.webp',
    energy: 1,
    block: 5,
  },
  {
    name: 'Defend',
    id: 2,
    image: './assets/Defend_R.webp',
    energy: 1,
    block: 5,
  },
  {
    name: 'Defend',
    id: 2,
    image: './assets/Defend_R.webp',
    energy: 1,
    block: 5,
  },
  {
    name: 'Defend',
    id: 2,
    image: './assets/Defend_R.webp',
    energy: 1,
    block: 5,
  },
  {
    name: 'Bash',
    id: 3,
    image: './assets/Bash.webp',
    energy: 2,
    damage: 8,
    status: [{ type: 'vulnerable', amount: 2 }]
  }
]

const enemiesList = [
  {
    name: 'Gremlin Nob',
    id: 1,
    hp: 83,
    image: './assets/Gremlin-nob-pretty.webp'
  },
  {
    name: 'Lagavulin',
    id: 2,
    hp: 119,
    image: './assets/Lagavulin-zzz-pretty.webp'
  },
  {
    name: 'Sentry',
    id: 3,
    hp: 43,
    image: './assets/Sentry-pretty.webp'
  }
  // './assets/Penumbra.webp',
  // './assets/Penumbra.webp',
  // './assets/Penumbra.webp'
]

// storage will be used as the "brains" to keep track of the card selected and the enemy targeted by the user.
let storage = {
  energy: 3,
  block: 0,
  card: '',
  cardId: -1,
  enemy: '',
  enemyId: -1,
  handCurrent: -1,
  enemyCurrent1: 0,
  enemyCurrent2: 0,
  enemyCurrent3: 0,
  enemyCurrent4: 0,
  enemyCurrent1Status: [],
  enemyCurrent2Status: [],
  enemyCurrent3Status: [],
  enemyCurrent4Status: [],
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
//       return true;
//     }
//   }
// });
// storageProxy.enemy = "test"; // console: 'hello_world set to test'
// LOOK INTO JS PROXY OBJECT
const currentHand = []
const used = []
energyDisplay.innerText = 'Energy: ' + storage.energy
drawHand(5)
endTurn.addEventListener('click', turnEnd)

// draw.addEventListener('click', e => drawHand(5))

// create array of card names to reference a json that will have all of the card listed with names, damage, block, description, effects
//! MAIN DECK LOOP 
//? possibly rephrase this to load deck order but only display hand at a time?

enemiesList.forEach((enemy, index) => {
  const single = document.createElement('div')
  const singleImg = document.createElement('img')
  singleImg.src = enemy.image
  singleImg.style.width = '100%'
  single.classList.add('enemy', enemy.name.replace(/\s/g, ''))
  single.appendChild(singleImg)

  single.addEventListener('dragenter', e => {
    dragEnter(e, index)
  })
  single.addEventListener('dragover', e => e.preventDefault())
  single.addEventListener('drop', e => drop(e))

  const maxBar = document.createElement('div')
  const currentBar = document.createElement('div')

  maxBar.style.margin = '-10% 5% 0px'
  maxBar.style.height = '5%'
  maxBar.style.backgroundColor = '#777777'
  currentBar.style.backgroundColor = '#25c724'
  currentBar.style.height = '100%'
  currentBar.classList.add(`enemy${index}hp`)
  currentBar.style.width = '100%'


  maxBar.appendChild(currentBar)
  single.appendChild(maxBar)
  enemies.appendChild(single)

  storage[`enemyCurrent${index + 1}`] = enemy.hp;
  storage.enemy = enemy.name
  storage.enemyId = enemy.id

  currentBar.innerText = `${storage[`enemyCurrent${index + 1}`]}/${enemy.hp}`
})


//! FUNCTION ALLEY
function dragStart(e, i) {
  // console.log('started drag')
  storage.card = currentHand[i].name
  storage.cardId = currentHand[i].id
  storage.handCurrent = i
}

function dragEnter(e, i) {
  e.preventDefault()
  storage.enemy = enemiesList[i].name
  storage.enemyId = enemiesList[i].id
  // console.log(storage)
  for (let index = 0; index < enemies.children.length; index++) {
    enemies.children[index].style.backgroundColor = storage[`enemyCurrent${index + 1}`] <= 0 ? 'red' : index === i ? 'black' : 'transparent'
  }
}

function drop() {
  // enemy is from the enemiesList object
  const enemy = enemiesList.find(enemy => enemy.name === storage.enemy)
  // console.log(`Card ${storage.card} dropped on enemy ${storage.enemy}`)
  // enemyHealth is coming from the page and is the green bar for their current health
  const enemyHealth = document.querySelector(`.enemy${storage.enemyId - 1}hp`)

  const myCard = deck.find(card => card.name === storage.card)
  if (myCard.energy <= storage.energy) {
    storage.energy -= myCard.energy
    energyDisplay.innerText = `Energy: ${storage.energy}`
    // checks if the card being used does damage and if it does it will do either as much damage as the card does or the remaining hp of the enemy if they are low enough
    // TODO redo this to take into effect damage better and to check for vulnerable status etc
    if (storage[`enemyCurrent${enemy.id}`] > 0) {
      // storage[`enemyCurrent${enemy.id}`] -= storage.card === 'Strike' ?
      //   (6 <= storage[`enemyCurrent${enemy.id}`] ?
      //     6 :
      //     storage[`enemyCurrent${enemy.id}`]) :
      //   storage.card === 'Bash' ?
      //     (8 <= storage[`enemyCurrent${enemy.id}`] ?
      //       8 :
      //       storage[`enemyCurrent${enemy.id}`]) :
      //     0
      if (storage.card === 'Block') {
        storage.block += 5
      } else {
        const damageCard = deck.find(current => current.id === storage.cardId)
        console.log(damageCard.damage)

        const damage = storage[`enemyCurrent${enemy.id}Status`].filter(status => status.type === 'vulnerable').length > 0 ? damageCard.damage * 1.5 : damageCard.damage
        storage[`enemyCurrent${enemy.id}`] -= storage[`enemyCurrent${enemy.id}`] >= damage ? damage : 0

        if (damageCard.status) {
          damageCard.status.forEach(status => storage[`enemyCurrent${enemy.id}Status`].push({type: status.type, amount: status.amount }))
        }
      }
      // console.log(`${enemy.name} Current HP: ${storage[`enemyCurrent${enemy.id}`]}`)
    }
    else {
      console.log('he\'s already dead...')
    }

    // for of loop since foreach doesnt work on an html collection
    // loops over the enemies and if they are alive get reset to transparent bg if they are dead they stay red
    for (child of enemies.children) {
      // replace spaces with ''
      if (child.classList.contains(storage.enemy.replace(/\s/g, '')) && storage[`enemyCurrent${enemy.id}`] > 0)
        // TODO add condition to ignore resetting the background if the enemy is dead. not super sure how to make it happen
        // ? bug where the item will stay black bg after highlighting it AFTER killed, but will not stay after being killed
        // nevermind im just stupid and was doing this above damage calculation instead of after lmfao what a dummy
        child.style.backgroundColor = 'transparent'
      else if (child.classList.contains(storage.enemy.replace(/\s/g, '')) && storage[`enemyCurrent${enemy.id}`] <= 0)
        child.style.backgroundColor = 'red'

    }

    // change width of green health bar and text within the health
    enemyHealth.style.width = `${Math.floor((storage[`enemyCurrent${enemy.id}`] / enemiesList.find(item => item.id === enemy.id).hp) * 100)}%`
    enemyHealth.innerText = `${storage[`enemyCurrent${enemy.id}`]}/${enemy.hp}`

    currentHand.splice(storage.handCurrent, 1)
    displayHand()
    // TODO remove card from hand after use

    // TODO remove energy from pool after using card equal to its cost

    // TODO reset hand after hp becomes 0 or when button is pressed to "end turn"
  } else {
    console.log('not enough energy')
    for (child of enemies.children) {
      // replace spaces with ''
      if (child.classList.contains(storage.enemy.replace(/\s/g, '')) && storage[`enemyCurrent${enemy.id}`] > 0)
        // TODO add condition to ignore resetting the background if the enemy is dead. not super sure how to make it happen
        // ? bug where the item will stay black bg after highlighting it AFTER killed, but will not stay after being killed
        // nevermind im just stupid and was doing this above damage calculation instead of after lmfao what a dummy
        child.style.backgroundColor = 'transparent'
      else if (child.classList.contains(storage.enemy.replace(/\s/g, '')) && storage[`enemyCurrent${enemy.id}`] <= 0)
        child.style.backgroundColor = 'red'

    }
  }
}

function drawHand(handSize) {
  // e.preventDefault()
  // console.log('drawing hand:', e)
  while (currentHand[0] !== undefined) {
    currentHand.shift()
  }
  for (let i = 0; i < handSize; i++) {
    if (deck.length > used.length) {
      cardInHand()
    } else {
      while (used[0] !== undefined) {
        used.shift()
      }
      cardInHand()
    }
  }
  displayHand()
}

// TODO This might need to be reworked so that as the deck gets bigger i dont ahve to keep chacking for longer and longer before i can get my new 
function cardInHand() {
  const rnd = Math.floor(Math.random() * deck.length)
  if (used.includes(rnd)) {
    cardInHand()
  } else {
    used.push(rnd)
    currentHand.push(deck[rnd]);
  }
}

function displayHand() {
  hand.innerHTML = ''
  console.log(used)
  currentHand.forEach((card, index) => {
    const current = document.createElement('div')
    const currentImg = document.createElement('img')

    current.classList.add('card', `c${index}`)

    current.draggable = 'true'

    currentImg.src = card.image
    currentImg.style.height = '100%'

    current.appendChild(currentImg)

    current.addEventListener('dragstart', e => dragStart(e, index))

    hand.appendChild(current)
  })
}


function turnEnd(e) {
  e.preventDefault()
  drawHand(5)
  storage.energy = 3
  energyDisplay.innerText = `Energy: ${storage.energy}`

  for(let i = 1; i <= 4; i++) {
    for(let o = 0; o < storage[`enemyCurrent${i}Status`].length; o++){
      storage[`enemyCurrent${i}Status`][o].amount > 1 ? storage[`enemyCurrent${i}Status`][o].amount-- : storage[`enemyCurrent${i}Status`].splice(o, 1);
      console.log(storage[`enemyCurrent${i}Status`][o])
    }
  }
}

// TODO make a save function that will store the storage object in the localstorage

// TODO make a load function that will set the storage object to the object from the localstorage

// TODO make a delete save function that will clear the save data from the localstorage



// current.addEventListener('dragend', dragEnd)

    // current.addEventListener('touchstart', function () {
    //   console.log('btn touched');
    // })

    // current.addEventListener('touchmove', function (e) {
    //   // grab the location of touch
    //   var touchLocation = e.targetTouches[0];
    //   console.log(current.name, 'is being moved')

    //   // assign box new coordinates based on the touch.
    //   current.style.left = touchLocation.pageX + 'px';
    //   current.style.top = touchLocation.pageY + 'px';
    // })

// https://stackoverflow.com/questions/52554613/html-5-drag-and-drop-not-working-on-mobile-screen

// drag does not work on mobile so touch is required to use it on mobile devices

// // get The element on which to attach the event 
// var btn = document.querySelector('.btn');

// // attaching each event listener
// btn.addEventListener('touchstart', function(){
// 	console.log('btn touched');
// })
// btn.addEventListener('touchend', function(){
// 	console.log('btn leaved');
// })
// btn.addEventListener('touchmove', function(){
// 	console.log('btn leaved');
// })
// btn.addEventListener('touchleave', function(){
// 	console.log('btn moving end');
// })
// btn.addEventListener('touchcancel', function(){
// 	console.log('btn moving cancel');
// })