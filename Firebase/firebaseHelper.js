import { addDoc, collection } from "firebase/firestore";
import { database } from "./firebaseSetup";
import { deleteDoc, doc } from "firebase/firestore";

export async function writeToDB(goal, collectionName) {
    try {
        await addDoc(collection(database, collectionName), goal);
    }
    catch (err) {
        console.log(err)
    }
}

export async function deleteFromDB(id, collectionName) {
    try {
        await deleteDoc(doc(database, collectionName, id));
    }
    catch (err) {
        console.log(err)
    }
}