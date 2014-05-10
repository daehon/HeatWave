
function getTemperature(id, cityId) {
  var temperatureRequest = new XMLHttpRequest();

  temperatureRequest.onreadystatechange = function(response) {
    if (temperatureRequest.readyState === 4) {
      if (temperatureRequest.status === 200) {
        var jsonOptions = JSON.parse(temperatureRequest.responseText);

        items = jsonOptions['rows'];
        temperatures = Array();
        items.forEach(function(temp) {
          temperatures += temp['temperature'];
        });
        SetTemperatureData(temperatures, cityId);
      } else {
        // An error occured :(
        console.log("ERROR retrieving temperature for " + id);
      }
    }
  };

  temperatureRequest.open('GET', 'http://jorgepazj.cartodb.com/api/v2/sql?q='
    + 'SELECT%20*%20FROM%20temperatures%20WHERE%20internalname=%27'
    + id  
    + '%27'
    , true);
  temperatureRequest.send();
};
