import dotenv from "dotenv";
dotenv.config();

export default {
  firebaseConfig: {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGESENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MESAUREMENTID,
  },
};
