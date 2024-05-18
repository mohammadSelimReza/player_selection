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
    .then(data=>showModel(data.players[0]));
}
const loadDetails2 = (id) =>{
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
  .then(res=>res.json())
  .then(data=>addToCart(data.players[0]));
}

const addToCart = (player) => {
      const cartContainer = document.getElementById("cartContainer");
      const total = document.getElementById("total");
      let totalAdded = parseFloat(total.innerText);
      console.log(totalAdded); 
      if(totalAdded<11)
        {
          const h5 = document.createElement("h5");
          h5.innerHTML = `${player.strPlayer}`;
          cartContainer.appendChild(h5);
          totalAdded += 1;
          document.getElementById("total").innerText = totalAdded;
        }
      else {
        alert("Already 11 players has been added.");
        return;
      };
}


const showModel = (player) =>{
      console.log(player.strPlayer);
      const playerContainer = document.getElementById("playerContainer");
      const div = document.createElement("div");
      const words = player.strDescriptionEN.split(" ");
      const first10Words = words.slice(0, 10);
      const shortDescription = first10Words.join(" ");
      div.innerHTML = `
                    <div class="modal fade" id="exampleModal" tabindex="-1">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Player Details:</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <h5 class="card-title">Name: ${player.strPlayer}</h5>
                          <p class="card-text">Sports: ${player.strSport}</p>
                          <p class="card-text">Nationality: ${player.strNationality}</p>
                          <p class="card-text">Gender: ${player.strGender}</p>
                          <p class="card-text des">${shortDescription}</p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                      `;
        playerContainer.appendChild(div);
        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
}
// show data:
const showData = (players) => {
  const playerContainer = document.getElementById("playerContainer");
  playerContainer.innerHTML = "";
  players.forEach((player) => {
    const div = document.createElement("div");
    div.classList.add("card-style");
    const words = player.strDescriptionEN.split(" ");
    const first10Words = words.slice(0, 10);
    const shortDescription = first10Words.join(" ");
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
                                        <button onclick=loadDetails(${player.idPlayer}) type="button" class="btn btn-primary">
                                        See Details
                                        </button>
                                    </div>
                                    <a href="#" onclick=loadDetails2(${player.idPlayer}) class="btn btn-primary">Add to cart</a>
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
