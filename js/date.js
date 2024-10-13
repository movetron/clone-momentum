const currentTime = document.querySelector('.time');
const currentDate = document.querySelector('.date');

function setTime() {
    const time = new Date();
    currentTime.textContent = time.toLocaleTimeString()
    const date = new Date()
    const options = { weekday: 'long', month: 'long', day: 'numeric' }

    
    currentDate.textContent = date.toLocaleDateString('ru-RU', options)

    setTimeout(setTime, 1000)
}

setTime()


