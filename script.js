//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  
  console.log(allEpisodes);
}


 const rootElem = document.getElementById("root");
// show all episod lists in main page
function makePageForEpisodes(episodeList) {
   episodeList.forEach(episod=>{

    const episodContainer= document.createElement("div");
    const title=document.createElement("h3");
    const image=document.createElement("img");
    const summary=document.createElement("p");
    
    episod.number < 10 && episod.season < 10
      ? (title.textContent = `${episod.name}-S0${episod.number}E0${episod.season}`)
      : (title.textContent = `${episod.name}-S${episod.number}E${episod.season}`);
    image.src=`${episod.image.medium}`
    summary.textContent = `${episod.summary}`.replace(/(<([^>]+)>)/gi, "");

    episodContainer.appendChild(title);
    episodContainer.appendChild(image);
    episodContainer.appendChild(summary);
    rootElem.appendChild(episodContainer);

    
  });
}

  // search section
  const form=document.getElementById("form");
  const searchInput = document.getElementById("search");
  let episodeList=getAllEpisodes();

  searchInput.addEventListener("keyup",(e)=>{
    let value =e.target.value;
    let html = "";
    episodeList.forEach((element)=>{
      if (element.name.toLowerCase().includes(value) || element.summary.toLowerCase().includes(value)) {
         html += `<div>
        <h3>${element.name}</h3>
        <img src=${element.image.medium}>
        <p>${element.summary}</p>
        </div>`;
        
      }
    })
  
   rootElem.innerHTML = html;
  })

  

//dropdown list
//test
  const searchEpisod= getAllEpisodes();
  const select = document.getElementById("movies");

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
      searchEpisod.forEach((episod)=>{
        if (episod.name.includes(dropValue)) {
          html += `<div>
        <h3>${episod.name}</h3>
        <img src=${episod.image.medium}>
        <p>${episod.summary}</p>
        </div>`;
        }
      })
       
     rootElem.innerHTML = html;
   });
  



  


window.onload = setup;



