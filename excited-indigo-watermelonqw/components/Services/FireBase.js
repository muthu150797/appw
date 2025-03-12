// // import { initializeApp } from "firebase/app";
// // import { getDatabase } from "firebase/database";
// // const firebaseConfig = {
// //     apiKey: "AIzaSyAYga6SFlqb5wpU2F6npP4AWotpI8yLDfM",
// //     //authDomain: "chat-with-my-appo.firebaseapp.com",
// //     projectId: "chat-with-my-appo",
// //     storageBucket: "chat-with-my-appo.firebasestorage.app",
// //     messagingSenderId: "769681407653",
// //       databaseURL: "https://chat-with-my-appo-default-rtdb.firebaseio.com/",
// //     appId: "1:769681407653:web:70b9c455a4b293fd25974c"
// //   };
// //   export const config=firebaseConfig;
// //   // Initialize Firebase
// //   const app = initializeApp(firebaseConfig);
// //   //export const auth = getAuth(app);
// // //export const db = getFirestore(app);
// // export const dbReal = getDatabase(app);

// import firebase from 'firebase/app'; // Import Firebase
// import 'firebase/database'; // Import database module from Firebase v8

// const firebaseConfig = {
//   apiKey: 'AIzaSyAYga6SFlqb5wpU2F6npP4AWotpI8yLDfM',
//   authDomain: 'chat-with-my-appo.firebaseapp.com',
//   projectId: 'chat-with-my-appo',
//   storageBucket: 'chat-with-my-appo.appspot.com', // Correct storage URL
//   messagingSenderId: '769681407653',
//   appId: '1:769681407653:web:70b9c455a4b293fd25974c',
//   databaseURL: 'https://chat-with-my-appo-default-rtdb.firebaseio.com',
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   alert()
//   firebase.app(); // Use existing app instance
// }

// // Access Realtime Database
// const database = firebase.database(); // Correct way to access database in Firebase v8

// export { firebase, database };

// // Initialize the database
// //const database = getDatabase(app);
// //const database = getDatabase(app, "chat-with-my-appo-default-rtdb.us-central1.firebasedatabase.app"); // Change region if needed

// //export { database };