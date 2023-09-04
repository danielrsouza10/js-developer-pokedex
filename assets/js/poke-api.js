
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

let pokemonName = "";
let idPokemon = "";
let pokemonType = "";

pokeApi.getOnePokemon = (pokemonNumber = 1) => {
    const singlePokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
    console.log(singlePokemonUrl)

    return fetch(singlePokemonUrl)
        .then((response) => response.json())
        .then((jsonBody) => {
            console.log(jsonBody)
            pokemonName = jsonBody.name;
            console.log(pokemonName);
            idPokemon = jsonBody.id;
            console.log(idPokemon)
            pokemonType = jsonBody.types;
            console.log(pokemonType)
        })
        .then((pokemon) => console.log(pokemon.id))
    // .then((pokemon) => pokemon.map(pokeApi.getPokemonDetail))
    // .then((detailRequests) => Promise.all(detailRequests))
    // .then((pokemonDetail) => pokemonDetail)
}
