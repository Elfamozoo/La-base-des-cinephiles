let movie_id = location.pathname;

console.log(movie_id);


// Fetch des details des films.

fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
        api_key: api_key
    }))

    .then(res => res.json())
    .then(detail => {
        setupMovieInfo(detail);
    })

const setupMovieInfo = (detail) => {
    const movieName = document.querySelector('.film-nom');
    const genre = document.querySelector('.genre');
    const description = document.querySelector('.description');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.film-info');


    title.innerHTML = movieName.innerHTML = detail.title;
    genre.innerHTML = `${detail.release_date.split('-')[0]} | `
    // Boucle pour les genres de chaque films ( un ou plusieurs selon le film ).
    for (let i = 0; i < detail.genres.length; i++) {
        genre.innerHTML += detail.genres[i].name + formatString(i, detail.genres.length);
    }

    // Pour checker si le film est pour adulte.
    if (detail.adult == true) {
        genre.innerHTML += ' | +18';
    }
    // Pas besoin de checker si poster.path existe ou pas car la structure du site n'autorise pas un film sans poster.
    if (detail.backdrop_path == null) {
        detail.backdrop_path = detail.poster_path;
    }

    // Le substring sert a limiter la description a 200 caracteres au maximum.
    description.innerHTML = detail.overview.substring(0, 200) + '...';

    backdrop.style.backgroundImage = `url(${original_img_url}${detail.backdrop_path})`;


}

// Fonction qui permets d'espacer les genres
const formatString = (currentIndex, maxIndex) => {
    // Si le genre actuel n'est pas le dernier alors cela retourne "," sinon si c'est le dernier cela ne fait rien.
    return (currentIndex == maxIndex - 1) ? '' : ', ';
}



// Fetch le casting

fetch(`${movie_detail_http}${movie_id}/credits?` + new URLSearchParams({
        api_key: api_key
    }))
    .then(res => res.json())
    .then(cast => {
        const casting = document.querySelector('.casting');
        // Je vais recup juste 5 membres du casting d'ou la boucle.
        for (let i = 0; i < 5; i++) {
            casting.innerHTML += cast.cast[i].name + formatString(i, 5)
        }
    })




// Fetch les trailers

fetch(`${movie_detail_http}${movie_id}/videos?` + new URLSearchParams({
        api_key: api_key
    }))
    .then(res => res.json())
    .then(trailer => {
        console.log(trailer);
        let trailerContainer = document.querySelector('.trailer-container');
        // Si je veux seulement recuperer 4 trailers au max je note cette condition.
        let maxClips = (trailer.results.length > 4) ? 4 : trailer.results.length;

        for (let i = 0; i < maxClips; i++) {
            trailerContainer.innerHTML += `
                <iframe src="https://youtube.com/embed/${trailer.results[i].key}" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            `;
        }
    })


fetch(`${movie_detail_http}${movie_id}/recommendations?` + new URLSearchParams({
        api_key: api_key
    }))
    .then(res => res.json())
    .then(recommendations => {
        let recommendationsContainer = document.querySelector('.recommendations-container');
        for (let i = 0; i < 16; i++) {
            if (recommendations.results[i].backdrop_path == null) {
                i++;
            }
            recommendationsContainer.innerHTML += `
                    <div class="film" onclick="location.href = '/${recommendations.results[i].id}'">
                    <img src="${img_url}${recommendations.results[i].backdrop_path}" alt="">
                    <p class="film-titre">${recommendations.results[i].title}</p>
            
            `
        }

    })



    // Button precedent afin de revenir a l'accueil

    document.getElementById('go-back').addEventListener('click', () => {
        document.location.href = 'http://localhost:3000/'
      });