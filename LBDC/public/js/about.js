let movie_id = location.pathname;

console.log(movie_id);


// Fetch des details des films.

fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
    api_key: api_key
}))

.then(res => res.json())
.then(data => {
    setupMovieInfo(data);
})

const setupMovieInfo = (detail) => {
    const movieName = document.querySelector('.film-nom');
    const genre = document.querySelector('.genre');
    const description = document.querySelector('.description');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.film-info');


    title.innerHTML = movieName.innerHTML = detail.title;
    genre.innerHTML = `${detail.release_date.split('-')[0]} | `
    // Boucle pour le genre
    for(let i = 0; i < detail.genre.length; i++){
        genre.innerHTML += detail.genre[i].name + formatString(i, detail.genre.length);
    }
}

// Fonction qui permets d'espacer les genres
const formatString = (currentIndex, maxIndex) => {
    // Si le genre actuel n'est pas le dernier alors cela retourne "," sinon si c'est le dernier cela ne fait rien.
    return (currentIndex == maxIndex - 1) ? '' : ', ';
}