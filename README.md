# Weather Company Data for IBM Bluemix in Node.js

This project shows how to build a basic application that displays a variety of weather data from the Weather Company Data for IBM Bluemix REST API endpoints, including the current weather conditions, forecasted weather for the next ten days, weather alerts, the weather almanac to find conditions over time, and time series weather conditions for the last 24 hours to see how the weather has changed.

This project is the code companion to the Node-RED lab that can be found at [https://github.com/jeancarl/node-red-labs/tree/master/node-red-weather-company-data](https://github.com/jeancarl/node-red-labs/tree/master/node-red-weather-company-data)

## Getting Started in IBM Bluemix

Deploy this application to IBM Bluemix.

## Getting Started on localhost

This application can also be run locally. Create a Weather Company Data for IBM Bluemix service, copy the username and password credentials into the app.js file, and run the application normally.

## How to Use

When the application has been deployed, a number of endpoints are made available. Visit the root URL of the application for links, or use the following URL endpoints to access directly.

### Weather Alerts
The Weather Company Data Alerts API returns active weather alert headlines that are related to severe thunderstorms, tornadoes, earthquakes, and floods. These APIs also return non-weather alerts such as child abduction alerts and law enforcement warnings. The first endpoint will list alert headlines for a specified state passed into the application via a URL query parameter. The second endpoint shows the alert details page, linked from the list generated from the first endpoint, and outputs a more detailed view of the alert.

HTML: http://<<MY-APP>>.mybluemix.net/alerts?state=<<STATE>>
JSON: http://<<MY-APP>>.mybluemix.net/alert?format=json&id=<<ID>>
* Replace <<MY-APP>> with the host of the application you chose.
* Replace <<STATE>> with the two-letter abbreviation for a state (such as CA for California, TX for Texas)

HTML: http://<<MY-APP>>.mybluemix.net/alert?id=<<ID>>
JSON: http://<<MY-APP>>.mybluemix.net/alert?format=json&id=<<ID>>
* Replace <<MY-APP>> with the host of the application you chose.
* Replace <<ID>> with the alert ID from one of the weather alerts.

### Current Weather Conditions
The Weather Company Data for IBM Bluemix API offers a variety of weather attributes including: temperature, humidity, barometric pressure, rain and snowfall, and cloud cover. This endpoint takes a zip code input and displays the current weather observation for that location.

HTML: http://<<MY-APP>>.mybluemix.net/conditions?zipcode=<<ZIP-CODE>>
JSON: http://<<MY-APP>>.mybluemix.net/conditions?format=json&zipcode=<<ZIP-CODE>>
* Replace <<MY-APP>> with the host of the application you chose.
* Replace <<ZIP-CODE>> with the five-digit zip code of a location.

### Daily Forecast
The Weather Company Data for IBM Bluemix API offers a daily forecast API that can contain up to ten days of daily forecasts for each location. Each day of a forecast can contain up to three separate forecasts. For any given forecast day the API can return day, night, and 24-hour forecasts. This endpoint takes a zip code input and displays the ten-day forecast. You can also choose to use the three-, five-, or seven-day API endpoint for a fewer number of days.

HTML: http://<<MY-APP>>.mybluemix.net/forecast?zipcode=<<ZIP-CODE>>
JSON: http://<<MY-APP>>.mybluemix.net/forecast?format=json&zipcode=<<ZIP-CODE>>
* Replace <<MY-APP>> with the host of the application you chose.
* Replace <<ZIP-CODE>> with the five-digit zip code of a location

### Time Series
The Weather Company Data for IBM Bluemix API offers a time series API that returns past observations that occurred up to and including the last 24 hours for the location requested. The recent observations data is continuously updated and replaced with a first-in/first-out methodology (rotating data with newest observation and moving the oldest observations to the archive storage) based on date/time stamping of the observations. The amount of data that is retained and available from any station can be more than 24 individual observation reports. The number of observations is determined by the type of observation it is.

HTML: http://<<MY-APP>>.mybluemix.net/timeseries?zipcode=<<ZIP-CODE>>&hours=<<HOURS>>
JSON: http://<<MY-APP>>.mybluemix.net/timeseries?format=json&zipcode=<<ZIP-CODE>>&hours=<<HOURS>>
* Replace <<MY-APP>> with the host of the application you chose.
* Replace <<ZIP-CODE>> with the five-digit zip code of a location
* Replace <<HOURS>> with the number of hours of results to be returned (0-23)

### Almanac
The Weather Company Data for IBM Bluemix API offers an almanac API that returns the daily almanac for the location identified by location. The almanac information for this API is sourced from National Weather Service observations stations from a time period spanning 10 to 30 years or more. The information is gathered and provided by the National Climatic Data Center (NCDC). This endpoint returns the weather almanac data for a period of dates and see min/max temperatures and the years they occurred, average and mean temperatures, and amounts of precipitation and snowfall.

HTML: http://<<MY-APP>>.mybluemix.net/almanac?zipcode=<<ZIP-CODE>>&start=<<MMDD>>&end=<<MMDD>>
JSON: http://<<MY-APP>>.mybluemix.net/almanac?format=json&zipcode=<<ZIP-CODE>>&start=<<MMDD>>&end=<<MMDD>>
* Replace <<MY-APP>> with the host of the application you chose.
* Replace <<ZIP-CODE>> with the five-digit zip code of a location.
* Replace <<MMDD>> with the start and end dates in the two-digit month (single digit months should be preceded by a zero), two digit day format. March 14th would be 0314.

## HTML Templates

HTML templates used to display results are provided in the following files:

* [alerts.html](https://github.com/jeancarl/nodejs-weather-company-data/tree/master/templates/alerts.html) HTML to display weather alerts in a list.
* [alert.html](https://github.com/jeancarl/nodejs-weather-company-data/tree/master/templates/alert.html) HTML to display weather alert details for an individual alert.
* [conditions.html](https://github.com/jeancarl/nodejs-weather-company-data/tree/master/templates/conditions.html) HTML to display the current conditions for a location.
* [forecast.html](https://github.com/jeancarl/nodejs-weather-company-data/tree/master/templates/forecast.html) HTML to display the 10-day weather forecast.
* [timeseries.html](https://github.com/jeancarl/nodejs-weather-company-data/tree/master/templates/timeseries.html) HTML to display time series observations from the last 24 hours.
* [almanac.html](https://github.com/jeancarl/nodejs-weather-company-data/tree/master/templates/almanac.html) HTML to display weather almanac data.

## License

This code is licensed under Apache 2.0. Full license text is available in [LICENSE](https://github.com/jeancarl/nodejs-weather-company-data/tree/master/LICENSE).
