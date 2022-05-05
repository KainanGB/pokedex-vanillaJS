const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}/`;
const getPokemonNames = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`;

const fetchPokemon = async () => {
  const response = await fetch(getPokemonNames);
  const { results } = await response.json();

  const pokemonName = results.map(({ name }) => {
    return {
      name,
    };
  });

  return pokemonName;
};

const renderPokemons = async () => {
  const pokemonNames = await fetchPokemon();
  const data = pokemonNames.map(
    async (pokemon) =>
      await fetch(getPokemonUrl(pokemon.name)).then((res) => res.json())
  );

  Promise.all(data).then((pokemons) => {
    const pokedex = document.querySelector(".pokedex");

    pokemons.map(({ name, types, id, sprites }) => {
      const storeTypes = types.map((t) => t.type.name);
      pokedex.innerHTML += `
      <li class="card ${types}">
          <img class="card-image" alt="${name}" src="${
        sprites.other["official-artwork"].front_default
      }">
            <h2 class="card-title">${name}</h2>
              <p class="card-subtitle">${storeTypes.join(" | ")}</p>
          </li>
      `;
    });
  });
};

renderPokemons();
