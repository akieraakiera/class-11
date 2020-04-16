// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map', {
  center: [40.730610, -73.935242],
  zoom: 11
});

// Add base layer
L.tileLayer('https://api.mapbox.com/styles/v1/akicoco/ck6tj2qug009n1ipketdhulej/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWtpY29jbyIsImEiOiJjazB5NTgydmMwY3JlM29wODhubTlqbmQwIn0.4UVYoYgrcLKwCnXnzxEWnw', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'default_public',
  username: 'chara497'
});

// Initialze data source
var source = new carto.source.SQL("SELECT * FROM chara497.untitled_table_13");

// Create style for the data
var style = new carto.style.CartoCSS(`
  #layer {
    polygon-fill: #826DBA;
  }
`);

// Add style to the data
var solayer = new carto.layer.Layer(source, style);

/*
 * Begin layer two
 */

// Initialze source data
var meSource = new carto.source.SQL("SELECT * FROM chara497.untitled_table_14");

// Create style for the data
var meStyle = new carto.style.CartoCSS(`
  #layer {
polygon-fill: yellow;
  }
`);

// Add style to the data
var meLayer = new carto.layer.Layer(meSource, meStyle);




// Add the data to the map as a layer

client.getLeafletLayer().addTo(map);

client.addLayers([meLayer, solayer]);
client.getLeafletLayer().addTo(map);


/*
 * Listen for changes on the layer picker
 */

// Step 1: Find the button by its class. If you are using a different class, change this.
var purpleButton = document.querySelector('.purple-button');

// Step 2: Add an event listener to the button. We will run some code whenever the button is clicked.
purpleButton.addEventListener('click', function (e) {
  source.setQuery("SELECT * FROM chara497.untitled_table_14 WHERE name = 'When you mention reparation.'");
  
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
  console.log('Purple was clicked');
});

var resetButton = document.querySelector('.reset-button');

// Step 2: Add an event listener to the button. We will run some code whenever the button is clicked.
resetButton.addEventListener('click', function (e) {
  source.setQuery("SELECT * FROM chara497.untitled_table_13");
  
  // Sometimes it helps to log messages, here we log to let us know the button was clicked. You can see this if you open developer tools and look at the console.
  console.log('Purple was clicked');
});