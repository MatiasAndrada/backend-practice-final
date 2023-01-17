$("#sign-in-btn").click(function (e) {
  e.preventDefault();
  const cartSelect = $("#cart-select").val();
  if (cartSelect) {
    localStorage.setItem("idCart", cartSelect);
    socket.emit("change-list-cart");
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

