var GITHUB_USER = "drhaliburton";
var GITHUB_TOKEN = "443fde915963471c5f9aee62762e491f955c670f";
var request = require('request');


function printOutput (output) {
  console.log(output);
}


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';


  var userInfo = {
    headers: {
    "User-Agent": "GitHub Avatar Downloader - Student Project" },
    url: requestURL
  }


  request.get(userInfo, function (err, response, body) {
    if (err) throw err;
    response.setEncoding('utf8');

    var bodyResult = "";
    response.on('data', function (data) {
        for (var i = 0; i < data.length; i++) {
          bodyResult += data[i].body;
        }
      });
    response.on('end', function() {
      callback(dataResult);
    });
  });
}



getRepoContributors('jquery', 'jquery', printOutput);
