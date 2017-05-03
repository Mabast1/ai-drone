var oxford = require('project-oxford');
var apikey = "ed14848f43344388b9e40f18517f8c75";
var Oxclient = new oxford.Client(apikey);
var gm = require('gm');
var fs = require('fs');

Oxclient.face.detect({
    path: 'public/DroneImage.png',
    analyzesAge: true,
    analyzesGender: true,
    returnFaceId : true
}).then(function (response) {
    var topy = response[0].faceRectangle.top;
    var topx = response[0].faceRectangle.left;
    var bottomx = response[0].faceRectangle.left + response[0].faceRectangle.width;
    var bottomy = response[0].faceRectangle.top + response[0].faceRectangle.height;
    var textx = topx ;
    var texty = topy - 10; 
    var TextOut = response[0].faceAttributes.age + " , " + response[0].faceAttributes.gender;
    gm('public/DroneImage.png')
       .fill('none')
        .stroke("red",4)
        .drawRectangle(topx,topy,bottomx,bottomy)
        .fontSize("20px")
        .stroke("red",2)
        .font('/Windows/Fonts/trebuc.ttf')
        .drawText(textx,texty,TextOut)
         .write('public/DroneImageSQ.png', function (err) {
        if( err ) throw err;
        console.log(response);    
    });
});


