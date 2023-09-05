const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const newSection = document.querySelector('.model');
const newPokemonDetail = document.createElement('div');

const maxRecords = 151
const limit = 10
let offset = 0;

let pokemonId = "";
let pokemonNumber = "";

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertSinglePokemonToModel(pokemon) {
    return `
    <div class="model-${pokemon.type}">
        <h1 class="model-${pokemon.type}">${pokemon.name}</h1>
        <span class="model-number">#${pokemon.number}</span>
        <div class="model-detail">
            <ol class="model-types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img
                src="${pokemon.photo}"
                alt="${pokemon.name}"/>
        </div>
  </div>
    <div class="model-content-abilities">
        <span>Abilities</span>
        <ol class="model-abilities">
            ${pokemon.abilities.map((abilities) => `<li class="type ${abilities}">${abilities}</li>`).join('')}
        </ol>
    </div>
    `
}

function loadPokemonItens(offset, limit) {
    getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

getPokemons()
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

async function selectPokemon(e) {
    const selectOnePokemon = document.querySelectorAll(".pokemon");
    pokemonId = e.srcElement.parentElement.children[0].innerHTML;
    pokemonNumber = pokemonId.replace('#', '');
    const newPokemon = await getSinglePokemon(pokemonNumber);
    console.log(newPokemon);
    const newHtml = convertSinglePokemonToModel(newPokemon);
    newPokemonDetail.innerHTML = newHtml;
    newSection.appendChild(newPokemonDetail);
}

const selectDivPokemons = document.querySelector(".pokemons");
selectDivPokemons.addEventListener('click', selectPokemon)


