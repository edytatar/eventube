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
                eventDate.textContent = "Date: " ;
                eventLocation.textContent = "Location: " ;

                //Setting attributes for elements so they have the correct style
                eventContainer.setAttribute("class", "event");
                eventContainer.setAttribute("style", "display: flex; flex-direction: column; align-items: center; text-align: start; margin-top: 1em; margin-bottom: 10em; font-size: smallest;");
                eventContainer.setAttribute("name", ticketData._embedded.events[i].name);
                imgContainer.setAttribute("class", "img-container");
                eventDetailContainer.setAttribute("class", "details");
                img.setAttribute("alt", "Image of performer");
                img.setAttribute("src", imgData);
                img.setAttribute("name", ticketData._embedded.events[i].name);
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
                eventContainer.addEventListener('click', function(event) {
                        event.preventDefault()
                        console.log(event.target.name)
                        var artist = (event.target.name).trim()

                        var apiKey = 'AIzaSyAUZgeQPKSMTSqIG2JdrIU1Qs33iIE02Zk'
                        var requestUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + artist + '&key=' + apiKey
    
                        console.log(requestUrl)
    
                        fetch(requestUrl)
                            .then((response) => {
                                return response.json()
                            })
                            .then((data) => {
                                console.log(data)
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
                    

                })





            }

        })

}



button.addEventListener('click', nextPage)


