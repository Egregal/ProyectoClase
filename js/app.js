const url = "https://rickandmortyapi.com/api/";
let contenidos;

function mostrarResultados(algo) {
  const listaFormateada = algo.map((item) => {
    const tarjeta = document.createElement("article");
    const parrafo = document.createElement("p");


    const nombreEpisodio = item.episode;


    parrafo.textContent = `${typeof nombreEpisodio == "string" ? nombreEpisodio : ""
      } ${item.name}`;

    if (item.image) {
      const tmp = document.createElement("img");
      tmp.src = item.image;
      tarjeta.appendChild(tmp);
    }

    tarjeta.appendChild(parrafo);


    if (item.origin) {
      if (item.origin.url) {

        const btn = document.createElement("button");
        btn.textContent = "Origen";


        btn.addEventListener("click", () =>
          mostrarOrigen(item.origin.url),
        );


        tarjeta.appendChild(btn);
      }
    }


    return tarjeta;
  });


  contenidos.replaceChildren(...listaFormateada);
}


function mostrarOrigen(url) {

  fetch(url)
    .then((resultado) => resultado.json())
    .then((texto) => {

      contenidos.replaceChildren();
      contenidos.innerHTML = `
                ${texto.name}<br>
                ${texto.type}<br>
                ${texto.dimension}<br>
            `;
    });
}


function llamarAPI(userInput) {

  const urlCompleta = url + userInput;


  fetch(urlCompleta)
    .then((resultado) => resultado.json())
    .then((texto) => mostrarResultados(texto.results))
    .catch((err) => console.log(err));
}



window.onload = () => {

  const myApp = document.getElementById("articulo");

  const botones = document.createElement("div");
  const btnCharacters = document.createElement("button");
  const btnLocations = document.createElement("button");
  const btnEpisodes = document.createElement("button");


  btnCharacters.innerText = "Personajes";
  btnLocations.innerText = "Lugares";
  btnEpisodes.innerText = "Episodios";


  btnCharacters.addEventListener("click", () => llamarAPI("character"));
  btnLocations.addEventListener("click", () => llamarAPI("location"));
  btnEpisodes.addEventListener("click", () => llamarAPI("episode"));


  botones.append(btnCharacters, btnLocations, btnEpisodes);


  const contenedor = document.createElement("div");

  contenedor.id = "contenidos";
  contenedor.classList.add("contenidos");

  contenidos = contenedor;

  myApp.append(botones, contenidos);
};
