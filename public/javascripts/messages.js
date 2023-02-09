

socket.emit("refresh-message")

//acceder al usuario


$("#form-messages").submit((e) => {
  e.preventDefault()
  const message = $("#message-input").val()
  const user = $("#username-data").text()
  console.log(user)
  const data = {
    user,
    message,
    date: new Date()
  }
  if (
    data.user != "" &&
    data.message != ""
  )
  console.log("enviar",data)
    socket.emit("new-chat-message", data)
  $("#message-input").val("")
  $("#message-input").focus()

})  