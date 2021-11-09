var body = document.querySelector('body')
var mainPage = document.querySelector('.front-page')
var secondPage = document.querySelector('.search-result')
var button = document.querySelector('.city-search')
var inputField = document.querySelector(".pure-input");
var videoPlayerOne = document.querySelector('#frame-one')
var videoPlayerTwo = document.querySelector('#frame-two')
var videoPlayerThree = document.querySelector('#frame-three')
var videoPlayerFour = document.querySelector('#frame-four')


function nextPage(event) {
    event.preventDefault()
    // Hiding "home page" and displaying "second page"
    body.setAttribute('style', 'background-image:  url(images/eventube-crowd-pic.jpg)')
    mainPage.setAttribute('style', 'display: none;')
    secondPage.setAttribute('style', 'display: unset;')

    // Creating variables for ticketmaster API
    var cityName = inputField.value;
    var ticketApiKey = 'cJ7Du9o4a3aUD0VZZwh7fqoTrs6wLvzQ';
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events?apikey=' + ticketApiKey + '&locale=*&city=' + cityName + '&classificationName=music';
    // var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalcode=' + zipCode + '&apikey=' + ticketApiKey;



    // Fetching data - ticketmaster API
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (ticketData) {
            console.log(ticketData);

            //Events loop
            for (var i = 0; i < 5; i++) {

                // Creating elements of event cards
                var eventContainer = document.createElement("section");
                var imgContainer = document.createElement("figure");
                var eventDetailContainer = document.createElement("section");
                var img = document.createElement("img");
                var eventName = document.createElement("h5");
                var eventDate = document.createElement("h5");
                var eventLocation = document.createElement("h5");

                // Storing data for elements in variables
                var imgData = ticketData._embedded.events[i].images[0].url;
                var eventNameData = ticketData._embedded.events[i].name;
                var eventDateData = ticketData._embedded.events[i].dates.start.localDate;
                var eventLocationData = ticketData._embedded.events[i]._embedded.venues[0].name;

                // Adding data to elements
                eventName.textContent = "Name: " + eventNameData;
                eventDate.textContent = "Date: " + eventDateData;
                eventLocation.textContent = "Location: " + eventLocationData;

                //Setting attributes for elements so they have the correct style
                eventContainer.setAttribute("class", "event");
                eventContainer.setAttribute("name", eventNameData);
                eventContainer.setAttribute("style", "display: flex; flex-direction: column; align-items: center; text-align: start; margin-top: 2em; margin-bottom: 2em; font-size: smallest;");
                imgContainer.setAttribute("class", "img-container");
                eventDetailContainer.setAttribute("class", "details");
                img.setAttribute("alt", "Image of performer");
                img.setAttribute("src", imgData);
                img.setAttribute("name", eventNameData);
                img.setAttribute("style", "height: 25em; width: 30em; border: solid 1em red;");
                eventName.setAttribute("class", "event-detail-component");
                eventName.setAttribute("style", "margin: .5em;");
                eventDate.setAttribute("class", "event-detail-component");
                eventDate.setAttribute("style", "margin: .5em;");
                eventLocation.setAttribute("class", "event-detail-component");
                eventLocation.setAttribute("style", "margin: .5em;");

                // Creating variable for article with class="event-article"
                var eventSection = document.querySelector(".event-article");
                eventSection.setAttribute('style', 'overflow: scroll;')

                // Appending Elements
                eventContainer.append(imgContainer);
                imgContainer.append(img);

                eventContainer.append(eventDetailContainer);
                eventDetailContainer.append(eventName);
                eventDetailContainer.append(eventDate);
                eventDetailContainer.append(eventLocation);

                //Appending all above to .event-article
                eventSection.append(eventContainer);

                console.log(eventContainer)
                eventContainer.addEventListener('click', function(event) {
                        event.preventDefault()
                        console.log(event.target.name)
                        var artist = event.target.name

                        var apiKey = 'AIzaSyAUZgeQPKSMTSqIG2JdrIU1Qs33iIE02Zk'
                        var requestUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + artist + '&key=' + apiKey
    
                        console.log(requestUrl)
    
                        fetch(requestUrl)
                            .then((response) => {
                                return response.json()
                            })
                            .then((data) => {
                                console.log(data)
                                let videos = data.items
                                vidOneId = videos[0].id.videoId
                                vidTwoId = videos[1].id.videoId
                                vidThreeId = videos[2].id.videoId
                                vidFourId = videos[3].id.videoId
                                // console.log(vidId)
                                videoPlayerOne.setAttribute('src', 'https://www.youtube.com/embed/' + vidOneId)
                                videoPlayerTwo.setAttribute('src', 'https://www.youtube.com/embed/' + vidTwoId)
                                videoPlayerThree.setAttribute('src', 'https://www.youtube.com/embed/' + vidThreeId)
                                videoPlayerFour.setAttribute('src', 'https://www.youtube.com/embed/' + vidFourId)
    
                            })
                    

                })





            }

        })

}



button.addEventListener('click', nextPage)


