require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
const { Console } = require('console');
var textFile = process.argv[2];
var search = process.argv[3];

const output = fs.createWriteStream('./log.txt');
// custom simple logger
const logger = new Console(output);
// use it like console



var spotify =  new Spotify(keys.spotify);
var client =  new Twitter(keys.twitter);


if (textFile == "my-tweets"){
	inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is your twitter name?",
      name: "username"
    }])
.then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.username) {

    	var params = {screen_name: inquirerResponse.username};

      client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for(x in tweets.slice(0, 20)){
    console.log(tweets[x].text);
	logger.log(tweets[x].text);}
  				}
			});
 	 	}
	});
}

if (textFile == "spotify-this-song" && search){

spotify
  .search({ type: 'track', query: search})
  .then(function(response) {
  	for(i in response.tracks.items.slice(0, 5) ){

    console.log("\n"+ response.tracks.items[i].album.artists[0].name);
    console.log(response.tracks.items[i].name);
    console.log(response.tracks.items[i].external_urls.spotify);
    console.log(response.tracks.items[i].album.name);
	logger.log("\n"+ response.tracks.items[i].album.artists[0].name);
    logger.log(response.tracks.items[i].name);
    logger.log(response.tracks.items[i].external_urls.spotify);
    logger.log(response.tracks.items[i].album.name);}
  })
  .catch(function(err) {
    console.log(err);
  });
}
if (textFile == "spotify-this-song" && !search){
	nospotify();

}


if (textFile == "movie-this" && search ){
	request("http://www.omdbapi.com/?t="+search+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log( "\n"+ JSON.parse(body).Title);
    console.log(JSON.parse(body).Released);
    console.log(JSON.parse(body).imdbRating);
    console.log(JSON.parse(body).Ratings[1].Source,JSON.parse(body).Ratings[1].Value);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);

     logger.log( "\n"+ JSON.parse(body).Title);
    logger.log(JSON.parse(body).Released);
    logger.log(JSON.parse(body).imdbRating);
    logger.log(JSON.parse(body).Ratings[1].Source,JSON.parse(body).Ratings[1].Value);
    logger.log(JSON.parse(body).Country);
    logger.log(JSON.parse(body).Language);
    logger.log(JSON.parse(body).Plot);
    logger.log(JSON.parse(body).Actors);

  		}
 
	});

}
if (textFile == "movie-this" && !search ){
	nomovie();
}

if (textFile == "do-what-it-says" ){
	 fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
     
      data1 = data.substr(18);

spotify
  .search({ type: 'track', query: data1})
  .then(function(response) {
  	for(i in response.tracks.items.slice(0, 5) ){

    console.log("\n"+ response.tracks.items[i].album.artists[0].name);
    console.log(response.tracks.items[i].name);
    console.log(response.tracks.items[i].external_urls.spotify);
    console.log(response.tracks.items[i].album.name);

    logger.log("\n"+ response.tracks.items[i].album.artists[0].name);
    logger.log(response.tracks.items[i].name);
    logger.log(response.tracks.items[i].external_urls.spotify);
    logger.log(response.tracks.items[i].album.name);

}
  })
  .catch(function(err) {
    console.log(err);
  });
    console.log(data1);
	});
}

function nospotify(){

spotify
  .search({ type: 'track', query: 'The Sign'})
  .then(function(response) {
  	

    console.log("\n"+ response.tracks.items[5].album.artists[0].name);
    console.log(response.tracks.items[5].name);
    console.log(response.tracks.items[5].external_urls.spotify);
    console.log(response.tracks.items[5].album.name);

    logger.log("\n"+ response.tracks.items[5].album.artists[0].name);
    logger.log(response.tracks.items[5].name);
    logger.log(response.tracks.items[5].external_urls.spotify);
    logger.log(response.tracks.items[5].album.name);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function nomovie(){
request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
       console.log( "\n"+ JSON.parse(body).Title);
    console.log(JSON.parse(body).Released);
    console.log(JSON.parse(body).imdbRating);
    console.log(JSON.parse(body).Ratings[1].Source,JSON.parse(body).Ratings[1].Value);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);

    logger.log( "\n"+ JSON.parse(body).Title);
    logger.log(JSON.parse(body).Released);
    logger.log(JSON.parse(body).imdbRating);
    logger.log(JSON.parse(body).Ratings[1].Source,JSON.parse(body).Ratings[1].Value);
    logger.log(JSON.parse(body).Country);
    logger.log(JSON.parse(body).Language);
    logger.log(JSON.parse(body).Plot);
    logger.log(JSON.parse(body).Actors);
   
  }
});
}





