var oxford = require('project-oxford'),
    client = new oxford.Client('ed14848f43344388b9e40f18517f8c75'); 



client.face.detect({
    path: 'myFolder/myFace.jpg',
    analyzesAge: true,
    analyzesGender: true
}).then(function (response) {
    console.log('The age is: ' + response[0].attributes.age);
    console.log('The gender is: ' + response[0].attributes.gender);
});




