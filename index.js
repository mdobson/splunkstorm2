var https = require('https');

Log = function(accessToken, projectId) {
  this.accessToken = accessToken;
  this.projectId = projectId;
  this.url = 'api.splunkstorm.com'
  this.path = '/1/inputs/http';
  this.authHeader = 'Basic ' + new Buffer(':' + this.accessToken).toString('base64');
  this.requestParams = {
    project: this.projectId
  };
};

Log.prototype.send = function(event, sourceType, host, source, cb) {
  sourceType = typeof sourceType !== 'undefined' ? sourceType : 'syslog';
  cb = typeof cb === 'function' ? cb : function() {};
  
  this.requestParams.sourcetype = sourceType;

  if(typeof host !== 'undefined') {
    this.requestParams.host = host;
  } else {
    this.requestParams.host = null;
  }

  if(typeof source !== 'undefined') {
    this.requestParams.source = source;
  } else {
    this.requestParams.source = source;
  }

  var urlArray = [];

  for (var key in this.requestParams) {
    urlArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.requestParams[key]));
  }
  var path = this.path + '?' + urlArray.join('&');

  if(typeof event === 'object') {
    event = JSON.stringify(event);
  }

  var opts = {
    hostname: this.url,
    path: path,
    method: 'POST',
    headers: {
      'Authorization': this.authHeader
    }
  };

  var req = https.request(opts, function(res) { 
    cb(null, res); 
  });

  req.on('error', function(e) {
    cb(e);
  });

  req.write(event);

  req.end();

  req = null;
};

module.exports = Log;


