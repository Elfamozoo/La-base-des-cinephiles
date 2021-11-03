let movie_id = location.pathname;

console.log(movie_id);


// Fetch des details des films.

fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
    api_key: api_key
}))

.then(res => res.json())
.then(data => {
    console.log(data)
})