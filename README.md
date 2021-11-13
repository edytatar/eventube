# Eventube
## Table of Contents:
  1. [Description](#Description)
  2. [Installation](#Installation)
  3. [Usage](#Usage)
  4. [Future Developments](#FutureDevelopments)
  5. [Credits](#Credits)
  6. [Questions](#Questions) 

## Description & Motivation
This application is a simple tool for users to find musical events in their local area using Ticketmaster, YouTube, and LocationIQ's API. All you as the user needs to do is type in a city, click on an event/artist that appeals to you, and the location of venue will pop up with some videos from YouTube of the artist selected! It's like Magic! 

Our motivation to develop the application was so that nobody has to go to a show that they dislike ever again!

## Installation
To install and run locally from Git Hub repository, go to the repository: https://github.com/Project-1-SEE/eventube 
Click CODE box, select SSH and copy the repository to your clipboard In your command-line navigate to the folder you want to hold the repository.
Once there type 'git clone' and paste the repository information into the line.
Once completed open the code in VS by typing the command code .
This will take you to VS Code and you will be in the repository on your local machine.  

To access directly from the live GitHub Link: https://project-1-see.github.io/eventube/ 

## Usage 
The user navigates to the site via: https://project-1-see.github.io/eventube/   

They are presented with the homepage where you type in a city.:
![Homepage]()

Once the user types in a city 5 events will pop up.: 
![Events]()

Once an event is clicked, the user will then see the location of the venue and 4 YouTube videos of the selected artist/event.: 
![YouTube&MapImage]()

If no location is entered, you will be met with a message that says "You did not submit anything!", and will be returned to the homepage."
![ErrorMessage]()

If a location that isn't valid is entered, then you will be met with a 404 message and will be returned to the homepage.:
![ErrorMessage]()

Voila! Now you have something to do with your day off in the selected city!

## Future Developments

We want the user to be able to search by address and zip code in future production. We want to be able to filter events by distance from location input. In the future we would like to be able to search events of specific music genres. We also want to sort and organize stored events by location and date.