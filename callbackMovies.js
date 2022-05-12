const request = require("request");
const fs = require("fs");

request("https://ghibliapi.herokuapp.com/films", (error, response, body) => {
  if (error) {
    console.log(`Could not send request to API: ${error.message}.`);
    return;
  }

  if (response.statusCode !== 200) {
    console.log(
      `Expected status code 200 but received ${response.statusCode}.`
    );
    return;
  }

  console.log("Processing out list of movies");
  movies = JSON.parse(body);
  let moviesList = "";
  movies.forEach((movie) => {
    moviesList += `${movie["title"]}, ${movie["release_date"]}\n`;
  });

  fs.writeFile("callbackMovies.csv", moviesList, (error) => {
    if (error) {
      console.log(`Could not save the Ghibli movies to a file: ${error}`);
    }
    console.log("Saved our list of movies to callbackMovies.csv");
  });
});
