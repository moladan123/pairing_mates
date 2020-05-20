const db = firebase.firestore();
test();
async function test(){
  console.log(await initializeGame("useridTest"));
  console.log(await getScores("ZVUGG"));
  console.log("test");
}

//this function creates a database entry for a game and returns its game code
async function initializeGame(userID){
  let gameCode = Date.now().toString(36).toUpperCase();
  gameCode = gameCode.slice(gameCode.length - 6);
  let gameData = {
    "state": "WaitingForPlayers",
    "timeCreated": new Date(),
    "numRoundsPlayed": 0,
    "numPlayers": 0,
    "host": userID,
    "players": []
  };

  return await db.collection('games').doc(gameCode).set(gameData)
  .then(() => {
    console.log("Document successfully written");
    return gameCode;
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
    throw error;
  });
}

//This function returns an array of the scores of the players in the format
//{userID, score}
async function getScores(gameCode){
  return await db.collection('games').doc(gameCode).get()
  .then(doc => {
    if (doc.exists) {
      let scores = [];
      doc.data().players.forEach(player => {
        scores.push({
          "userID": player.id,
          "score": player.score
        });
      });
      return scores;
    } else {
      console.log('No such document!');
      throw "No such document!";
    }
  })
  .catch(error => {
    console.log('Error getting document', error);
    throw error;
  });
}