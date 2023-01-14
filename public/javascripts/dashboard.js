const socket = io.connect();
  



  socket.on("server to client", () => {
    console.log("server to client")
/*     getProductList(); */
    socket.emit("client to server");
  });
 

function renderPartialhbs(data) {
  const template = Handlebars.compile($("#template").html());
  const html = template({ list: data, listExist: true });
  $("#prdtList").html(html);
}

function getProductList() {
  $.ajax({ moment: "GET", url: "/api/productos" }).done((data) => {
    if (data.length > 0) {
      renderPartialhbs(data);
      $("#deleteAll").show();
    } else {
      $("#prdtList").html(
        '<h3 class="text-center m-4">No hay productos cargados</h3>'
      );
    }
  });
}

/*
socket.on("unauthorized-access", () => {
  $("#product-list").prepend(
    `<h3 class="text-center text-danger">Primero tienes que estar logueado!!</h3>`
  );
});
*/

$("#logOutBtn").click(() =>
  fetch("/signout", {
    method: "GET",
  }).then((res) => {
    if (res.status === 200) {
      console.log("Logout successful");
    }
  })
);
