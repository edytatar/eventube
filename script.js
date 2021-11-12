var body = document.querySelector('body')
var mainPage = document.querySelector('.front-page')
var secondPage = document.querySelector('.search-result')
var button = document.querySelector('.city-search')
var inputField = document.querySelector(".pure-input");
var videoPlayerOne = document.querySelector('#frame-one')
var videoPlayerTwo = document.querySelector('#frame-two')
var videoPlayerThree = document.querySelector('#frame-three')
var videoPlayerFour = document.querySelector('#frame-four')
var locationBlock = document.querySelector('.location-article')
var title = document.querySelector('.eventube')
var listPage = document.querySelector('.list-page')
var listBtn = document.querySelector('.list-button')
var listEl = document.querySelector('.artist-list')
var clearBtn = document.querySelector('.clear-button')
var savedEventsArray = []


if (JSON.parse(localStorage.getItem('artists')) !== null) {
    savedEventsArray = JSON.parse(localStorage.getItem('artists'));
} else {
    localStorage.setItem('artists', JSON.stringify(savedEventsArray))
}

function populateArtists() {
for (var i = 0; i <= savedEventsArray.length; i++) {
    var artistEl = document.createElement('li');
    artistEl.setAttribute('style', ('font-size: large; margin: 1em;'))
    artistEl.textContent = savedEventsArray[i];
    console.log(artistEl)
    listEl.appendChild(artistEl);
}
}

function nextPage() {
    // Hiding "home page" and displaying "second page"
    mainPage.setAttribute('style', 'display: none;');
    secondPage.setAttribute('style', 'display: unset;');
    // Creating variables for ticketmaster API
    var cityName = inputField.value;
    var ticketApiKey = 'cJ7Du9o4a3aUD0VZZwh7fqoTrs6wLvzQ';
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events?apikey=' + ticketApiKey + '&locale=*&city=' + cityName + '&classificationName=music';
    // var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalcode=' + zipCode + '&apikey=' + ticketApiKey;
    // Fetching data - ticketmaster API
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText)
            }
        })
        .then(function (ticketData) {
            console.log(ticketData);
            //Events loop
            for (var i = 0; i < 5; i++) {
                // Creating elements of event cards
                var eventContainer = document.createElement("section");
                var imgContainer = document.createElement("figure");
                var eventDetailContainer = document.createElement("ul");
                var img = document.createElement("img");
                var eventName = document.createElement("li");
                var eventDate = document.createElement("li");
                var eventLocation = document.createElement("li");
                // creating a seperate element for the data so it can standout from the input category
                var eventNameData = document.createElement('span');
                var eventDateData = document.createElement('span');
                var eventLocationData = document.createElement('span');
                // Storing data for elements in variables
                var imgData = ticketData._embedded.events[i].images[0].url;
                eventNameData.textContent = ticketData._embedded.events[i].name;
                eventDateData.textContent = ticketData._embedded.events[i].dates.start.localDate;
                eventLocationData.textContent = ticketData._embedded.events[i]._embedded.venues[0].name;
                // Adding data to elements
                // eventName.textContent = "Name: " + eventNameData;
                eventName.textContent = "Name: ";
                eventDate.textContent = "Date: ";
                eventLocation.textContent = "Location: ";
                //Setting attributes for elements so they have the correct style
                eventContainer.setAttribute("class", "event");
                eventContainer.setAttribute("style", "display: flex; flex-direction: column; align-items: center; text-align: start; margin-top: 1em; margin-bottom: 10em; font-size: smallest;");
                eventContainer.setAttribute("name", ticketData._embedded.events[i].name);
                imgContainer.setAttribute("class", "img-container");
                eventDetailContainer.setAttribute("class", "details");
                img.setAttribute("alt", "Image of performer");
                img.setAttribute("src", imgData);
                img.setAttribute("name", ticketData._embedded.events[i].name);
                img.setAttribute("data-latitude", ticketData._embedded.events[i]._embedded.venues[0].location.latitude);
                img.setAttribute("data-longitude", ticketData._embedded.events[i]._embedded.venues[0].location.longitude);
                img.setAttribute("class", "group-image");
                // img.setAttribute("style", "height: 25em; width: 30em; border: solid 1em rgb(84, 25, 124);");
                eventName.setAttribute("class", "event-detail-component");
                eventName.setAttribute("style", "font-size: large; font-weight: bolder; margin: .5em;");
                eventDate.setAttribute("class", "event-detail-component");
                eventDate.setAttribute("style", "font-size: large; font-weight: bolder; margin: .5em;");
                eventLocation.setAttribute("class", "event-detail-component");
                eventLocation.setAttribute("style", "font-size: large; font-weight: bolder; margin: .5em;");
                // setting the style difference between the input data and the input category
                eventNameData.setAttribute("style", "line-height: 1.5em; text-decoration: underline; font-weight: 500; color: rgb(4, 4, 170)");
                eventDateData.setAttribute("style", "line-height: 1.5em; font-weight: 500; color: rgb(4, 4, 170)");
                eventLocationData.setAttribute("style", "line-height: 1.5em; font-weight: 500; color: rgb(4, 4, 170)");
                // Creating variable for article with class="event-article"
                var eventSection = document.querySelector(".event-article");
                // eventSection.setAttribute('style', 'overflow: scroll;')
                // Appending Elements
                eventContainer.append(imgContainer);
                imgContainer.append(img);
                // appending the input data to the input category
                eventName.append(eventNameData);
                eventDate.append(eventDateData);
                eventLocation.append(eventLocationData);
                eventContainer.append(eventDetailContainer);
                eventDetailContainer.append(eventName);
                eventDetailContainer.append(eventDate);
                eventDetailContainer.append(eventLocation);
                //Appending all above to .event-article
                eventSection.append(eventContainer);
                console.log(eventContainer)
                // when the eventContainer is clicked, the name of the event will be added to the request url and run through youtube API
                eventContainer.addEventListener('click', function (event) {
                    event.preventDefault()
                    locationBlock.innerHTML = ""
                    console.log(event.target.name)
                    var latitude = (event.target.dataset.latitude)
                    var longitude = (event.target.dataset.longitude)
                    var artist = (event.target.name).trim()

                    // saving clicked artists to local storage
                    savedEventsArray = savedEventsArray.concat(artist)
                    localStorage.setItem('artists', JSON.stringify(savedEventsArray))

                    // savedEventsArray = JSON.parse(localStorage.getItem('artists'));



                    var apiKey = 'AIzaSyDrE9r5RLbGomSlaxVmS5fZdzrrmGDV9dM'
                    var youtubeUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + artist + '&key=' + apiKey
                    console.log(youtubeUrl)
                    fetch(youtubeUrl)
                        .then((response) => {
                            if (!response.ok) {
                                throw Error(response.statusText)
                            }
                            return response.json()
                        })
                        .then((data) => {
                            // console.log(data)
                            var videos = data.items
                            // setting the data or 'video id' of the first four videos to a variable
                            var vidOneId = videos[0].id.videoId
                            var vidTwoId = videos[1].id.videoId
                            var vidThreeId = videos[2].id.videoId
                            var vidFourId = videos[3].id.videoId
                            // setting the src of the iframes in html to the youtube url with the video id included
                            videoPlayerOne.setAttribute('src', 'https://www.youtube.com/embed/' + vidOneId)
                            videoPlayerTwo.setAttribute('src', 'https://www.youtube.com/embed/' + vidTwoId)
                            videoPlayerThree.setAttribute('src', 'https://www.youtube.com/embed/' + vidThreeId)
                            videoPlayerFour.setAttribute('src', 'https://www.youtube.com/embed/' + vidFourId)
                        })
                        .catch(error => {
                            console.error(error)
                        })
                    var locationApi = 'pk.ef8832aad40eef5a3c9df28e9bdaae7a';
                    var locationUrl = 'https://maps.locationiq.com/v3/staticmap?key=' + locationApi + '&center=' + latitude + "," + longitude + '&zoom=16&size=400x600&format=png&maptype=roadmap&markers=icon:small-red-cutout|' + latitude + ',' + longitude
                    var mapImage = document.createElement('img')
                    mapImage.setAttribute('src', locationUrl)
                    mapImage.setAttribute('class', 'image-box')
                    locationBlock.append(mapImage)
                })
            }
        })
        .catch(error => {
            console.error(error)
            // Get the modal
            var errorModal = document.querySelector("#myModal");
            // Get the <span> element that closes the modal
            var errorSpan = document.getElementsByClassName("close")[0];
            // When the user clicks on the button, open the modal
            errorModal.setAttribute('style', 'display: block')
            // if the 'x' span is clicked, the modal will close
            errorSpan.addEventListener('click', function () {
                errorModal.setAttribute('style', 'display: none')
                window.location.reload()
            })
            // if anywhere outside outside the modal is clicked, the modal will close
            window.addEventListener('click', function (event) {
                if (event.target == errorModal) {
                    errorModal.setAttribute('style', 'display: none')
                    window.location.reload()
                }
            })
        })
}

function showHome() {
    mainPage.setAttribute('style', 'display: unset;');
    secondPage.setAttribute('style', 'display: none;');
    listPage.setAttribute('style', 'display: none;');
}

function seeList() {
    mainPage.setAttribute('style', 'display: none;');
    secondPage.setAttribute('style', 'display: none;');
    listPage.setAttribute('style', 'display: unset;')
    listEl.textContent = ""
    populateArtists()
}

function clearArtists() {
    listEl.textContent = ""
    localStorage.clear()
}





button.addEventListener('click', function (event) {
    event.preventDefault()
    cityInput = inputField.value.trim();
    // checks the input, if it is blank, the modal will apear
    if (!cityInput) {
        var emptyModal = document.querySelector("#modal-empty");
        var emptySpan = document.getElementsByClassName("close-empty")[0];
        emptyModal.setAttribute('style', 'display: block')
        // if the 'x' span is clicked, the modal will close
        emptySpan.addEventListener('click', function () {
            emptyModal.setAttribute('style', 'display: none')
        })
        window.addEventListener('click', function (event) {
            // if the window outside the modal is clicked, the modal will close
            if (event.target == emptyModal) {
                emptyModal.setAttribute('style', 'display: none')
            }
        })
    }
    else {
        nextPage()
    }
    inputField.value = "";
})

title.addEventListener('click', showHome)

listBtn.addEventListener('click', seeList)

clearBtn.addEventListener('click', clearArtists)
