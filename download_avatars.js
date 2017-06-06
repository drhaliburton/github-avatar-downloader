var request = require('request');
var fs = require('fs');
var db = require('dotenv').config({path: '.env', encoding: 'utf8'});

var GITHUB_USER = process.env.DB_USER;
var GITHUB_TOKEN = process.env.DB_PASS;

var repoOwner = process.argv[2];
var repoName = process.argv[3];


// takes in outputs from getRepoContributors and passes in as arguments to downloadImageByURL
function getAvatarURL (output) {
    for (var key in output) {
        if (output['message'] == 'Not Found') {
            console.log('Invalid input. Please enter an existing <repoOwner> && <repoName>.');
            return false;
        }
        var avatarURL = output[key]['avatar_url'];
        var newFileName = 'avatars/' + key + '.jpg';
        downloadImageByURL(avatarURL, newFileName);
    }
    console.log('Downloading...');
}

// downloads image based off inputted url and filepath - called in getAvatarURL
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



// takes in arguments from the command line and performs a get via the GitHub api

function getRepoContributors(owner, name, cb) {
    var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + owner + '/' + name + '/contributors';
    var userInfo = {
        headers: {
            'User-Agent': 'GitHub Avatar Downloader - Student Project' },
        url: requestURL
    };
    if (!owner && !name) {
        console.log('Invalid entry.');
        console.log('Valid inputs: node download_avatar.js <repoOwner> <repoName>');
        return false;
    }
    request.get(userInfo, function (err, response, body) {
        if (err) throw err;
        response.setEncoding('utf8');
        var parsedBody = JSON.parse(body);
        cb(parsedBody);
    });
}


getRepoContributors(repoOwner, repoName, getAvatarURL);
