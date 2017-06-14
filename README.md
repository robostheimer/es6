# Fun with ES6 modules and Template literals

I am working on creating a module-based ES6 app with it's own javascript based templating system.  I am creating the templating system from the ground up, using vanilla Javascript and the tiniest amount of jQuery for DOM manipulation.

The templating so far includes:
1) A way to dynamically create DOM for individual components
2) A way to add actions to individual components; all actions are based on ajax call that are applied to each component's class file
3) An each method which loops through arrays of data and adds items to the DOM

I will be updating this repo periodically. Right now I am using Spotify's api to create a small web app. Once I get a good infrastructure going, I plan to create a fully-fledged music discovery app out using the templating system I built and ES6.

Check out the app at http://es6-spotify-app.s3-website-us-west-2.amazonaws.com/
