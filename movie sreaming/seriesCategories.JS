// Fetch movie data from the API
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWRmMmZiZmM5ZWJmNzJmZTFmMmU4MTc0ZWExZmU1ZiIsInN1YiI6IjY1NzU4N2RkN2EzYzUyMDEyZDAwMGFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCqX_R1dXfsoSet1CnGaYIySedXyhrTlpNUKOCrFIds'
    }
  };
  
  function fetchMovies(url, movieListId) {
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const movieList = document.getElementById(movieListId);
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
          movieList.appendChild(movieItem);
        });
      })
      .catch(err => console.error(err));
  }
  
  fetchMovies('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', 'AiringToday');
  fetchMovies('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', 'onTheAir');
  fetchMovies('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', 'popular');
  fetchMovies('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', 'topRated');
  
  // Handle arrow click
  let arrows = document.querySelectorAll(".arrow");
  let movieLists = document.querySelectorAll(".movie-list");
  
  arrows.forEach((arrow, index) => {
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const movieList = movieLists[index];
      const itemNumber = movieList.querySelectorAll("img").length;
      const ratio = Math.floor(window.innerWidth / 270);
      clickCounter++;
      if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
        movieList.style.transform = `translateX(${
          parseInt(getComputedStyle(movieList).getPropertyValue('transform').split(',')[4]) - 300
        }px)`;
      } else {
        movieList.style.transform = "translateX(0)";
        clickCounter = 0;
      }
    });
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
  