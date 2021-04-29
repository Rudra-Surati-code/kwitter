  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB-lq2_6MfIP6iYGWNs2TwHTfRApDP1Kpk",
    authDomain: "kwitter-694f0.firebaseapp.com",
    databaseURL: "https://kwitter-694f0-default-rtdb.firebaseio.com",
    projectId: "kwitter-694f0",
    storageBucket: "kwitter-694f0.appspot.com",
    messagingSenderId: "275629927015",
    appId: "1:275629927015:web:3c524d9166d919fe4f42c2",
    measurementId: "G-EZN5L8PTPL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = `Welcome ${user_name}!`;

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).set({
    purpose : "adding room user"
  })

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}


//ADD YOUR FIREBASE LINKS HERE

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
        row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id);'>#"+ Room_names +"</div><hr>";
        document.getElementById("output").innerHTML += row;
      });});}
getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.clear();

  window.location = "index.html";
}