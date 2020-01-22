const createAutoComplete = ({ root, renderOption }) => {
  root.innerHTML = `
<label><h2 class="search__input-heading">Search For a Movie</h2></label>
<input type="text" class="search__input-one input" />
<div class="dropdown">
<div class="movie">
<div class="newMovie"></div>
</div>
</div>
`;
  const dropdown = root.querySelector(".dropdown");
  const resultWrapper = root.querySelector(".newMovie");
  const input = root.querySelector(".search__input-one");

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

      movieOption.classList.add("dropdown__item");
      //multi-line using back ticks
      movieOption.innerHTML = renderOption(result);

      //make movie input title name
      movieOption.addEventListener("click", () => {
        input.value = result.Title;
        getMovieInfo(result);
        const list = dropdown.className == "is-active";
        console.log(list);
        if (list === false) {
          dropdown.classList.remove("is-active");
          dropdown.classList.add("not-active");
        }

        setTimeout(() => {
          input.value = "";
        }, 5000);
      });

      // console.log(movieOption);
      resultWrapper.appendChild(movieOption);
    }
  };
  input.addEventListener("input", debounceFc(onInput, 500));
};
