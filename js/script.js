const input = document.getElementById('input')
const containerTask = document.getElementById('task')
const pCount = document.getElementById('count')
const pClear = document.getElementById('clear')
const all = document.getElementById('all')
const complete = document.getElementById('complete')
const active = document.getElementById('active')
const dark = document.getElementById('dark')
const todo = document.getElementById('todo')
let idCount = 0
let count = 0

const agregar = (e) => {
  let id = `task-${count}`
  let str = input.value
  const fragment = document.createDocumentFragment()
  if (e.key === 'Enter' && str != '' && str.length > 3) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const imgOne = document.createElement('div')
    const imgTwo = document.createElement('img')
    div.classList.add('todo-task__box')
    div.setAttribute('draggable', 'true')
    div.setAttribute('id',id)
    imgOne.classList.add('circle')
    imgOne.setAttribute('data-img', 'circle')
    imgTwo.src = '/images/icon-cross.svg'
    imgTwo.alt = 'cross'
    imgTwo.style.width = '25px'
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
    imgOne.addEventListener('click', funImg(imgOne, p))
  }
  containerTask.prepend(fragment)
}

const funImg = (img1, p) => {
  img1.addEventListener('click', () => {
    if (img1.dataset.img === 'circle' && !img1.classList.contains('done')) {
      img1.classList.add('done')
      img1.dataset.img = 'hover'
      p.classList.add('underlin')
      count--
    } else if (img1.dataset.img === 'hover' && img1.classList.contains('done')) {
      img1.classList.remove('done')
      img1.dataset.img = 'circle'
      p.classList.remove('underlin')
      count++
    }
    if (count < 0) {
      count = 0
    }
    pCount.textContent = `Item left : ${count}`
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
  todo.classList.toggle('todo-d')
  let arr = document.querySelectorAll('.todo-task__box')
  arr.forEach(item => {
    item.classList.toggle('dark')
  })
  let arr2 = document.querySelectorAll('.todo-task__option')
  arr2.forEach(item => {
    item.classList.toggle('dark')
  })
  let arr3 = document.querySelectorAll('.circle')
  arr3.forEach(item => {
      item.classList.toggle('dark-c')
  })
})
const Drag = () => {
  containerTask.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
  })
  containerTask.addEventListener('drag', (e) => {
    e.target.classList.add('drag')
  })
  containerTask.addEventListener('dragend', (e) => {
    e.target.classList.remove('drag')
  })
  containerTask.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
  containerTask.addEventListener('drop', (e) => {
    e.preventDefault()
    const element = document.getElementById(e.dataTransfer.getData('text'))
    containerTask.append(containerTask.removeChild(element))
  })
}
window.addEventListener('DOMContentLoaded',Drag)
