const socket = new WebSocket("ws://localhost:8080");

socket.onmessage = async (event) => {
    const messageText = await event.data.text(); // convert Blob to string
    chatBox.innerHTML += `<div>You: ${messageText}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  };
  
function sendMessage() {
  const input = document.getElementById("messageInput");
  const msg = input.value.trim();
  if (msg !== "") {
    socket.send("You: " + msg);
    input.value = "";
  }
}

