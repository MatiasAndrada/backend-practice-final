const socket = io();
function renderPartialhbs(IdTemplate, dataRender, IdInsertTemplate) {
  const template = Handlebars.compile($(IdTemplate).html());
  const html = template({ list: dataRender });
  $(IdInsertTemplate).html(html);
}


socket.on("connect", () => {
  console.log("socket id:", socket.id);
});

socket.on("refresh-new-products", async () => {
  const prdtList = await getProductList();
  renderPartialhbs("#product-template", prdtList, "#prdtList");
});

socket.on("refresh-new-products-cart", async () => {
  const prdtList = await getCartList();
  renderPartialhbs("#product-cart-template", prdtList, "#cartList");
});

//socket on message
socket.on("refresh-message", (data) => {
  console.log("0")
  console.log(data)

//recibimos el mensaje
const listMessages = document.getElementById("list-messages");
const list = data.map((message) => {
return `<li class="list-group-item">
  <p><strong>${message.user}</strong>: ${message.message}</p>
  <p class="text-end"><small>${message.date}</small></p>
  </li>`;
});
listMessages.innerHTML = list.join("");
});

//!GET DATA
function getProductList() {
  const data = fetch("/api/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
}

function getCartList() {
  const data = fetch(`/api/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }) 
    .catch((err) => {
      console.log(err);
    });
  return data;
}
