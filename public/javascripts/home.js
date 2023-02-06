
socket.emit("change-list")


//signout
$("#logOutBtn")
    .click(function () {
fetch("signout")
    .then(function () {
        console.log("logged out")
        window.location.href = "/"
    })
    .catch(function (error) {
        console.log(error)
    }
    )
})
