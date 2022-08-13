//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyAZJH4uJMUAiz8ymO4IR_bbGyhzbucV090",
      authDomain: "project-119845865021832540.firebaseapp.com",
      databaseURL: "https://project-119845865021832540-default-rtdb.firebaseio.com",
      projectId: "project-119845865021832540",
      storageBucket: "project-119845865021832540.appspot.com",
      messagingSenderId: "1069259023280",
      appId: "1:1069259023280:web:df75de44795bcd0fa22c75",
      measurementId: "G-3JYF6Z6H5R"
    };
    
    

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");


function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code

                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data["name"];
                        like = message_data["likes"];
                        message = message_data["message"];
                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png' > </h4>";
                        message_with_tag = "<h4 class='message_h4' >" + message + "</h4>"
                        like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;



                        //End code
                  }
            });
      });
}
getData();

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            likes: 0
      });
      document.getElementById("msg").value = "";

}
function updateLike(message_id) {
      console.log("you liked the message -", message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updateLikes = Number(likes) + 1;
      console.log(updateLikes);

      firebase.database().ref(room_name).child(message_id).update({
            likes: updateLikes
      });


}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

