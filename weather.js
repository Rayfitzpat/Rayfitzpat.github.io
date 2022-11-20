const $ = (selector) => document.querySelector(selector);  // Shortcut to use $ as a query Selector  

// Global Variables
var cityList;
n = new (Date);
day = n.getDate();
month = n.getMonth() + 1;

var lat;
var long;
var myChart3;
var myChart2;
var myChart;


// Get location uses latitude and Longitude variables and searches the Open Weather api using these
// This is used to initially set the weather data based on the users Geolocation

const getLocation = (searchValue) => {
    const xhr = new XMLHttpRequest(); // creates a new request to the server
    xhr.responseType = "json"; // sets the response type to be JSON
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {  // 4 indicates that the readystate is done & 200 represent sucessful state.  These show sucessful data transfer between the browser and server
            console.log(xhr.response); // logs the response in the console allowing user to check through this and see the various objects returned and the vaklues to pull this information individually
            outputData(xhr.response); // calls the method outputData using the xhr response
            $("#searchBox").value = (xhr.response.city.name);  // adds the city name from the XHR response to the Search box.  
        }
    };
    xhr.onerror = e => console.log(e.message); // console logs error messages
    var countryCode = $("#country").value; // sets the variable countryCode to the value of the dropdown menu from HTML
    xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&units=metric&appid=cb0972d97d8fdfce4828b78849ab847f");  // APi call using Lat & long variables, metric units and my unique API key

    xhr.send();  // sends the request above to the server
};


// getWeatherData uses the value in the search bar to determine the weather city data displayed.
// This will display in either imperial or metric units depending on the checkbox selected
// other details are same as getLocation above
const getWeatherData = (searchValue) => {
    const xhr = new XMLHttpRequest(); // creates a new request to the server
    xhr.responseType = "json"; // sets the response type to be JSON
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) { // 4 indicates that the readystate is done & 200 represent sucessful state.  These show sucessful data transfer between the browser and server
            console.log(xhr.response); // logs the response in the console allowing user to check through this and see the various objects returned and the vaklues to pull this information individually
            outputData(xhr.response); // calls the method outputData using the xhr response
        }
    };
    xhr.onerror = e => console.log(e.message); // console logs error messages
    var countryCode = $("#country").value; // sets the variable countryCode to the value of the dropdown menu from HTML
    //Does a different API call depending on which checkbox is checked and then returns the data in the appropriate units - either metric or imperial
    if ($("#fahrenheit").checked == true) {
        xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "," + countryCode + "&mode=json&units=imperial&appid=cb0972d97d8fdfce4828b78849ab847f");
    } else if ($("#celsius").checked == true) {
        xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "," + countryCode + "&mode=json&units=metric&appid=cb0972d97d8fdfce4828b78849ab847f");
    }
    xhr.send(); // sends the request above to the server
};


// ************************  Output ****************************


// this method outputs the data to the page using various classes and id's to pinpoint specific parts of the HTML
// anything with data. represents data coming from the API call and the text after is directions to a specific piece of data
// the locations for these can be found by looking at the console log for the returned XHR response

// Today's Weather Section
const outputData = (data) => {
    // various variables to store data from the API
    var city = data.city.name
    var currentWeather = data.list[0].weather[0].description;
    var currentTemp = (data.list[0].main.temp).toFixed(2);
    var currentWeather = data.list[0].weather[0].description;
    var icon = data.list[0].weather[0].icon;
    var date = (data.list[0].dt_txt);
    var dateSlice = date.slice(0, 10);

    // Sets the variable outputHTML to contain the following 
    var outputHTML = "<h1>" + city + "</h1>";
    outputHTML += "<p>Date: " + dateSlice + "</p>";
    outputHTML += "<p>Current Weather: " + currentWeather + "</p>";
    outputHTML += "<p>Temperature: " + currentTemp + " Degrees</p>";

    // inserts outputHTML into the HTML containing the id "data"
    $("#data").innerHTML = outputHTML;


    // DAY ONE Part 2 - Right side of page for Today's Weather Section

    // various variables to store data from the API
    var dayTwoWeather = data.list[0].weather[0].description;
    var dayTwoTemp = (data.list[0].main.temp).toFixed(2);
    var dayTwodate = (data.list[0].dt_txt);
    var sunrise = data.city.sunrise * 1000;
    const sunriseTime = new Date(sunrise);
    const sunriseFinal = sunriseTime.toLocaleString();
    var sunset = data.city.sunset * 1000;
    const sunsetTime = new Date(sunset);
    const sunsetFinal = sunsetTime.toLocaleString();
    var humidity = data.list[0].main.humidity;
    // Sets the variable outputTwo to contain the following: 
    var outputTwo = "<h1>" + city + "</h1>"
    outputTwo += "<p class='tagDate'>Sunset: " + sunsetFinal + "</p>";
    outputTwo += "<p class='tagDate'>Sunrise: " + sunriseFinal + "</p>";
    outputTwo += "<p>Humidity: " + humidity + "</p>";

    // inserts outputTwo into the HTML containing the id "data2"
    $("#data2").innerHTML = outputTwo;


    // ************This is for four day forcast**********
    // Variables and outputs for each section of the 4 day forcast.
    // follows the same patterns as the 2 examples above

    // DAY TWO

    var dayTwoWeather = data.list[7].weather[0].description;
    var dayTwoTemp = (data.list[7].main.temp).toFixed(2);
    var dayTwodate = (data.list[7].dt_txt).slice(0, 10);
    var smallPic2 = data.list[7].weather[0].icon;

    var outputDayTwo = "<h1>" + city + "</h1>"
    outputDayTwo += "<p class='tagDate'>Date: " + dayTwodate + "</p>";
    outputDayTwo += "<p class='tagDate'>Expected Weather: " + dayTwoWeather + "</p>";
    outputDayTwo += "<p>Temperature: " + dayTwoTemp + " Degrees</p>";

    $("#dataTwo").innerHTML = outputDayTwo;

    // DAY THREE
    var dayThreeWeather = data.list[15].weather[0].description;
    var dayThreeTemp = (data.list[15].main.temp).toFixed(2);
    var dayThreedate = (data.list[15].dt_txt).slice(0, 10);
    var smallPic3 = data.list[15].weather[0].icon;

    var outputDayThree = "<h1>" + city + "</h1>"
    outputDayThree += "<p class='tagDate'>Date: " + dayThreedate + "</p>";
    outputDayThree += "<p class='tagDate'>Expected Weather: " + dayThreeWeather + "</p>";
    outputDayThree += "<p>Temperature: " + dayThreeTemp + " Degrees</p>";

    $("#dataThree").innerHTML = outputDayThree;
    // DAY FOUR
    var dayFourWeather = data.list[23].weather[0].description;
    var dayFourTemp = (data.list[23].main.temp).toFixed(2);
    var dayFourdate = (data.list[23].dt_txt).slice(0, 10);
    var smallPic4 = data.list[23].weather[0].icon;

    var outputDayFour = "<h1>" + city + "</h1>"
    outputDayFour += "<p class='tagDate'>Date: " + dayFourdate + "</p>";
    outputDayFour += "<p class='tagDate'>Expected Weather: " + dayFourWeather + "</p>";
    outputDayFour += "<p>Temperature: " + dayFourTemp + " Degrees</p>";

    $("#dataFour").innerHTML = outputDayFour;

    //  DAY FIVE
    var dayFiveWeather = data.list[31].weather[0].description;
    var dayFiveTemp = (data.list[31].main.temp).toFixed(2);
    var dayFivedate = (data.list[31].dt_txt).slice(0, 10);
    var smallPic5 = data.list[31].weather[0].icon;

    var outputDayFour = "<h1><br><br>" + city + "</h1>"
    outputDayFive = "<h1><br><br>" + day + "/" + month + "</h1>"
    outputDayFive = "<h1>" + city + "</h1>"
    outputDayFive += "<p class='tagDate'>Date: " + dayFivedate + "</p>";
    outputDayFive += "<p class='tagDate'>Expected Weather: " + dayFiveWeather + "</p>";
    outputDayFive += "<p>Temperature: " + dayFiveTemp + " </p>";

    $("#dataFive").innerHTML = outputDayFive;

    // *************  Charts ******************

    // Checks to see  which checkbox is clicked and then executes the relevant codeblock
    // These code blocks are taken from the code.js site and then modified to contain specific data from the API
    if ($("#chartTemp").checked == true) {
        if (myChart)
            myChart.destroy(); // destroys a chart if it already exists, this stops the charts from glitching when you select different options
        var ChartTest = {
            type: "line", // sets the chart type
            data: {
                labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'], // chart labels
                datasets:
                    [{
                        label: 'Temperature', // Chart Heading
                        data: [

                            // Chart data taken from the API
                            data.list[0].main.temp,
                            data.list[7].main.temp,
                            data.list[15].main.temp,
                            data.list[23].main.temp,
                            data.list[31].main.temp,
                        ],
                        backgroundColor: "rgba(153,255,51,0.4)" // Sets background colour of the data
                    }]
            }
        }
    }
    else if ($("#chartHum").checked == true) {
        if (myChart)
            myChart.destroy(); // destroys a chart if it already exists, this stops the charts from glitching when you select different options
        var ChartTest = {
            type: "line", // chart Type
            data: {
                labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'], // chart labels
                datasets:
                    [{
                        label: 'Humidity', // Chart Heading
                        data: [
                            // Chart data taken from the API
                            data.list[0].main.humidity,
                            data.list[7].main.humidity,
                            data.list[15].main.humidity,
                            data.list[23].main.humidity,
                            data.list[31].main.humidity,
                        ],
                        backgroundColor: "rgba(255,0,0,0.4)" // Sets background colour of the data
                    }]
            }
        }
    }

    // inserts the chart into the HTML using the id "chart One"
    var ctx = document.getElementById('chartOne').getContext('2d');
    myChart = new Chart(ctx, ChartTest);


    // Chart Two
    // 
    if (myChart2) {
        myChart2.destroy(); // destroys a chart if it already exists, this stops the charts from glitching when you select different options
    }
    var ChartTest2 = {
        type: "bar", // chart type
        data: {
            labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'], // chart labels
            datasets:
                [{
                    label: 'Humidity', // Chart Heading
                    data: [
                        // Chart data taken from the API
                        data.list[0].main.humidity,
                        data.list[7].main.humidity,
                        data.list[15].main.humidity,
                        data.list[23].main.humidity,
                        data.list[31].main.humidity
                    ],
                    backgroundColor: "rgba(153,255,51,0.4)" // sets background colour
                },
                {
                    label: 'Pressure', // Chart Heading
                    data: [
                        // Chart data taken from the API
                        data.list[0].main.pressure,
                        data.list[7].main.pressure,
                        data.list[15].main.pressure,
                        data.list[23].main.pressure,
                        data.list[31].main.pressure
                    ],
                    backgroundColor: "rgba(0,102,255,0.4)" // sets background colour
                }]
        }
    }
    // inserts the chart into the HTML using the id "chart Two"
    var ctx = document.getElementById('chartTwo').getContext('2d');
    myChart2 = new Chart(ctx, ChartTest2);


    // Chart Three
    if ($("#barChart").checked == true) {
        if (myChart3)
            myChart3.destroy(); // destroys a chart if it already exists, this stops the charts from glitching when you select different options
        var ChartTest3 = {
            type: "bar", // chart type
            data: {
                labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'], // chart labels
                datasets:
                    [{
                        label: 'Wind Speed', // Chart Heading
                        data: [
                            // Chart data taken from the API
                            data.list[0].wind.speed,
                            data.list[7].wind.speed,
                            data.list[15].wind.speed,
                            data.list[23].wind.speed,
                            data.list[31].wind.speed
                        ],
                        backgroundColor: "rgba(255,0,0,0.4)" // sets background colour
                    }]
            }
        }
    }

    else if ($("#lineChart").checked == true) {
        if (myChart3)
            myChart3.destroy(); // destroys previous existance of this chart 
        var ChartTest3 = {
            type: "line", //chart type
            data: {
                labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'], // chart labels
                datasets:
                    [{
                        label: 'Wind Speed', // Chart Heading
                        data: [
                            // Chart data taken from the API
                            data.list[0].wind.speed,
                            data.list[7].wind.speed,
                            data.list[15].wind.speed,
                            data.list[23].wind.speed,
                            data.list[31].wind.speed
                        ],
                        backgroundColor: "rgba(255,255,0,0.4)"
                    }]
            }
        }
    }

    else if ($("#polarChart").checked == true) {
        if (myChart3)
            myChart3.destroy(); // destroys previous existance of this chart 
        var ChartTest3 = {
            type: 'polarArea', // Chart Type
            data: {
                labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'], // chart labels
                datasets: [{
                    backgroundColor: [
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6",
                        "#34495e"
                    ],
                    data: [
                        // Chart data taken from the API
                        data.list[0].wind.speed,
                        data.list[7].wind.speed,
                        data.list[15].wind.speed,
                        data.list[23].wind.speed,
                        data.list[31].wind.speed
                    ]
                }]
            }
        }
    }
    // inserts the chart into the HTML using the id "chart Three"
    var ctx = document.getElementById('chartThree').getContext('2d');
    myChart3 = new Chart(ctx, ChartTest3);


    // ************************* Icons ***********************************

    // This section uses if statements to check the icon value returned from the api and then sets the icon picture based on this value.
    // The Icon is then inserted into the HTML that has the Class of mainPic.

    if (data.list[0].weather[0].icon == "01d") { // if the value returned equals "01d" then set the Class containing Main pic in HTML to " images3/sun2.svg"
        $(".mainPic").src = "images3/sun2.svg"
    }
    else if (data.list[0].weather[0].icon == "01n") {
        $(".mainPic").src = "images3/moon2.svg"
    }
    else if (data.list[0].weather[0].icon == "02d") {
        $(".mainPic").src = "images3/cloudDay2.svg"
    }
    else if (data.list[0].weather[0].icon == "02n") {
        $(".mainPic").src = "images3/cloudNight2.svg"
    }
    else if (data.list[0].weather[0].icon == "03d") {
        $(".mainPic").src = "images3/cloudDay2.svg"
    }
    else if (data.list[0].weather[0].icon == "03n") {
        $(".mainPic").src = "images3/cloudNight2.svg"
    }
    else if (data.list[0].weather[0].icon == "04d") {
        $(".mainPic").src = "images3/cloudDay2.svg"
    }
    else if (data.list[0].weather[0].icon == "04n") {
        $(".mainPic").src = "images3/cloudNight2.svg"
    }
    else if (data.list[0].weather[0].icon == "09d") {
        $(".mainPic").src = "images3/drizzle.svg"
    }
    else if (data.list[0].weather[0].icon == "09n") {
        $(".mainPic").src = "images3/drizzleNight2.svg"
    }
    else if (data.list[0].weather[0].icon == "10d") {
        $(".mainPic").src = "images3/rainDay2.svg"
    }
    else if (data.list[0].weather[0].icon == "10n") {
        $(".mainPic").src = "images3/rainNight2.svg"
    }
    else if (data.list[0].weather[0].icon == "11d") {
        $(".mainPic").src = "images3/thunder2.svg"
    }
    else if (data.list[0].weather[0].icon == "11n") {
        $(".mainPic").src = "images3/thunder2.svg"
    }
    else if (data.list[0].weather[0].icon == "13d") {
        $(".mainPic").src = "images3/snow2.svg"
    }
    else if (data.list[0].weather[0].icon == "13n") {
        $(".mainPic").src = "images3/snowNight2.svg"
    }
    else if (data.list[0].weather[0].icon == "11d") {
        $(".mainPic").src = "images3/mist2.svg"
    }
    else if (data.list[0].weather[0].icon == "11n") {
        $(".mainPic").src = "images3/mist2.png"
    }

    // DAY TWO SMALL PICS
    // the following 4 sections use the same if statements as above to set the icon pictures for the 4 day forcast again using the api icon values.
    if (smallPic2 == "01d") {
        $(".smallPic2").src = "images3/sun2.svg"
    }
    else if (smallPic2 == "01n") {
        $(".smallPic2").src = "images3/moon2.svg"
    }
    else if (smallPic2 == "02d") {
        $(".smallPic2").src = "images3/cloudDay2.svg"
    }
    else if (smallPic2 == "02n") {
        $(".smallPic2").src = "images3/cloudNight2.svg"
    }
    else if (smallPic2 == "03d") {
        $(".smallPic2").src = "images3/cloudDay2.svg"
    }
    else if (smallPic2 == "03n") {
        $(".smallPic2").src = "images3/cloudNight2.svg"
    }
    else if (smallPic2 == "04d") {
        $(".smallPic2").src = "images3/cloudDay2.svg"
    }
    else if (smallPic2 == "04n") {
        $(".smallPic2").src = "images3/cloudNight2.svg"
    }
    else if (smallPic2 == "09d") {
        $(".smallPic2").src = "images3/drizzle.svg"
    }
    else if (smallPic2 == "09n") {
        $(".smallPic2").src = "images3/drizzleNight2.svg"
    }
    else if (smallPic2 == "10d") {
        $(".smallPic2").src = "images3/rainDay2.svg"
    }
    else if (smallPic2 == "10n") {
        $(".smallPic2").src = "images3/rainNight2.svg"
    }
    else if (smallPic2 == "11d") {
        $(".smallPic2").src = "images3/thunder2.svg"
    }
    else if (smallPic2 == "11n") {
        $(".smallPic2").src = "images3/thunder2.svg"
    }
    else if (smallPic2 == "13d") {
        $(".smallPic2").src = "images3/snow2.svg"
    }
    else if (smallPic2 == "13n") {
        $(".smallPic2").src = "images3/snowNight2.svg"
    }
    else if (smallPic2 == "11d") {
        $(".smallPic2").src = "images3/mist2.svg"
    }
    else if (smallPic2 == "11n") {
        $(".smallPic2").src = "images3/mist2.svg"
    }
    else {
        $(".smallPic2").src = "images3/mist2.svg"
    }

    // DAY THREE SMALL PIC

    if (smallPic3 == "01d") {
        $(".smallPic3").src = "images3/sun2.svg"
    }
    else if (smallPic3 == "01n") {
        $(".smallPic3").src = "images3/moon2.svg"
    }
    else if (smallPic3 == "02d") {
        $(".smallPic3").src = "images3/cloudDay2.svg"
    }
    else if (smallPic3 == "02n") {
        $(".smallPic3").src = "images3/cloudNight2.svg"
    }
    else if (smallPic3 == "03d") {
        $(".smallPic3").src = "images3/cloudDay2.svg"
    }
    else if (smallPic3 == "03n") {
        $(".smallPic3").src = "images3/cloudNight2.svg"
    }
    else if (smallPic3 == "04d") {
        $(".smallPic3").src = "images3/cloudDay2.svg"
    }
    else if (smallPic3 == "04n") {
        $(".smallPic3").src = "images3/cloudNight2.svg"
    }
    else if (smallPic3 == "09d") {
        $(".smallPic3").src = "images3/drizzle.svg"
    }
    else if (smallPic3 == "09n") {
        $(".smallPic3").src = "images3/drizzleNight2.svg"
    }
    else if (smallPic3 == "10d") {
        $(".smallPic3").src = "images3/rainDay2.svg"
    }
    else if (smallPic3 == "10n") {
        $(".smallPic3").src = "images3/rainNight2.svg"
    }
    else if (smallPic3 == "11d") {
        $(".smallPic3").src = "images3/thunder2.svg"
    }
    else if (smallPic3 == "11n") {
        $(".smallPic3").src = "images3/thunder2.svg"
    }
    else if (smallPic3 == "13d") {
        $(".smallPic3").src = "images3/snow2.svg"
    }
    else if (smallPic3 == "13n") {
        $(".smallPic3").src = "images3/snowNight2.svg"
    }
    else if (smallPic3 == "11d") {
        $(".smallPic3").src = "images3/mist2.svg"
    }
    else if (smallPic3 == "11n") {
        $(".smallPic3").src = "images3/mist2.svg"
    }

    // DAY FOUR SMALL PIC

    if (smallPic4 == "01d") {
        $(".smallPic4").src = "images3/sun2.svg"
    }
    else if (smallPic4 == "01n") {
        $(".smallPic4").src = "images3/moon2.svg"
    }
    else if (smallPic4 == "02d") {
        $(".smallPic4").src = "images3/cloudDay2.svg"
    }
    else if (smallPic4 == "02n") {
        $(".smallPic4").src = "images3/cloudNight2.svg"
    }
    else if (smallPic4 == "03d") {
        $(".smallPic4").src = "images3/cloudDay2.svg"
    }
    else if (smallPic4 == "03n") {
        $(".smallPic4").src = "images3/cloudNight2.svg"
    }
    else if (smallPic4 == "04d") {
        $(".smallPic4").src = "images3/cloudDay2.svg"
    }
    else if (smallPic4 == "04n") {
        $(".smallPic4").src = "images3/cloudNight2.svg"
    }
    else if (smallPic4 == "09d") {
        $(".smallPic4").src = "images3/drizzle.svg"
    }
    else if (smallPic4 == "09n") {
        $(".smallPic4").src = "images3/drizzleNight2.svg"
    }
    else if (smallPic4 == "10d") {
        $(".smallPic4").src = "images3/rainDay2.svg"
    }
    else if (smallPic4 == "10n") {
        $(".smallPic4").src = "images3/rainNight2.svg"
    }
    else if (smallPic4 == "11d") {
        $(".smallPic4").src = "images3/thunder2.svg"
    }
    else if (smallPic4 == "11n") {
        $(".smallPic4").src = "images3/thunder2.svg"
    }
    else if (smallPic4 == "13d") {
        $(".smallPic4").src = "images3/snow2.svg"
    }
    else if (smallPic4 == "13n") {
        $(".smallPic4").src = "images3/snowNight2.svg"
    }
    else if (smallPic4 == "11d") {
        $(".smallPic4").src = "images3/mist2.svg"
    }
    else if (smallPic4 == "11n") {
        $(".smallPic4").src = "images3/mist2.svg"
    }


    //  DAY FIVE SMALL PIC
    if (smallPic5 == "01d") {
        $(".smallPic5").src = "images3/sun2.svg"
    }
    else if (smallPic5 == "01n") {
        $(".smallPic5").src = "images3/moon2.svg"
    }
    else if (smallPic5 == "02d") {
        $(".smallPic5").src = "images3/cloudDay2.svg"
    }
    else if (smallPic5 == "02n") {
        $(".smallPic5").src = "images3/cloudNight2.svg"
    }
    else if (smallPic5 == "03d") {
        $(".smallPic5").src = "images3/cloudDay2.svg"
    }
    else if (smallPic5 == "03n") {
        $(".smallPic5").src = "images3/cloudNight2.svg"
    }
    else if (smallPic5 == "04d") {
        $(".smallPic5").src = "images3/cloudDay2.svg"
    }
    else if (smallPic5 == "04n") {
        $(".smallPic5").src = "images3/cloudNight2.svg"
    }
    else if (smallPic5 == "09d") {
        $(".smallPic5").src = "images3/drizzle.svg"
    }
    else if (smallPic5 == "09n") {
        $(".smallPic5").src = "images3/drizzleNight2.svg"
    }
    else if (smallPic5 == "10d") {
        $(".smallPic5").src = "images3/rainDay2.svg"
    }
    else if (smallPic5 == "10n") {
        $(".smallPic5").src = "images3/rainNight2.svg"
    }
    else if (smallPic5 == "11d") {
        $(".smallPic5").src = "images3/thunder2.svg"
    }
    else if (smallPic5 == "11n") {
        $(".smallPic5").src = "images3/thunder2.svg"
    }
    else if (smallPic5 == "13d") {
        $(".smallPic5").src = "images3/snow2.svg"
    }
    else if (smallPic5 == "13n") {
        $(".smallPic5").src = "images3/snowNight2.svg"
    }
    else if (smallPic5 == "11d") {
        $(".smallPic5").src = "images3/mist2.svg"
    }
    else if (smallPic5 == "11n") {
        $(".smallPic5").src = "images3/mist2.svg"
    }
}
//   ***********  end of Icons ********************


// GeoLocation Script

// This script was taken from Google Maps and is used to get the users longitude and Latitude and then display a map of their location
function showPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap, showError);
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}

// Define callback function for successful attempt
function showMap(position) {
    // Get location data
    // Variables lat and long are used in the API call in the function getLocation to set the weather to the users current location
    lat = position.coords.latitude; // sets the variable lat to the value contained in position.coords.latitude
    long = position.coords.longitude;// sets the variable long to the value contained in position.coords.longitude
    var latlong = new google.maps.LatLng(lat, long);

    var myOptions = {
        center: latlong,
        zoom: 16,
        mapTypeControl: true,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    }
    getLocation(); // calls getLocation method
    var map = new google.maps.Map(document.getElementById("embedMap"), myOptions); // inserts the map into the HTML containing the class "embedMap"
    var marker = new google.maps.Marker({ position: latlong, map: map, title: "You are here!" });
    $(".latLong").innerHTML = "Your Latitude: " + lat + "<br>Your Longitude: " + long // tells the user their Latitude and Longitude
}

// Displays errors based on various outcomes from trying to retrieve the users location
function showError(error) {
    if (error.code == 1) {
        result.innerHTML = "You've decided not to share your position, but it's OK. We won't ask you again.";
    } else if (error.code == 2) {
        result.innerHTML = "The network is down or the positioning service can't be reached.";
    } else if (error.code == 3) {
        result.innerHTML = "The attempt timed out before it could get the location data.";
    } else {
        result.innerHTML = "Geolocation failed due to unknown error.";
    }
}



// *********** Dom Loader ******************


// contains all the methods to run, once the page initially loads
document.addEventListener("DOMContentLoaded", () => {
    showPosition(); // calls the showPosition function to get the users location

    $("#searchButton").addEventListener("click", () => { // gets the weather data based on what text is contained in the searchBox

        getWeatherData($("#searchBox").value); // calls getWeatherData using the value within the searchbox

    });

    // Sets the checkbox for celsius to unchecked if the fahrenheit one is checked

    $("#fahrenheit").addEventListener("click", () => {
        if ($("#fahrenheit").checked == true) {
            $("#celsius").checked = false;
            getWeatherData($("#searchBox").value); // calls getWeatherData using the value within the searchbox
        }
    });

    // sets the checkbox for Fahrenheit to unchecked if the celsius one is checked

    $("#celsius").addEventListener("click", () => {
        if ($("#celsius").checked == true) {
            $("#fahrenheit").checked = false;
            getWeatherData($("#searchBox").value); // calls getWeatherData using the value within the searchbox
        }
    });

    
    // Sets temperature Checkbox to uncehecked if the humidity one is checked and vice versa
    $("#chartHum").addEventListener("click", () => {
        if ($("#chartHum").checked == true) {
            $("#chartTemp").checked = false;
            getWeatherData($("#searchBox").value); // calls getWeatherData using the value within the searchbox
        }
    });
    // Sets humidity Checkbox to uncehecked if the temperature one is checked
    $("#chartTemp").addEventListener("click", () => {
        if ($("#chartTemp").checked == true) {
            $("#chartHum").checked = false;
            getWeatherData($("#searchBox").value);
        }
    });

    // sets the line chart AND polarchart checkboxes to unchecked if the bar chart one is checked

    $("#barChart").addEventListener("click", () => {
        if ($("#barChart").checked == true) {
            $("#lineChart").checked = false;
            $("#polarChart").checked = false;
            getWeatherData($("#searchBox").value); // calls getWeatherData using the value within the searchbox
        }
    });

    // sets the bar chart AND polarchart checkboxes to unchecked if the line chart one is checked
    $("#lineChart").addEventListener("click", () => {
        if ($("#lineChart").checked == true) {
            $("#barChart").checked = false;
            $("#polarChart").checked = false;
            getWeatherData($("#searchBox").value); // calls getWeatherData using the value within the searchbox
        }
    });

    // sets the line chart AND bar chart checkboxes to unchecked if the polar chart one is checked
    $("#polarChart").addEventListener("click", () => {
        if ($("#polarChart").checked == true) {
            $("#barChart").checked = false;
            $("#lineChart").checked = false;
            getWeatherData($("#searchBox").value); // calls getWeatherData using the value within the searchbox
        }
    });


})


