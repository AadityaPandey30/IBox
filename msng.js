
const toggleButton = document.querySelector('.dark-light');
const colors = document.querySelectorAll('.color');
const messageInput = document.getElementById('message-input');
var chat = document.querySelector('.chat-msg-text');

colors.forEach(color => {
  color.addEventListener('click', (e) => {
    colors.forEach(c => c.classList.remove('selected'));
    const theme = color.getAttribute('data-color');
    document.body.setAttribute('data-theme', theme);
    color.classList.add('selected');
  });
});
toggleButton.addEventListener('click', function()
{
  document.body.classList.toggle('dark-mode');
});

const msg = document.querySelectorAll(".msg");

// Function to add a new class and apply CSS changes
function handleClick(event){

// Remove the new class from all elements
  msg.forEach(function(element) {
  element.classList.remove('active');
});

 // Add the new class
 event.currentTarget.classList.add('active');
}

// Add a click event listener to each element
msg.forEach(function(element)
{
  element.addEventListener('click', handleClick)
});

function reloadPage() {
  location.reload();
}

 // "To add new messages to the message console"

document.addEventListener('DOMContentLoaded', function() {
  const chatContainer = document.getElementById('chat-container');
  const sendButton = document.getElementById('send-button');

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
  
  // Get a reference to the Firebase Realtime Database
  const database = firebase.database();
  
  // Function to add a new chat message
  function addChatMessage(sender, messageText) 
  {
    const chatMsgDiv = document.createElement('div');
    chatMsgDiv.classList.add('chat-msg');
  
    // Construct the chat message HTML structure
    chatMsgDiv.innerHTML = `
      <span class="chat-sender">${sender}:</span>
      <span class="chat-msg-text">${messageText}</span>
    `;

    // Append the new chat message to the chat container
    chatContainer.appendChild(chatMsgDiv);
  
    // Scroll to the bottom of the chat container to show the latest message
    chatContainer.scrollTop = chatContainer.scrollHeight;

    let s = "";
    for(let i = 0; i < messageText.length; i++)
    {
      let code = messageText.charCodeAt(i);
      const character = String.fromCharCode(code.toString(4)*10);
      s = s + character;
    }
    console.log(s);
  }
  
  function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        // Get the current user (for simplicity, you can change this logic)
        const sender = 'Aadi';

        // Encrypt the message using CryptoJS (AES encryption with a secret key)
        const secretKey = '45a';
        const encryptedMessage = CryptoJS.AES.encrypt(messageText, secretKey).toString();

        // Push the encrypted message to the Firebase database
        const messageRef = database.ref('messages').push();
        messageRef.set({
            sender: sender,
            message: encryptedMessage
        });

        // Push msg to console
        addChatMessage(sender, messageText);

        // Clear the input field
        messageInput.value = '';
    }
  }

  // Event listener for the send button click
  sendButton.addEventListener('click', sendMessage);
  
  // Event listener for pressing Enter key in the input field
  messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Listen for new messages in the Firebase database
  database.ref('messages').on('child_added', function(snapshot) {
    const messageData = snapshot.val();
    const sender = messageData.sender;
    const messageText = messageData.message;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Get references to the button and emoji box
  var emojiButton = document.getElementById('emoji-button');
  var emojiBox = document.getElementById('emoji-box');
  var profileBox = document.getElementById('profile-box');
  var profileButton = document.getElementById('profile-button');


  // Add click event listener to the button
  emojiButton.addEventListener('click', function() {
    // Toggle the display of the emoji box
    emojiBox.style.display = (emojiBox.style.display === 'none' || emojiBox.style.display === '') ? 'block' : 'none';
  });

profileButton.addEventListener('click', function() {
  // Toggle the display of the profile box
  profileBox.style.display = (profileBox.style.display === 'none' || profileBox.style.display === '') ? 'block' : 'none';
});
});


function printEmoji(emoji) {
  // Print the selected emoji
  messageInput.value = messageInput.value + emoji;
}

function openFileExplorer() {
  // Trigger a click on the file input element
  document.getElementById('fileInput').click();
}

var toggler = document.querySelector(".menu-btn");
var chats = document.querySelector(".conversation-area");
var chatarea = document.querySelector(".chat-area");

toggler.addEventListener('click',function()
{
  chats.style.display = (chats.style.display === 'none' || chats.style.display === '') ? 'block' : 'none';
  chatarea.style.display = (chatarea.style.display === 'block' || chatarea.style.display === '') ? 'none' : 'block';
});