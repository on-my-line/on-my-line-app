[![Waffle.io - Columns and their card count](https://badge.waffle.io/on-my-line/on-my-line-app.png?columns=all)](https://waffle.io/on-my-line/on-my-line-app?utm_source=badge)

# I'm On My Line

On My Line is a Progressive Web App for New Yorkers who want to explore the city but don't like to transfer trains. D3 visualisation generates a subway line and map  that let users explore food, events, and places of interest near them. Through Yelp, Meetup, and Google Places API, users are provided with a list of results in walking distance from a chosen subway station. These results are available to the users offline to browse while underground. Users can save their line and favorite spots thanks to Firebase. When the user has found something they like, they're provided with a detailed page containing a map, link, and the capability to text it to their friends.

## My anatomy

`/app` has the React setup. `main.jsx` is the entry point.

`/fire` has the Firebase config.

`/functions` is where your [cloud functions](https://firebase.google.com/preview/functions/write-firebase-functions) live.


`/bin` has scripts. (Right now it has *one* script that creates a useful symlink.)

## Conventions

I use `require` and `module.exports` in `.js` files.

I use `import` and `export` in `.jsx` files, unless `require` makes for cleaner code.

I use two spaces, no semi-colons, and generally prefer a less strict version of
[NPM's funny coding style](https://docs.npmjs.com/misc/coding-style). My lint config is
in [eslintrc.js](eslintrc.js).
