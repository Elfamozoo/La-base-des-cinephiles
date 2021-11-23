const form = document.getElementById('form');
const query = "";

fetch(search_url + new URLSearchParams({
    api_key: api_key,
    language: langue,
    query: query,
    page: 1,
    include_adult: true,
}))
    .then(res => res.json())
    .then(searchResult => {
        // console.log(searchResult);
        // searchCategory(searchResult)
        let resultatContainer = document.querySelector('.resultats-container');
        for (let i = 0; i < 20; i++) {
            if (searchResult.results[i].backdrop_path == null) {
                i++;
            }
            resultatContainer.innerHTML += `
                    <div class="film" onclick="location.href = '/${searchResult.results[i].id}'">
                    <img src="${img_url}${searchResult.results[i].backdrop_path}" alt="">
                    <p class="film-titre">${searchResult.results[i].title}</p>
            
            `
        }
    })




    

















// form.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const searchTerm = search.value;

//     if (searchTerm) {
//         setupMovieInfo(search_url+'&query='+searchTerm)
//     }

// });