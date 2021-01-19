

# My Solution to the UX Developer Intern & Web Developer Intern Challenge - Summer 2021

## The Shoppies: Movie awards for entrepreneurs
Shopify has branched out into movie award shows and we need your help. Please build us an app to help manage our movie nominations for the upcoming Shoppies.

## The Challenge
We need a webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

We'd like a simple to use interface that makes it easy to:

- Search OMDB and display the results (movies only)

- Add a movie from the search results to our nomination list

- View the list of films already nominated

- Remove a nominee from the nomination list

## Technical requirements

- Search results should come from OMDB's API ([free API key](http://www.omdbapi.com/apikey.aspx)).
- Each search result should list at least its title, year of release and a button to nominate that film.
- Updates to the search terms should update the result list
- Movies in search results can be added and removed from the nomination list.
- If a search result has already been nominated, disable its nominate button.
Display a banner when the user has 5 nominations.

## Technology Used

- React, Redux, TypeScript
- Jest, React Testing Library(RTL), Test Data Bot, Mock Service Workers(MSW), Lodash-debounce

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

