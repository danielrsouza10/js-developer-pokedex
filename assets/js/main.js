const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
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
                    
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
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

function selectPokemon(e) {
    const selectOnePokemon = document.querySelectorAll(".pokemon");
    pokemonId = e.srcElement.parentElement.children[0].innerHTML;
    pokemonNumber = pokemonId.replace('#', '');
    const newPokemon = getSinglePokemon(pokemonNumber);
    const newHtml = convertPokemonToLi(newPokemon);
    newPokemonDetail.innerHTML = newHtml;
    pokemonList.appendChild(newPokemonDetail);
}

const selectDivPokemons = document.querySelector(".pokemons");
selectDivPokemons.addEventListener('click', selectPokemon)


