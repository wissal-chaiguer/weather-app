//add to the input city on enter key
$("#city").on("keypress", function (e) {
  if (e.keyCode === 13) {
    weather($("#city").val());
  }
});

function weather(city) {
  $.ajax({
    url: "weather.php",
    type: "GET",
    dataType: "json",
    data: {
      city: city,
    },
    success: function (data) {
      console.log(data);
      displayWeather(data);
    },
    error: function () {
      console.log("Error in the request. Please try again later.");
    },
  });
}


function displayWeather(data) {
  // unhide .container
  $(".container").css("display", "block");
  $("#weather").html(
     ` <h2>${data.name}, ${data.sys.country}</h2>
      <div class="weather-grid">
        <h3>${data.weather[0].main}</h3>
        <h3>${data.weather[0].description}</h3>
        <h3>Temperature: ${data.main.temp}°C</h3>
        <h3>Feels like: ${data.main.feels_like}°C</h3>
        <h3>Min: ${data.main.temp_min}°C</h3>
        <h3>Max: ${data.main.temp_max}°C</h3>
        <h3>Pressure: ${data.main.pressure}hPa</h3>
        <h3>Humidity: ${data.main.humidity}%</h3>
        
        <h3>Wind speed: ${data.wind.speed}m/s</h3>
        <h3>Cloudiness: ${data.clouds.all}%</h3>
        <h3>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</h3>
        <h3>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</h3>
      </div>`
    );

  // Pexels API call
  var url = "https://api.pexels.com/v1/search?query=" +"city of  "+ data.name + "&per_page=15&page=1";

  $.ajax({
      url: url,
      type: 'GET',
      headers: {
          'Authorization': '8Wv4A1b0ZXOTNSEbKVd6g9ZkdgVk3UGDBcTJMPuOQnKr6M5k0GALajFn'
      },
      success: function(data) {
          // Assuming you want to display the first image
          var firstPhotoLarge = data.photos[1].src.original;
          console.log(firstPhotoLarge);

          $("body").css({
              backgroundImage: "url(" + firstPhotoLarge + ")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              transition: ":background-image 0.75s ease-in-out"
          });
      },
      error: function(error) {
          console.error('Error:', error);
      }
  });
}
