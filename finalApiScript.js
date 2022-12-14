const rootElem = document.getElementById("root");
const form = document.getElementById("form");
const searchInput = document.getElementById("search");
const count = document.getElementById("episod-count");
const select = document.getElementById("movies");
const listOfShows = document.getElementById("shows");
const showName = getAllShows();
showNameList(showName);
let shows;

// make page by shows
function makePageForShows(showList) {
  showList.forEach((show) => {
    const showContainer = document.createElement("section");
    showContainer.setAttribute("id", "show-section");
    const title = document.createElement("h3");
    const image = document.createElement("img");
    const summary = document.createElement("p");

    title.textContent = show.name;
    if (show.image && show.image.medium) {
      image.src = `${show.image.medium}`;
    }

    summary.textContent = `${show.summary}`.replace(/(<([^>]+)>)/gi, "");

    showContainer.appendChild(title);
    showContainer.appendChild(image);
    showContainer.appendChild(summary);

    const showDetailContainer = document.createElement("div");
    const showDetailItem = document.createElement("ul");
    const showDetailRated = document.createElement("li");
    const showDetailGenres = document.createElement("li");
    const showDetailStatus = document.createElement("li");
    const showDetailRuntime = document.createElement("li");

    showDetailRated.textContent = `Rated : ${show.rating.average}`;
    showDetailGenres.textContent = `Genres : ${show.genres[0]}`;
    showDetailStatus.textContent = `Status : ${show.status}`;
    showDetailRuntime.textContent = `Runtime : ${show.runtime}`;

    showContainer.appendChild(showDetailContainer);
    showDetailContainer.appendChild(showDetailItem);
    showDetailItem.appendChild(showDetailRated);
    showDetailItem.appendChild(showDetailGenres);
    showDetailItem.appendChild(showDetailStatus);
    showDetailItem.appendChild(showDetailRuntime);

    rootElem.appendChild(showContainer);
    showContainer.addEventListener("click", () => {
      //  debugger
      getEpisod(show.id);
    });
  });
}

//function for creating each episode card
function episodeCards(episodeList) {
  let html = "";
  episodeList.forEach((show) => {
    const doubleShowNumber = show.number < 10 ? "0" : "";
    html += `<div>
    <h3>${show.name}-S${doubleShowNumber}${show.number}E${
      show.season < 10 ? "0" : ""
    }${show.season}</h3>
    <img src=${show.image.medium}>
    <p>${show.summary}</p>
    </div>`;
  });
  rootElem.innerHTML = html;
}

//function for creating each show card
function showCards(showList) {
  let html = "";
  showList.forEach((show) => {
    if (show.image && show.image.medium) {
      html += `<section>
        <h3>${show.name}</h3>
        <img src=${show.image.medium}>
        <p>${show.summary}</p>
        </section>`;
    }
  });
  rootElem.innerHTML = html;
}
//  search section for episod

function search(episodlist) {
  searchInput.addEventListener("keyup", (e) => {
    let value = e.target.value;
    let search = episodlist.filter(
      (element) =>
        element.name.toLowerCase().includes(value) ||
        element.summary.toLowerCase().includes(value)
    );

    const searchLength = search.length;
    const totalEpisodes = episodlist.length;
    count.textContent = `Search Count :${searchLength}/${totalEpisodes}`;
    episodeCards(search);
  });
}
//  search section for show
function searchForShow(showList) {
  searchInput.addEventListener("keyup", (e) => {
    let value = e.target.value;
    let searchShow = showList.filter((show) => {
      if (show.genres) {
        const genres = show.genres.join(" ").toLowerCase();
        return (
          show.name.toLowerCase().includes(value) ||
          show.summary.toLowerCase().includes(value) ||
          genres.includes(value)
        );
      } else {
        return (
          show.name.toLowerCase().includes(value) ||
          show.summary.toLowerCase().includes(value)
        );
      }
    });
    const searchShowLength = searchShow.length;
    const totalShows = showList.length;
    count.textContent = `Search Count :${searchShowLength}/${totalShows}`;
    showCards(searchShow);
  });
}

//dropdown list for episods
function selectEpisod(searchEpisod) {
    searchEpisod.forEach((episod) => {
    const option = document.createElement("option");

    option.setAttribute("value", episod.name);
    select.appendChild(option);

    if (episod.number < 10 && episod.season < 10) {
      option.textContent = `S0${episod.number}E0${episod.season}-${episod.name}`;
    } else {
      option.textContent = `S${episod.number}E${episod.season}-${episod.name}`;
    }
  });
  //drop down search
  select.addEventListener("change", () => {
    let dropValue = select.value;
    let html = "";
    searchEpisod.forEach((episod) => {
      if (episod.name.includes(dropValue)) {
        if (episod.number < 10 && episod.season < 10) {
          html += `<div>
        <h3>${episod.name}-S0${episod.number}E0${episod.season}</h3>
        <img src=${episod.image.medium}>
        <p>${episod.summary}</p>
        </div>`;
        } else {
          html += `<div>
        <h3>${episod.name}-S${episod.number}E${episod.season}</h3>
        <img src=${episod.image.medium}>
        <p>${episod.summary}</p>
        </div>`;
        }
      }
    });

    rootElem.innerHTML = html;
  });
}

// dropdown List of the show name

function showNameList(ListOfShowsName) {
  ListOfShowsName.forEach((show) => {
    let optionShow = document.createElement("option");
    optionShow.setAttribute("value", show.id);
    optionShow.textContent = show.name;
    listOfShows.appendChild(optionShow);
  });
}

function getEpisod(episodID) {
  console.log(episodID);
  let newURL = `https://api.tvmaze.com/shows/${episodID}/episodes`;
  fetch(newURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      selectEpisod(data)
      // console.log(data);
      showEpisodeSelect();
      let html = "";
      data.forEach((show) => {
        const doubleShowNumber = show.number < 10 ? "0" : "";
        html += `<div>
      <h3>${show.name}-S${doubleShowNumber}${show.number}E${
          show.season < 10 ? "0" : ""
        }${show.season}</h3>
      <img src=${show.image.medium}>
      <p>${show.summary}</p>
      </div>`;
      });
      rootElem.innerHTML = html;
    });
}
listOfShows.addEventListener("change", () => {
  console.log(listOfShows);
  getEpisod(listOfShows.value);
});

function hideEpisodeSelect() {
  select.style.display = "none";
}

function showEpisodeSelect() {
  select.style.display = "block";
}

function setup() {
  shows = getAllShows();
  makePageForShows(shows);
  showNameList(shows);
  searchForShow(shows);
  hideEpisodeSelect();
  //  loadEpisodByShowClick();
  //   searchInput.addEventListener("keyup", searchForShow(shows));
}

window.onload = setup;
