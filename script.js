var body = document.querySelector('body')
var mainPage = document.querySelector('.front-page')
var secondPage = document.querySelector('.search-result')
var button = document.querySelector('.city-search')
var inputField = document.querySelector(".pure-input");


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
                imgContainer.setAttribute("class", "img-container");
                eventDetailContainer.setAttribute("class", "details");
                img.setAttribute("alt", "Image of performer");
                img.setAttribute("src", imgData);
                eventName.setAttribute("class", "event-detail-component");
                eventDate.setAttribute("class", "event-detail-component");
                eventLocation.setAttribute("class", "event-detail-component");

                // Creating variable for article with class="event-article"
                var eventSection = document.querySelector(".event-article");

               // Appending Elements
                eventContainer.append(imgContainer);
                imgContainer.append(img);

                eventContainer.append(eventDetailContainer);
                eventDetailContainer.append(eventName);
                eventDetailContainer.append(eventDate);
                eventDetailContainer.append(eventLocation);

                 //Appending all above to .event-article
                 eventSection.append(eventContainer);
             }
             })






        }



button.addEventListener('click', nextPage)
