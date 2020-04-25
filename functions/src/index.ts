import * as functions from 'firebase-functions';

// Import Admin SDK
const admin = require("firebase-admin");
admin.initializeApp();
// Get a database reference to our posts
const db = admin.database();

exports.removeOldGames = functions.pubsub.schedule('every 30 minutes').onRun((context) => {
    const date = new Date(Date.now() - 30 * 60 * 1000)  // 30 minutes ago
    const oldGamesRef = db.collection('games').where('timeCreated', '<', date)
    oldGamesRef.get().then((snapshot: any[]) => {
        let removedGames:string = "";
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            doc.ref.delete();
            removedGames += doc.id + "\n";
        });
        console.log("Removed Games: " + removedGames);
    }).catch((err: any) => {
        console.log('Error getting documents', err);
    });
    return null;
});


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
