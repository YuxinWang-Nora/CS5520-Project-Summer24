import { addDoc, collection } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(goal, collectionName) {
    try {
        await addDoc(collection(database, collectionName), goal);
    }
    catch (err) {
        console.log(err)
    }
}
