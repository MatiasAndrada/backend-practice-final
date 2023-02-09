const socket = io.connect();
const form = document.getElementById("form");
const inputUser = document.getElementById("InputUser");
const inputMessage = document.getElementById("InputMessage");
const listMessages = document.getElementById("ListMessages");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputUser.value && inputMessage.value) {
    socket.emit("new-message", {
      user: inputUser.value,
      message: inputMessage.value,
    });
    inputMessage.value = "";
  }
});


socket.on("new-chat-message", (data) => {
  //recibimos el mensaje
  const list = data.map((message) => {
    return `<li class="list-group-item">
        <p><strong>${message.user}</strong>: ${message.message}</p>
        <p class="text-end"><small>${message.date}</small></p>
        </li>`;
  });
  listMessages.innerHTML = list.join("");
});
