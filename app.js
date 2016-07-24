/*
****************************************************************************
* Copyright 2016 IBM
*
*   Weather Company Data for IBM Bluemix in Node.js
*
*   By JeanCarl Bisson (@dothewww)
*   More info: https://ibm.biz/nodejs-weather-company-data
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
****************************************************************************
*/

var request = require('request');
var Mustache = require('mustache');
var fs = require('fs');
var express = require('express');
var app = express();

app.set('port', process.env.VCAP_APP_PORT || process.env.PORT || 3000);
app.set('host', process.env.VCAP_APP_HOST || '0.0.0.0');
console.log("host: " + app.get('host'));
console.log("port: " + app.get('port'));
app.listen(app.get('port'));

var username = '';
var password = '';
var host = 'twcservice.mybluemix.net';

// If there are API credentials in the VCAP_SERVICES environment variable, use them.
if(process && process.env && process.env.VCAP_SERVICES) {
  var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
  for(var svcName in vcapServices) {
    if(svcName.match(/^weather.*/)) {
      username = vcapServices[svcName][0].credentials.username;
      password = vcapServices[svcName][0].credentials.password;
      host = vcapServices[svcName][0].credentials.host;
      console.log('Using VCAP service credentials');
      break;
    }
  }
}

app.get('/alerts', function(req, res) {
  var state = req.query.state;
  var url = 'https://'+username+':'+password+'@'+host+':443/api/weather/v1/country/US/state/'+state+'/alerts.json?language=en-US';

  var options = {
    url: url
  };

  request(options, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var result = JSON.parse(body);

      // Return response as JSON?
      if('json' == req.query.format) {
        res.send(result);
      } else {
        // Read in the template.
        var template = fs.readFileSync('templates/alerts.html', 'utf8');

        // Render results in the template.
        var output = Mustache.render(template, result);
        res.send(output);
      }
    } else {
      res.send('Unable to get alerts.');
    }
  });
});

app.get('/alert', function(req, res) {
  var alertId = req.query.id;

  var url = 'https://'+username+':'+password+'@'+host+':443/api/weather/v1/alert/'+alertId+'/details.json?language=en-US';

  var options = {
    url: url
  };

  request(options, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var result = JSON.parse(body);

      // Return response as JSON?
      if('json' == req.query.format) {
        res.send(result);
      } else {
        // Read in the template.
        var template = fs.readFileSync('templates/alert.html', 'utf8');

        // Render results in the template.
        var output = Mustache.render(template, result);
        res.send(output);
      }
    } else {
      res.send('Unable to get forecast.');
    }
  });
});

app.get('/conditions', function(req, res) {
  var zipcode = req.query.zipcode;
  var hours = req.query.hours;

  var url = 'https://'+username+':'+password+'@'+host+':443/api/weather/v1/location/'+zipcode+':4:US/observations.json?units=e';

  var options = {
    url: url
  };

  request(options, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var result = JSON.parse(body);

      // Return response as JSON?
      if('json' == req.query.format) {
        res.send(result);
      } else {
        // Read in the template.
        var template = fs.readFileSync('templates/conditions.html', 'utf8');

        // Render results in the template.
        var output = Mustache.render(template, result);
        res.send(output);
      }
    } else {
      res.send('Unable to get conditions.');
    }
  });
});

app.get('/forecast', function(req, res) {
  var zipcode = req.query.zipcode;

  var url = 'https://'+username+':'+password+'@'+host+':443/api/weather/v1/location/'+zipcode+':4:US/forecast/daily/10day.json?units=e';

  var options = {
    url: url
  };

  request(options, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var result = JSON.parse(body);

      // Return response as JSON?
      if('json' == req.query.format) {
        res.send(result);
      } else {
        // Read in the template.
        var template = fs.readFileSync('templates/forecast.html', 'utf8');

        // Render results in the template.
        var output = Mustache.render(template, result);
        res.send(output);
      }
    } else {
      res.send('Unable to get forecast.');
    }
  });
});

app.get('/timeseries', function(req, res) {
  var zipcode = req.query.zipcode;
  var hours = req.query.hours;

  var url = 'https://'+username+':'+password+'@'+host+':443/api/weather/v1/location/'+zipcode+':4:US/observations/timeseries.json?units=e&hours='+hours;

  var options = {
    url: url
  };

  request(options, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var result = JSON.parse(body);

      // Return response as JSON?
      if('json' == req.query.format) {
        res.send(result);
      } else {
        // Convert time into human-friendly format.
        result.observations = result.observations.map(function(observation) {
            observation.time = new Date(observation.valid_time_gmt*1000).toString();
            return observation;
        });

        // Read in the template.
        var template = fs.readFileSync('templates/timeseries.html', 'utf8');

        // Render results in the template.
        var output = Mustache.render(template, result);
        res.send(output);
      }
    } else {
      res.send('Unable to get timeseries weather.');
    }
  });
});

app.get('/almanac', function(req, res) {
  var zipcode = req.query.zipcode;
  var start = req.query.start;
  var end = req.query.end;

  var url = 'https://'+username+':'+password+'@'+host+':443/api/weather/v1/location/'+zipcode+':4:US/almanac/daily.json?units=e&start='+start+'&end='+end;

  var options = {
    url: url
  };

  request(options, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var result = JSON.parse(body);

      // Return response as JSON?
      if('json' == req.query.format) {
        res.send(result);
      } else {
        result.zipcode = zipcode;

        // Read in the template.
        var template = fs.readFileSync('templates/almanac.html', 'utf8');

        // Render results in the template.
        var output = Mustache.render(template, result);
        res.send(output);
      }
    } else {
      res.send('Unable to get almanac.');
    }
  });
});

app.get('/', function(req, res) {
  // Read in the template.
  var template = fs.readFileSync('templates/index.html', 'utf8');

  // Render results in the template.
  var output = Mustache.render(template, {});
  res.send(output);
});
