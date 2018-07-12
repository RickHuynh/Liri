var keys = require('../keys.js');

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});
function getTweets() {
  client.get('statuses/user_timeline', function (error, tweets, response) {
    tweets.forEach(element => {
      console.log(element.text);
    });
  });
};

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: keys.spotify_client_ID,
  secret: keys.spotify_client_secret
});

function getSong(song) {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].album.name);
  });
};



var request = require('request');
function getMovie(movie) {
  request('http://www.omdbapi.com/?t=' + movie + '&apikey=d3fdef63', function (error, response, body) {
    console.log('Title:', JSON.parse(body).Title);
    console.log('Year:', JSON.parse(body).Year);
    console.log('Rating:', JSON.parse(body).Rated);
    console.log('Genre:', JSON.parse(body).Genre);
    console.log('Director(s):', JSON.parse(body).Director);
    console.log('Plot:', JSON.parse(body).Plot);
    console.log('Score:', JSON.parse(body).Metascore);
  });
};

var command = process.argv[2];
if (command == "my-tweets") {
  getTweets();
}
else if (command == "spotify-this-song") {
  var song = process.argv[3];
  getSong(song);

}
else if (command == "movie-this") {
  
  var movie = process.argv[3];
  count = 1;
  while(process.argv[3+count]!=undefined){
    var temp = process.argv[3+count]
    movie += "+"+temp;
    count++;
  }
  getMovie(movie);

}
else if (command == "do-what-it-says") {
  console.log("use fs stream");
}
else {
  console.log("Error");
  console.log("commands are \nmy-tweets \nspotify-this-song <song name> \nmovie-this <movie name>");
}