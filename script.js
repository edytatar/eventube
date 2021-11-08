var body = document.querySelector('body')
var mainPage = document.querySelector('.front-page')
var secondPage = document.querySelector('.search-result')
var button = document.querySelector('.city-search')


function nextPage(event) {
    event.preventDefault()
    body.setAttribute('style', 'background-image:  url(images/eventube-crowd-pic.jpg)')
    mainPage.setAttribute('style', 'display: none;')
    secondPage.setAttribute('style', 'display: unset;')
}

button.addEventListener('click', nextPage)