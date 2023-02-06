

socket.emit("change-list-cart")


$("#product-form").submit(function (e) {
  e.preventDefault();
  fetch("/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: $("#product-input-name").val(),
      description: $("#product-input-description").val(),
      price: $("#product-input-price").val(),
      thumbnail: $("#product-input-thumbnail").val(),
      category: $("#product-input-category").val()
    },
  }).then((res) => {
    if (res === 200) {
      $("#product-form")[0].reset()
    }
  });
});
