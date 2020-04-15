console.log('Javascript file loaded.')

const weatherForm = document.querySelector('form') // takes the fist item of form
const search = document.querySelector('input') //takes the first item of imput
const messageOne = document.querySelector('#message-1') // when i refen in a class i use .nameOfClass and for id i use #idName
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
  e.preventDefault()

  const location = search.value
  messageOne.textContent ='Loading...'
  messageTwo.textContent = ''
  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
      response.json().then((data) =>{
        if(data.error){
          messageOne.textContent = data.error
        }else{
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecastData
        }
      })
  })

})
