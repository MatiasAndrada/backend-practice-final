(async () => {
    try {
      const response = await fetch("/api/datos", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.status != 200) {
        return (location.href = "/noAutorizado.html");
      }
      const data = await response.json();
      console.log("/api/datos", data)
      const response2 = await fetch("/plantillas/datos.hbs");
      const plantila = await response2.text();
      const templateFun = Handlebars.compile(plantila);
      const html = templateFun({ datos: data.datos, contador: data.contador });
      document.querySelector('main').innerHTML = html;
    } catch (error) {
      document.querySelector('main').innerHTML = `<h1>${error}</h1>`;
    }
  })()
  
  function logout() {
    localStorage.removeItem("access_token");
    location.href = "/login";
  }
  