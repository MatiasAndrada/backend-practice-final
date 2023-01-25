

socket.emit("change-list-cart")

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


