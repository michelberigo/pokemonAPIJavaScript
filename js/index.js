$(document).ready(function() {
    var pokemonMetaDadosUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    var pokemonsUrl = [];

    $.get(pokemonMetaDadosUrl, function(result) {
        result.results.forEach(function (pokemonMetaDados) {
            pokemonsUrl.push(pokemonMetaDados.url);
        });

        pokemonsUrl.forEach(function (pokemonUrl) {
            $.get(pokemonUrl, function(pokemon) {
                let tipos = [];

                pokemon.types.forEach(function (type) {
                    tipos.push(type.type.name);
                });

                table.row.add([
                    pokemon.id,
                    "<img src='" + pokemon.sprites.front_default + "' >",
                    pokemon.name,
                    tipos.join(', ')
                ]).draw(false);
            });
        });
    });

    var table = $('#table_pokemon').DataTable({
        "paging": false,
        "info": false,
        "columnDefs": [
            {"targets": 0, "orderable": true},
            {"targets": 1, "orderable": false},
            {"targets": 2, "orderable": true, "className": "primeira-letra-maiuscula"},
            {"targets": 3, "orderable": false, "className": "primeira-letra-maiuscula"},
        ],
        "language": {
            "search": "Pesquisar"
        }
    });
});