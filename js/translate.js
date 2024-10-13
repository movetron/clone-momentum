const settWeather = document.querySelector('.weathers')
const settLang = document.querySelector('.language')

let lng
let choiseLng = function () {
    if (localStorage.getItem('lang')) {
        lng = localStorage.getItem('lang')
        settingsTranslate(lng)
    } else {
        lng = 'en'
    }
    return lng
}

lng = choiseLng()

function settingsTranslate() {
    switch (true) {
        case lng === 'en' || localStorage.getItem('lang') === 'en':
            settWeather.textContent = dictionary.en.settings.weather
            settLang.textContent = dictionary.en.settings.lang
            break
        case lng === 'ru' || localStorage.getItem('lang') === 'ru':
            settWeather.textContent = dictionary.ru.settings.weather
            settLang.textContent = dictionary.ru.settings.lang
            break
    }
}


function translatePage(lng) {
    if (lng === 'en') {
        setTime(lng)
        translateGreeting(lng)
        defaultName(lng)
        defaultCity(lng)
        getWeather(lng)
        quotes(lng)
        settingsTranslate(lng)
    } else if (lng === 'ru') {
        setTime(lng)
        translateGreeting(lng)
        defaultName(lng)
        defaultCity(lng)
        getWeather(lng)
        quotes(lng)
        settingsTranslate(lng)
    }
}
