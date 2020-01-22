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

//creating html for drop down menu
const root = document.querySelector(".auto__complete");
root.innerHTML = `
<label><h2 class="search__input-heading">Search For a Movie</h2></label>
<input type="text" class="search__input-one input" />
<div class="dropdown">
<div class="movie">
<div class="newMovie"></div>
</div>
</div>
`;

//appending api call data to html that was created before
const onInput = async event => {
  //setting search results to a variable
  const searchResults = await fetchMovie(event.target.value);
  //clear search results
  resultWrapper.innerHTML = "";
  dropdown.classList.add("is-active");
  //looping through variable and outputting HTML
  for (let result of searchResults) {
    const movieOption = document.createElement("a");
    const imageSrc = result.Poster === "N/A" ? "" : result.Poster;
    movieOption.classList.add("dropdown__item");
    //multi-line using back ticks
    movieOption.innerHTML = `
  <img src="${imageSrc}" class="dropdown__poster"/>
  <h5>${result.Title}</h5>
  <h5>${result.Year}</h5>
  `;
    // console.log(movieOption);
    resultWrapper.appendChild(movieOption);
  }
};

//Selecting input and adding event listener and debounce function
const dropdown = document.querySelector(".dropdown");
const resultWrapper = document.querySelector(".newMovie");
const input = document.querySelector(".search__input-one");
input.addEventListener("input", debounceFc(onInput, 500));
// document.addEventListener("click", event => {
//   console.log(event.target);
//   if (!root.contains(event.target)) {
//     const divRemove = document.querySelector(".movie");
//     divRemove.removeChild(resultWrapper);
//     const newDiv = document.createElement("div");
//     newDiv.classList.add("newMovie");
//   }
// });
