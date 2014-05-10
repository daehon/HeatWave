// Get the <datalist> and <input> elements.
var dataList = document.getElementById('cities-datalist');

// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();

// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);

      cities = jsonOptions['rows']
      // Loop over the JSON array.
      cities.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item['name1'];
        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
      });

    } else {
      // An error occured :(
      console.log("Didn't load the JSON with the cities!");
    }
  }
};


// Set up and make the request.
request.open('GET', 'http://jorgepazj.cartodb.com/api/v2/sql?api_key=5623ba4d3f266753437e57701ffd8b0759f49410&q=SELECT%20name1,name2,internalname,population,lat,lon%20FROM%20heatwave_cities', true);
request.send();

