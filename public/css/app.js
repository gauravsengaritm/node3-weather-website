//this is app.js file
fetch('http://puzzle.mead.io/puzzle').then((responce)=>{
    responce.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Loading....';
messageTwo.textContent = '';

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    address = search.value
    //fetch('http://localhost:3000/weather?address='+address).then((responce)=>{
    fetch('/weather?address='+address).then((responce)=>{
    responce.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error;
        }else{
            //console.log(data.forecast.observation_time)
            messageOne.textContent = data.forecast.observation_time;
            messageTwo.textContent = data.location;
        }
        
    })
})
    console.log("submit form....")
})