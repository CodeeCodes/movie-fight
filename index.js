//Movie app JS
const fetchMovie = async searchInput => {
  const response = await axios.get("http://www.omdbapi.com", {
    params: {
      apikey: "4e5e4294",
      s: searchInput
    }
  });
  //error checking will implement error message
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

createAutoComplete({
  root: document.querySelector(".auto__complete"),
  renderOption(movie) {
    const imageSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
<img src="${imageSrc}" class="dropdown__poster"/>
<div class"dropdown__item-div">
<h5 class="dropdown__item-heading">${movie.Title}</h5>
<h5 class="dropdown__item-heading">${movie.Year}</h5>
</div>
`;
  }
});

createAutoComplete({
  root: document.querySelector(".auto__complete2")
});

createAutoComplete({
  root: document.querySelector(".auto__complete3")
});
//Selecting input and adding event listener and debounce function

//adding functionality to click off list and collapse menu

// document.addEventListener("click", event => {
//   dropdown.classList.remove("not-active");
//   dropdown.classList.add("is-active");
//   console.log(event.target);
// });

//function to fetch further details using imdbID
const getMovieInfo = async result => {
  const response = await axios.get("http://www.omdbapi.com", {
    params: {
      apikey: "4e5e4294",
      i: result.imdbID
    }
  });

  document.querySelector(".movie__details").innerHTML = renderMovie(
    response.data
  );
};

//rendering info on the front end
const renderMovie = details => {
  return `
  <div class="movie__details-div">
  <img src=${details.Poster} alt="movie image" class="movie__details-image"/>
  <div class="movie__details-div-small">
  <h3 class="movie__details-heading">Title:</h3>
  <h4 class="movie__details-heading">${details.Title}</h4>
  <h3 class="movie__details-heading">Rated:</h3>
  <h5 class="movie__details-heading">${details.Rated}</h5>
  <h3 class="movie__details-heading">Director:</h3>
  <h5 class="movie__details-heading">${details.Director}</h5>
  <h3 class="movie__details-heading"Actors:></h3>
  <h5 class="movie__details-heading">${details.Actors}</h5>
  <h3 class="movie__details-heading">Awards:</h3>
  <h5 class="movie__details-heading">${details.Awards}</h5>
  <h3 class="movie__details-heading">Runtime:</h3>
  <h5 class="movie__details-heading">${details.Runtime}</h5>
  <h3 class="movie__details-heading">Released:</h3>
  <h5 class="movie__details-heading">${details.Released}</h5>
  <h3 class="movie__details-heading">Genre</h3>
  <h5 class="movie__details-heading">${details.Genre}</h5>
  </div>
  </div>
  `;
};
