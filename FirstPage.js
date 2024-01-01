
  // Initialize Firebase with your Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCb2WbsG0Xmxz4rTuij2Rm6pJojrPI8lFM",
    authDomain: "ibox2-fb711.firebaseapp.com",
    databaseURL: "https://ibox2-fb711-default-rtdb.firebaseio.com",
    projectId: "ibox2-fb711",
    storageBucket: "ibox2-fb711.appspot.com",
    messagingSenderId: "545428073999",
    appId: "1:545428073999:web:9a6b0a6feb88ebc9953d7a"
  };
  
  // initialize our firebase
  firebase.initializeApp(firebaseConfig);
  
// initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up register function
function register()
{
  email = document.getElementById('email').value;
  password = document.getElementById('passsword').value;

  // Move on with Auth
  auth.createUserUserWithEmailAndPassword(email, password)
  .then(function()
  {
    var user = auth.currentUser

    // Add this user to firebase database
    var database_ref = database.ref()

    // Create User Data
    var user_data = {
      email: email,
      password: password,
    }
    database_ref.child('users/' + user)
  })
  .catch(function(error)
  {
    var error_code = error.code
    var error_message = error.message
    alert(error_message);
  })
}

// Set up Login functions
function login()
{
  // Get all i/p
  email = document.getElementById('email').value;
  password = document.getElementById('passsword').value;

  auth.createUserUserWithEmailAndPassword(email, password)
  .then(function(){
    var user = auth.currentUser

    // Add this user to firebase database
    var database_ref = database.ref()

    database_ref.child('users/' + user.uid).update(user_data);
  })
}


