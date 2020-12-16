const input = document.getElementById('input')
const containerTask = document.getElementById('task')
const pCount = document.getElementById('count')
const pClear = document.getElementById('clear')
const all = document.getElementById('all')
const complete = document.getElementById('complete')
const active = document.getElementById('active')
const dark = document.getElementById('dark')
let count = 0

const agregar = (e) => {
  let str = input.value
  const fragment = document.createDocumentFragment()
  if (e.key === 'Enter' && str != '' && str.length > 3) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const imgOne = document.createElement('img')
    const imgTwo = document.createElement('img')
    div.classList.add('todo-task__box')
    imgOne.src = '/images/circle.svg'
    imgOne.alt = 'circle'
    imgOne.classList.add('circle')
    imgOne.setAttribute('data-img', 'circle')
    imgTwo.src = '/images/icon-cross.svg'
    imgTwo.alt = 'cross'
    imgTwo.style.width = '25px'
    //imgTwo.setAttribute('dataset', 'data-img=""')
    imgTwo.classList.add('img')
    p.textContent = input.value
    div.appendChild(imgOne)
    div.appendChild(p)
    div.appendChild(imgTwo)
    fragment.appendChild(div)
    input.value = ''
    count++
    pCount.textContent = `Item left: ${count}`
    imgTwo.addEventListener('click', (e) => {
      if (imgOne.dataset.img === 'circle') {
        e.target.parentElement.remove()
        count--
      } else if (imgOne.dataset.img === 'hover') {
        e.target.parentElement.remove()
      }
      if (count < 0) {
        count = 0
      }
      pCount.textContent = `Item left : ${count}`
    })
    funImg(imgOne, p)
  }
  containerTask.prepend(fragment)
}

const funImg = (img1, p) => {
  let check = 'check-hover'
  img1.addEventListener('click', (e) => {
    if (e.target.dataset = `circle`) {
      count--
      e.target.src = `images/${check}.svg`
      e.target.setAttribute('data-img', 'hover')
    }
    if (count < 0) {
      count = 0
    }
    pCount.textContent = `Item left : ${count}`
    p.classList.add('underlin')
  })
}

const clearComplete = () => {
  let arra = document.querySelectorAll('.circle')
  arra.forEach(item => {
    if (item.dataset.img == 'hover') {
      item.parentElement.remove()
    }
  })
}
const task = (dato = '') => {
  let arr = document.querySelectorAll('.todo-task__box')
  arr.forEach(item => {
    if (item.children[0].dataset.img === dato && !item.classList.contains('fade')) {
      item.classList.add('fade')
    } else if (item.children[0].dataset.img !== dato && item.classList.contains('fade')) {
      item.classList.remove('fade')
    }
  })
}
all.addEventListener('click', () => {
  let arr = document.querySelectorAll('.todo-task__box')
  arr.forEach(item => [
    item.classList.remove('fade')
  ])
})
active.addEventListener('click', () => {
  task('hover')
})
complete.addEventListener('click', () => {
  task('circle')
})
input.addEventListener('keyup', agregar)
pClear.addEventListener('click', clearComplete)

dark.addEventListener('click', () => {
  let moon = 'far fa-sun'
  let sun = 'fas fa-moon'
  if (dark.children[0].className === moon) {
    dark.children[0].className = sun
  } else {
    dark.children[0].className = moon
  }
  document.body.classList.toggle('body-dark')
  input.classList.toggle('dark-input')
  containerTask.classList.toggle('dark')
  let arr = document.querySelectorAll('.todo-task__box')
  arr.forEach(item => {
    item.classList.toggle('dark')
  })
  let arr2 = document.querySelectorAll('.todo-task__option')
  arr2.forEach(item => {
    item.classList.toggle('dark')
  })
})