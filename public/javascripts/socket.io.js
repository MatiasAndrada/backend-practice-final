const socket = io();
function renderPartialhbs(IdTemplate, dataRender, IdInsertTemplate) {
  const template = Handlebars.compile($(IdTemplate).html());
  const html = template({ list: dataRender, listExist: true });
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

//!GET DATA
function getProductList() {
  const data = fetch("/api/productos", {
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
  const idCart = localStorage.getItem("idCart");
    const data = fetch(`/api/carrito/${idCart}/prdt`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if(res.status == 400) {
          createCart()
        }
        if (res.status === 200) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  }

function createCart() {
fetch("/api/carrito", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("Cart created");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
