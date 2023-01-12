const socket = io.connect();

function renderPartialhbs(data) {
  const template = Handlebars.compile($("#template").html());
  const html = template({ list: data, listExist: true });
  $("#prdtCartList").html(html);
}

function getCartList() {
  const idCart = localStorage.getItem("idCart");
  if (idCart) {
    $.ajax({ moment: "GET", url: "/api/carrito/" + idCart + "/prdt" }).done(
      (data) => {
        if (data.length > 0) {
          renderPartialhbs(data);
          $("#deleteAll").show();
        } else {
          $("#prdtCartList").html(
            '<h3 class="text-center m-4">No hay productos cargados</h3>'
          );
        }
      }  
    );
  }
}
socket.on("refresh-new-products-cart", () => {
  getCartList();
});

$("#sign-in-btn").submit(function (e) {
  e.preventDefault();
  const cartSelect = $("#cart-select").val();
  if (cartSelect) {
    localStorage.setItem("idCart", cartSelect);
    getCartId();
  }
  $("#sign-in-form").html(
    `<button id="log-out-btn" class="btn-danger">Log Out</button>`
  );
  $("#log-out-btn").click(function () {
    location.reload();
  });
});

$("#product-form").submit(function (e) {
  e.preventDefault();
  fetch("/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: $("#product-input-name").val(),
      description: $("#product-input-description").val(),
      price: $("#product-input-price").val(),
      thumbnail: $("#product-input-thumbnail").val(),
    },
  }).then(() => {
    socket.emit("change-list");
    $("#product-form")[0].reset();
  });
});
