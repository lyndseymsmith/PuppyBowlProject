
//fetch all players from the API
function fetchAllPlayers() {

    return fetch("https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
};

export default fetchAllPlayers;


