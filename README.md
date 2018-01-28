# iFood Frontend Test

Spotifood is used to display the preferred playlists from iFood's customers. The web application has one page that lists the featured playlists at Spotify according to some criteria.

## Running the application
Assuming you have npm and node installed, clone the repository and install its dependencies by running:

	$ cd auth_server/authorization_code
	$ npm install
	$ node app.js

Leave this process running and on a separate terminal window, enter:

	$ cd client
	$ npm install
	$ npm start

Then, open `http://localhost:8888` in a browser.

## Considerations
I relied on [Spotify's auth example](https://github.com/spotify/web-api-auth-examples) and [this](https://github.com/JMPerez/spotify-web-api-js) endpoint's helper to develop this application.

I have implemented just the country and locale filters. If I had more time to study React, I would have done the other requirements and prepared a set of tests for the app. 

I had a really fun time learning and developing on React at the same time. I'm pretty sure I would have a short learning curve on the React environment.