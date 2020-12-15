const input = document.getElementById('input')
const containerTask = document.getElementById('task')
const pCount = document.getElementById('count')
const pClear = document.getElementById('clear')
let count = 0

input.addEventListener('keyup', (e) => {
  const fragment = document.createDocumentFragment()
  if (e.key === 'Enter') {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const imgOne = document.createElement('img')
    const imgTwo = document.createElement('img')
    div.classList.add('todo-task__box')
    imgOne.src = '/images/circle.svg'
    imgOne.alt = 'circle'
    imgTwo.src = '/images/icon-cross.svg'
    imgTwo.alt = 'cross'
    imgTwo.style.width= '25px'
    p.textContent = input.value
    div.appendChild(imgOne)
    div.appendChild(p)
    div.appendChild(imgTwo)
    fragment.appendChild(div)
    input.value = ''
    count++
    pCount.textContent = `Item left: ${count}`
  }
  containerTask.prepend(fragment)

})
pClear.addEventListener('click', (e) => {
  containerTask.textContent = ''
  pCount.textContent = 'Item left : 0'
  count =0
})
