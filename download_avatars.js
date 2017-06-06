var request = require('request');
var fs = require('fs');
var GITHUB_USER = "drhaliburton";
var GITHUB_TOKEN = "443fde915963471c5f9aee62762e491f955c670f";

function printOutput (output) {
  console.log('Downloading...');
  for (var key in output) {
    var avatarURL = output[key]['avatar_url'];
    var newFileName = 'avatars/' + key + '.jpg';
    downloadImageByURL(avatarURL, newFileName);
  }
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

    var parsedBody = JSON.parse(body);

    cb(parsedBody);
  });

}

function downloadImageByURL(url, filePath) {
  var fileName = './' + filePath;
  request.get(url)               // Note 1
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
         })
         .pipe(fs.createWriteStream(fileName));
}

getRepoContributors('jquery', 'jquery', printOutput);
