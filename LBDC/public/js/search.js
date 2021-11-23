const form = document.getElementById('form');
const query = getQueryFromSearch();

// Je crée une fonction qui decompose mon url avec URLSearchParams et qui attribue search a ma variable query.
function getQueryFromSearch() {
    console.log(window.location.search)
    return new URLSearchParams(window.location.search).get('search');
}

function resultsBackdrop_path(movies, movieBackdropCount) {
    const results = [];
    let i = 0;

    // Tant que results n'a pas atteint movieBackdropCount je continue a parcourir la liste de mes films(movies).
    // Le i < movies.length-1 sert a eviter les boucles au cas ou la liste de films est moins elevé que movieBackdropCount.
    while (results.length < movieBackdropCount && i < movies.length - 1) {
        // Je créé la variable movie (qui deviendra un objet par la suite)
        // et je lui assigne mon argument movies[i] ( qui est un tableau ) le [i] me sert a parcourir mon tableau et a l'incrementer.
        // movie correspond a l'element dans mon tableau movies ciblé par i.
        const movie = movies[i];
        // Si mes films possede une image je continue d'incrementer.
        if (movie.backdrop_path !== null) {
            // Je push les films recupérés dans mon tableau results.
            results.push(movie);
        }
        // J'incremente mon i par rapport au nombre de films recup
        i++;
    }
    // Je renvoi mon tableau results.
    return results;

}


fetch(search_url + new URLSearchParams({
        api_key: api_key,
        language: langue,
        query: query,
        page: 1,
        include_adult: true,
    }))
    .then(res => res.json())
    .then(searchResult => {
        const resultatContainer = document.querySelector('.resultats-container');
        resultsBackdrop_path(searchResult.results, 20)
            .forEach(movie => {
                resultatContainer.innerHTML += `
                    <div class="film" onclick="location.href = '/${movie.id}'">
                    <img src="${img_url}${movie.backdrop_path}" alt="">
                    <p class="film-titre">${movie.title}</p>
            
            `
            });


    });