var GITHUB_USER = "drhaliburton";
var GITHUB_TOKEN = "443fde915963471c5f9aee62762e491f955c670f";
var request = require('request');


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ":" + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});



// request.get('https://sytantris.github.io/http-examples')               // Note 1
//        .on('error', function (err) {
//          throw err;
//        })
//        .on('response', function (response) {
//          console.log('Downloading...');
//        })
//        .pipe(fs.createWriteStream('./future.jpg'))
//        .on('end', function() {
//          console.log('Download Complete');
//        });
