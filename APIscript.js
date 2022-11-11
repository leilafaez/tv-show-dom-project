function setup() {
  const showName = getAllShows();
  showNameList(showName);

  console.log(showName);
}

//fetch episods and shows
let endpointEpisod = "https://api.tvmaze.com/shows/82/episodes";
let endpointShow = "https://api.tvmaze.com/shows";

fetch(endpointEpisod)
  .then((Response) => {
    return Response.json();
  })
  .then((data) => {
    makePageForEpisodes(data);
    search(data);
    selectEpisod(data);
    
    console.log(data);
  });

fetch(endpointShow)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    
    console.log(data);
  });

  //make a main page by episodes
const rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  episodeList.forEach((episod) => {
    const episodContainer = document.createElement("div");
    const title = document.createElement("h3");
    const image = document.createElement("img");
    const summary = document.createElement("p");

    episod.number < 10 && episod.season < 10
      ? (title.textContent = `${episod.name}-S0${episod.number}E0${episod.season}`)
      : (title.textContent = `${episod.name}-S${episod.number}E${episod.season}`);
    image.src = `${episod.image.medium}`;
    summary.textContent = `${episod.summary}`.replace(/(<([^>]+)>)/gi, "");

    episodContainer.appendChild(title);
    episodContainer.appendChild(image);
    episodContainer.appendChild(summary);
    rootElem.appendChild(episodContainer);
  });
}

function episodeCards(episodeList){
  //map over
  let html = ''
  episodeList.forEach(show=> {
    const doubleShowNumber =show.number<10?'0':''
    html += `<div>
    <h3>${show.name}-S${doubleShowNumber}${show.number}E${show.season<10?'0':''}${show.season}</h3>
    <img src=${show.image.medium}>
    <p>${show.summary}</p>
    </div>`;
  })
      rootElem.innerHTML = html;    // 
}


//  search section
const form = document.getElementById("form");
const searchInput = document.getElementById("search");
function search(episodlist) {
  searchInput.addEventListener("keyup", (e) => {
    let value = e.target.value;
    let html = "";
   
    // //10/73
    // let count =document.getElementById("episod-count");
    // let search=episodlist.filter((element) => {
    //  if (
    //     element.name.toLowerCase().includes(value) ||
    //     element.summary.toLowerCase().includes(value)
    //   ) {
    //     if (element.number < 10 && element.season < 10) {
    //       html += `<div>
    //     <h3>${element.name}-S0${element.number}E0${element.season}</h3>
    //     <img src=${element.image.medium}>
    //     <p>${element.summary}</p>
    //     </div>`;
    //     } else {
    //       html += `<div>
    //     <h3>${element.name}-S${element.number}E${element.season}</h3>
    //     <img src=${element.image.medium}>
    //     <p>${element.summary}</p>
    //     </div>`;
    //     }
    //   }

    // });
    //10/73
    // REFACTOR
    let count =document.getElementById("episod-count");
    let search=episodlist.filter((element) => element.name.toLowerCase().includes(value) || element.summary.toLowerCase().includes(value)
      );
      
      const searchLength = search.length;
      const totalEpisodes = episodlist.length
      count.textContent = `${searchLength}/${totalEpisodes}`
      episodeCards(search)
    // rootElem.innerHTML = html;
  });
}

//dropdown list for episods
const select = document.getElementById("movies");
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
let listOfShows = document.getElementById("shows");

function showNameList(ListOfShowsName) {
 
  ListOfShowsName.forEach((show) => {
    let optionShow = document.createElement("option");
    optionShow.setAttribute("value", show.id);
    optionShow.textContent = show.name;
    listOfShows.appendChild(optionShow);
  });
 }
//search for show dropdown
function getSelectedURL(){
    const selectedOption = (listOfShows.value);
    // let selectedOption = Number(listOfShows.value);
    return `https://api.tvmaze.com/shows/${selectedOption}/episodes`;
}

function getEpisod() {
  let newURL = getSelectedURL();
  fetch(newURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      let html="";
      // data.forEach(show=>{if (show.number < 10 && show.season < 10) {
      //   html += `<div>
      //   <h3>${show.name}-S0${show.number}E0${show.season}</h3>
      //   <img src=${show.image.medium}>
      //   <p>${show.summary}</p>
      //   </div>`;
      // } else {
      //   html += `<div>
      //   <h3>${show.name}-S${show.number}E${show.season}</h3>
      //   <img src=${show.image.medium}>
      //   <p>${show.summary}</p>
      //   </div>`;
      //   // console.log(html);
      // }})
      data.forEach(show=> {
        const doubleShowNumber =show.number<10?'0':''
        html += `<div>
        <h3>${show.name}-S${doubleShowNumber}${show.number}E${show.season<10?'0':''}${show.season}</h3>
        <img src=${show.image.medium}>
        <p>${show.summary}</p>
        </div>`;
      })
          rootElem.innerHTML = html;

    });
}
    listOfShows.addEventListener("change",getEpisod)
    //  listOfShows.addEventListener("change", () => {
    //    let newURL = getSelectedURL();
    //     fetch(newURL).then(response=>{
    //         return response.json();
    //     }).then(data=>{
    //         console.log(data);
    //         makePageForEpisodes(data);
               
    //     })
        
    //  });

        







    

window.onload = setup;
