var request = require('request');
var fs = require('fs');
var GITHUB_USER = "drhaliburton";
var GITHUB_TOKEN = "443fde915963471c5f9aee62762e491f955c670f";

function printOutput (output) {
  for (var key in output) {
    console.log(output['avatar_url']);
  }
}

// function getRepoContributors(repoOwner, repoName, cb) {
//   var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
//
//   var userInfo = {
//     headers: {
//     "User-Agent": "GitHub Avatar Downloader - Student Project" },
//     url: requestURL
//   }
//
//   request.get(userInfo, function (err, response, body) {
//     response.setEncoding('utf8');
//
//     if (err) throw err;
//
//     response.on('end', function(parsedBody) {
//       var parsedBody = JSON.parse(body);
//       callback(parsedBody);
//     });
//   });
// }

function downloadImageByURL(url, filePath) {

  request.get(url)               // Note 1
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           console.log('Downloading...');
         })
         .pipe(fs.createWriteStream('./newAvatar.jpg'))
         .on('end', function() {
           console.log('Download Complete');
         });

}


downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


// getRepoContributors('jquery', 'jquery', printOutput);
