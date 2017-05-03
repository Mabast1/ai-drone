var oxford = require('project-oxford');
var apikey ="ed14848f43344388b9e40f18517f8c75"
var client = new oxford.Client(apikey);

client.face.faceList.create("facegroup",{
    name : "Mark Torr"
  });

// Function to create a new facelist to add faces to
function createNewFaceList(ListIdName,ListName){ 
  client.face.faceList.create(ListIdName,{
    name : ListName
  })
  .catch(function(e) {
    console.log(e); // "Something went wrong !"
   }).then(function (){
   console.log("Created Your FaceList");  
  });
}

 client.face.faceList.addFace("facegroup",{
    path : "Mark.jpg",
    name : "Mark Torr"
   });

   // This function is inserting faces into a created facelist
// parameters are the facelist group name, the location of 
// the image and the name of the person
function includeASearchFace(groupname,imgpath,personname){
   client.face.faceList.addFace(groupname,{
    path : imgpath,
    name : personname
   })
   .catch(function(e) {
      console.log(e); // "Something went wrong!"
   }).then(function (){
      console.log("Face Added");
   });  
}


// This function is detecting if a specific detected FaceID is in 
// a given EXISTING facelist group
function findKnownFaces(DetectId,searchFaceListName){
  client.face.similar(DetectId,{
    candidateFaceListId : searchFaceListName
  }).catch(function(e) {
     console.log(e); // "oh, no!"
  }).then(function (response) {
   if (response[0] != null) {
        if (response[0].confidence > 0.5) {
          console.log("Good Match - Found you");
          Console.log(response);
       } 
   } else {
     console.log("Poor or No Match");  
    console.log(response);  
  }
  });
}

 function runAll(imageFileName,searchFaceListName){
  client.face.detect({
      path: imageFileName,
      analyzesAge: true,
      analyzesGender: true,
      returnFaceId : true
   }).then(function (response) {  
      DetectId = response[0].faceId;
      findKnownFaces(DetectId,searchFaceListName); 
   });    
}

var searchFaceListName = "facegroup";
//createNewFaceList(searchFaceListName,"Mark Torr");
//includeASearchFace(searchFaceListName,"Mark.jpg","Mark");
runAll("Mark.jpg",searchFaceListName);