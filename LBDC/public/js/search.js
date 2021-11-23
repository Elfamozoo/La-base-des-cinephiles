const form = document.getElementById('form')


fetch(search_url + new URLSearchParams({
    api_key: api_key,
    language: langue,
    query: "",
    page: 1,
    include_adult: true,
}));




// form.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const searchTerm = search.value;

//     if (searchTerm) {
//         setupMovieInfo(search_url+'&query='+searchTerm)
//     }

// });

