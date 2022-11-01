//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  console.log(allEpisodes);
}



function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  episodeList.forEach(episod=>{

    const episodContainer= document.createElement("div");
    const title=document.createElement("h3");
    const image=document.createElement("img");
    const summary=document.createElement("p");
        
    title.textContent=`${episod.name}`
    image.src=`${episod.image.medium}`
    summary.textContent=`${episod.summary}`.replace("<p>","").replace("</p>","");

    episodContainer.appendChild(title);
    episodContainer.appendChild(image);
    episodContainer.appendChild(summary);
    rootElem.appendChild(episodContainer);

    
  })
}

window.onload = setup;



