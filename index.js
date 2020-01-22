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

const root = document.querySelector(".auto__complete");
root.innerHTML = `
<label><b>Search For a Movie</b></label>
<input type="text" class="search__input-one input" />
<div class="dropdown">
<div >
<div class="newMovie"></div>
</div>
</div>
`;

const onInput = async event => {
  //setting search results to a variable
  const searchResults = await fetchMovie(event.target.value);
  //clear search results
  resultWrapper.innerHTML = "";
  dropdown.classList.add("is-active");
  //looping through variable and outputting HTML
  for (let result of searchResults) {
    const movieOption = document.createElement("a");
    movieOption.classList.add("dropdown-item");
    //multi-line using back ticks
    movieOption.innerHTML = `
  <img src="${result.Poster}" class="dropdown-item-poster"/>
  ${result.Title}
  ${result.Year}
  `;
    console.log(movieOption);
    resultWrapper.appendChild(movieOption);
  }
};

//Selecting input and adding event listener and debounce function
const dropdown = document.querySelector(".dropdown");
const resultWrapper = document.querySelector(".newMovie");
const input = document.querySelector(".search__input-one");
input.addEventListener("input", debounceFc(onInput, 500));
