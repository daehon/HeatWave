// Get the <datalist> and <input> elements.
var dataList = document.getElementById('cities-datalist');
var cities = {};

// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();

// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);

      items = jsonOptions['rows']
      // Loop over the JSON array.
      items.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item['name1'];
        // Create Hash with the data for the city
        cities[item['name1']] = {
          internalname: item['internalname'],
          lat: item['lat'],
          lon: item['lon']
        };
        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
      });
    } else {
      // An error occured :(
      console.log("Didn't load the JSON with the cities!");
    }
    request = null;
  }
};


// Set up and make the request.
request.open('GET', 'http://jorgepazj.cartodb.com/api/v2/sql?q=SELECT%20name1,name2,internalname,population,lat,lon%20FROM%20heatwave_cities', true);
request.send();

