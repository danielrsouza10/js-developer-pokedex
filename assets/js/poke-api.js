
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetail.abilities.map((abilities) => abilities.ability.name)
    pokemon.abilities = abilities


    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

function getPokemons(offset = 0, limit = 5) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}





function getSinglePokemon(pokemonNumber) {
    const singlePokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
    return fetch(singlePokemonUrl)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody)
        .then(convertPokeApiDetailToPokemon)
        .then((pokemon) => pokemon)

    // console.log(singlePokemonUrl)
    // return fetch(singlePokemonUrl)
    //     .then((response) => response.json())
    //     .then((pokemon) => pokeApi.getPokemonDetail)
    //     .then((detailRequests) => Promise.all(detailRequests))
    //     .then((pokemonsDetails) => pokemonsDetails)
}
// function getSinglePokemon(pokemonNumber) {
//     const singlePokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
//     const newPokemon = new Pokemon();

//     console.log(singlePokemonUrl)
//     return fetch(singlePokemonUrl)
//         .then((response) => response.json())
//         .then((pokemon) => {
//             newPokemon.name = pokemon.name
//             newPokemon.number = pokemon.id
//             newPokemon.types = pokemon.types.map((typeSlot) => typeSlot.type.name)
//             newPokemon.type = newPokemon.types[0]
//             newPokemon.photo = pokemon.sprites.other.dream_world.front_default
//             newPokemon.abilities = pokemon.abilities.map((abilities) => abilities.ability.name)
//             // console.log(newPokemon)
//         })
//         .then((detail) => Promise.all(detail))

//     // .then((pokemon) => 
//     // .then((detailRequests) => Promise.all(detailRequests))
//     // .then((pokemonsDetails) => pokemonsDetails)


//     //     // .then((jsonBody) => {
//     //     //     const singlePokemon = new SinglePokemon()
//     //     //     singlePokemon.name = jsonBody.name;
//     //     //     console.log(singlePokemon.name)
//     //     //     singlePokemon.id = jsonBody.id;
//     //     //     console.log(singlePokemon.id)
//     //     // })

// }


