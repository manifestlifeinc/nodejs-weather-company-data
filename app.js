var request = require('request')
const global_headlines = require('./global-weather-notification-headlines')
const global_details = require('./weatheralertsdetail')

const HOST = "https://api.weather.com"
const apiKey = process.env.WEATHER_API_KEY
const baseParams = '?format=json&language=en-US&apiKey=' + apiKey
const apiOptions = {
  headers: {
    'accept': 'application/json', 
    'gzip': true
  }
}

// Hawaii
let lat = '33.40'
let lon = '-83.42'
// Punta Cana, DR
lat = '18.57001'
lon = '-68.36907'
// Boston, MA
lat = '42.3600'
lon = '-71.06536'
// Los Angeles, CA
lat = '34.040873'
lon = '-118.482745'
// Raleigh, NC
lat = '35.843686'
lon = '-78.78548'

callGlobalWeatherNotificationHeadlines(lat, lon)

function callGlobalWeatherNotificationHeadlines(lat, lon) {
  let url = HOST + global_headlines.API + baseParams
  url += '&geocode=' + lat + '%2C' + lon
  apiOptions.url = url
  
  request(apiOptions, (error, response, body) => {
    if (!error) {
      if (response.statusCode == 204) {
        console.log("204: good request but no alerts in area")
      } else if (response.statusCode == 200) {
        res = JSON.parse(body)
        detailKeys = global_headlines.handleResponse(res)
        if (detailKeys && detailKeys.length > 0) {
          detailKeys.forEach(detailKey => {
            callWeatherAlertsDetail(detailKey)
          });
        }
      }
    } else { // handle error
      console.log(error)
    }
  })
}

function callWeatherAlertsDetail(detailKey) {
  let url = HOST + global_details.API + baseParams
  url += '&alertId=' + detailKey
  
  request(apiOptions, (error, response, body) => {
    if (!error) {
      if (response.statusCode == 204) {
        console.log("204: good request but no alerts in area")
      } else if (response.statusCode == 200) {
        res = JSON.parse(body)
        console.log(res)
      }
    } else { // handle error
      console.log(error)
    }
  })
}
