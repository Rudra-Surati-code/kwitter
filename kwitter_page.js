var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");

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

//YOUR FIREBASE LINKS

function getData() {
 firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
		 name = message_data['name'];
		 message = message_data['message'];
		 like = message_data['like'];
		 name_with_tag = `<h4> "${name}" <img class="user_tick" src="tick.png"></h4>`;
		 message_with_tag = `<h4 class="message_h4">${message}</h4>`;
		 like_button =  `<button class="btn btn-waring" id="${firebase_message_id}" onclick="updateLike(this.id)" value="${like}"></button>`;
		 span_with_tag = `<span class="glyphicon glyphicon-thumbs-up">Like: "${like}"</span></button><hr>`;

		 row = name_with_tag + message_with_tag + like_button + span_with_tag;
		 $("#output").html(row);
      } 

  });  
}); 
}
getData();

$(".send_button").click(function() {
	msg = $("#msg").val();
	firebase.database().ref(room_name).push({
		name: user_name,
		message : msg,
		like: 0	
	});

	console.log(msg);

	document.getElementById('msg').value = "";
})

function updateLike(message_id) {
	button_id = message_id;
	likes = $("#button_id").val();
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(message_id).update({
		like: updated_likes
	})
}

$("#logout").click(function() {
	localStorage.clear();
	window.location.replace("index.html");
})