// Fetch movie data from the API
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWRmMmZiZmM5ZWJmNzJmZTFmMmU4MTc0ZWExZmU1ZiIsInN1YiI6IjY1NzU4N2RkN2EzYzUyMDEyZDAwMGFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCqX_R1dXfsoSet1CnGaYIySedXyhrTlpNUKOCrFIds'
    }
  };

  let page = 1;

  function fetchMovies(url) {
    fetch(`${url}&page=${page}`, options)
      .then(response => response.json())
      .then(data => {
        const movieListContainer = document.querySelector('.movie-list-container');
        data.results.forEach(movie => {
          const movieItem = document.createElement('div');
          movieItem.className = 'movie-list-item';
  
          const img = document.createElement('img');
          img.className = 'movie-list-item-img';
          img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          img.alt = movie.title;
  
          const title = document.createElement('span');
          title.className = 'movie-list-item-title';
          title.textContent = movie.title;
  
          const desc = document.createElement('p');
          desc.className = 'movie-list-item-desc';
          desc.textContent = movie.overview;
  
          const button = document.createElement('button');
          button.className = 'movie-list-item-button';
          button.textContent = 'Watch';
  
          const rating = document.createElement('p');
          rating.className = 'movie-list-rating-average';
          rating.textContent = `ratings: ${movie.vote_average}`;
  
          const totalRatings = document.createElement('p');
          totalRatings.className = 'movie-list-voters-count';
          totalRatings.textContent = `total-ratings: ${movie.vote_count}`;
  
          movieItem.append(img, title, desc, button, rating, totalRatings);
          movieListContainer.appendChild(movieItem);
        });
        page++;
      })
      .catch(err => console.error(err));
  }
  
  fetchMovies('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1');
  
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      fetchMovies('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1');
    }
  });
  


  // Handle toggle
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});