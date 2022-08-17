const ApiKey = 'api_key=8882706d6a9d6dd4990be2e3a720d1ef';
const BaseUrl = 'https://api.themoviedb.org/3';
const ApiUrl = `${BaseUrl}/discover/movie?sort_by=popularity.desc&${ApiKey}`;
const searchUrl = `${BaseUrl}/search/movie?${ApiKey}`;
const ImgUrl = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(ApiUrl);
function getMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = '';
  data.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `<img
          src="${ImgUrl}${poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`;
    main.appendChild(movieEl);
  });
}
function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(`${searchUrl}&query=${searchTerm}`);
  } else {
    getMovies(ApiUrl);
  }
});
