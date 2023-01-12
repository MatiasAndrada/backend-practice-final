//devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno.
const calculo = (cantRandoms) => {
  const randoms = {};
  for (let i = 0; i < cantRandoms; i++) {
    const random = Math.floor(Math.random() * 1000) + 1;
    if (randoms[random]) {
      randoms[random] += 1;
    } else {
      randoms[random] = 1;
    }
  }
  return randoms;
};

process.on("message", (cantRandoms) => {
  const dato = calculo(cantRandoms);
  console.log(dato);
  process.send(dato);
});
