const enviar = document.querySelector("#send");
function send() {
  let nombre = document.querySelector("#nombre").value;
  let mail = document.querySelector("#mail").value;

  // Create a new element to display the message
  const mensajeDiv = document.createElement("div");
  mensajeDiv.textContent = `Hola ${nombre} ¡gracias por dejar tu email ${mail}`;

  // Append the message to the body or any other container
  document.body.appendChild(mensajeDiv);
}
enviar.addEventListener("click", send);
