// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  const charactersContainer = document.getElementById('charactersContainer');
  const loadBtn = document.getElementById('loadBtn');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.querySelector('#searchInput');

  // Evento de botón: Cargar personajes aleatorios
  loadBtn.addEventListener('click', async () => {
    charactersContainer.innerHTML = ''; // limpiar anteriores
    try {
      const ids = Array.from({ length: 12 }, () => Math.floor(Math.random() * 826) + 1);
      const response = await fetch(`https://rickandmortyapi.com/api/character/${ids}`);
      if (!response.ok) throw new Error('Error al cargar personajes');
      const data = await response.json();
      const characters = Array.isArray(data) ? data : [data];
      renderCharacters(characters);
    } catch (error) {
      charactersContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  });

  // Evento de formulario: Búsqueda de personajes por nombre
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = searchInput.value.trim();
    charactersContainer.innerHTML = '';
    if (!name) return;

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
      if (!response.ok) throw new Error('Personaje no encontrado');
      const { results } = await response.json();
      renderCharacters(results);
    } catch (error) {
      charactersContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  });

  // Renderizar personajes en el DOM
  function renderCharacters(characters) {
    characters.forEach((char) => {
      const div = document.createElement('div');
      div.classList.add('character');
      div.innerHTML = `
        <img class="img" src="${char.image}" alt="${char.name}" />
        <div>
          <h3>${char.name}</h3>
          <p>${char.species} - ${char.status}</p>
        </div>
      `;

      // Evento de clic: Resaltar personaje
      div.addEventListener('click', () => {
        div.classList.toggle('highlight');
      });


      charactersContainer.appendChild(div);
    });
  }
});