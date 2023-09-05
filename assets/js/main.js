const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const newSection = document.querySelector('.modal');
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
    <div class="modal-${pokemon.type}">
        <h1 class="modal-${pokemon.type}">${pokemon.name}</h1>
        <span class="modal-number">#${pokemon.number}</span>
        <div class="modal-detail">
            <ol class="modal-types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img
                src="${pokemon.photo}"
                alt="${pokemon.name}"/>
        </div>
  </div>
    <div class="modal-content-abilities">
        <span>Abilities</span>
        <ol class="modal-abilities">
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
    pokemonId = e.srcElement.parentElement.children[0].innerHTML;
    pokemonNumber = pokemonId.replace('#', '');
    const newPokemon = await getSinglePokemon(pokemonNumber);
    console.log(newPokemon);
    const newHtml = convertSinglePokemonToModel(newPokemon);
    newPokemonDetail.innerHTML = newHtml;
    newPokemonDetail.className = "modal-pokemon"
    newSection.appendChild(newPokemonDetail);
}

const selectDivPokemons = document.querySelector(".pokemons");
selectDivPokemons.addEventListener('click', selectPokemon)


