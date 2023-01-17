socket.emit("change-list")



$("#logOutBtn").click(() =>
  fetch("/signout", {
    method: "GET",
  }).then((res) => {
    if (res.status === 200) {
      console.log("Logout successful");
    }
  })
);
