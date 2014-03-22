var splunk = require('../');

var logger = new splunk(process.env.API_KEY, process.env.PROJECT_ID);

function resHandle(err, res) {
  if(err) {
    console.log(err);
  } else {
    console.log(res);
  }
};

logger.send({'event':'test', 'msg':'Test for mem usage'}, 'elroy-test', 'mdobs.localhost', 'terminal', resHandle);
