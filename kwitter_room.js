
//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
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
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room name-" + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();


function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}
function redirectToRoomName(x) {
      console.log(x);
      localStorage.setItem("room_name", x);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
