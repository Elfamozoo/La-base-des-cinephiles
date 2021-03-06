const main = document.querySelector('.main');
const search = document.querySelector('.search-text');


// C'est mon pass sanitaire ( chaque requete je monte ma key).
fetch(genres_list_http + new URLSearchParams({
        api_key: api_key,
        // ici assigne la variable global langue au language de mon lien api afin d'avoir la langue desiré par l'utilisateur.
        language: langue,
    }))
    // Je recupere ma promesse puis je formate mes données en .json.
    .then(res => res.json())
    // Comme le .json renvoi une promesse j'utilise de nouveau le .then et je renomme comme je souhaite mes données.
    .then(data => {
        // A l'interieur de mes données (data) je vais chercher mes genres(Array [object]).
        data.genres.forEach(genre => {
            // Je nomme ma variable "genre" et j'execute la fonction "fetchMoviesListByGenre".
            fetchMoviesListByGenre(genre.id, genre.name);
        })
    });


const fetchMoviesListByGenre = (id, genre) => {
    fetch(movie_genres_http + new URLSearchParams({
            api_key: api_key,
            language: langue,
            with_genres: id,
            page: ""
        }))
        // Le .then decortique la promesse envoyé par le fetch et recupere la reponse puis la formate en json.
        .then(res => res.json())
        .then(discover => {
            //   A l'interieur de discover je cible ce dont j'ai besoin en l'occurence le results (voir API).
            makeCategoryElement(genre, discover.results)
        })
        .catch(err => console.log(err));
}

// TODO: Voir ce lien pour trouver une alternative a innerHTML (https://stackoverflow.com/questions/11515383/why-is-element-innerhtml-bad-code).
// TODO: Faire un nouveau .js afin de separé mon code afin qu'il soit plus claire.
const makeCategoryElement = (category, image) => {
    main.innerHTML += `
    <div class="film-liste">
            <button class="pre-btn"><i class="fas fa-step-backward fa-2x"></i></button>

            <h1 class="film-categorie">${category}</h1>

            <div class="film-container" id="${category}">
            </div>

            <button class="nxt-btn"><i class="fas fa-step-forward fa-2x"></i></button>
        </div>
    `;

    makeCard(category, image)

}

// On attribue la fonction qui a comme argument(id,data).
const makeCard = (id, image) => {
    const movieContainer = document.getElementById(id);
    image.forEach((card, i) => {
        // backdrop_path est un object string qui permets de recuperer les images des films.
        if (card.backdrop_path == null) {
            // poster_path est un object string qui permets de recuperer les posters des films.
            card.backdrop_path = card.poster_path
            if (card.backdrop_path == null) {
                return;
            }
        }
        movieContainer.innerHTML += `
            <div class="film" onclick="location.href = '/${card.id}'">
                    <img src="${img_url}${card.backdrop_path}" alt="">
                    <p class="film-titre">${card.title}</p>
                </div>
    
            `;

        if (i == image.length - 1) {
            setTimeout(() => {
                setupScrolling();
            }, 100);
        }

    })
}
