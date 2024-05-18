// getInput
// searchBtn
// playerContainer
// cartContainer
// fetch::
const loadData = (name) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`)
    .then((res) => res.json())
    .then((data) => showData(data.player));
};
const loadDetails = (id) =>{
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then(res=>res.json())
    .then(data=>showData(data.player[0]));
}


// show data:
const showData = (players,sPlayers) => {
  const playerContainer = document.getElementById("playerContainer");
  playerContainer.innerHTML = "";
  players.forEach((player) => {
    const div = document.createElement("div");
    div.classList.add("card-style");
    const words = player.strDescriptionEN.split(" ");
    const first10Words = words.slice(0, 10);
    const shortDescription = first10Words.join(" ");
    const modalId = `exampleModal-${player.idPlayer}`;
    div.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <img src="${player.strThumb}" class="card-img-top" alt="unable to load...">
                            <div class="card-body">
                                <h5 class="card-title">Name: ${player.strPlayer}</h5>
                                <p class="card-text">Sports: ${player.strSport}</p>
                                <p class="card-text des">${shortDescription}</p>
                                <div class="d-flex justify-content-between">
                                    <div>
                                    <!-- Button trigger modal -->
                                        <button onclick=loadDetails(${player.idPlayer}) type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        See Details
                                        </button>
                                    </div>
                                    <a href="#" class="btn btn-primary">Add to cart</a>
                                </div>
                            </div>
                        </div>
                        <!-- Modal -->
                        `;

    playerContainer.appendChild(div);
  });
};

// click-function:
document.getElementById("searchBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.getElementById("getInput");
  const inputValue = input.value;
  loadData(inputValue);
});
