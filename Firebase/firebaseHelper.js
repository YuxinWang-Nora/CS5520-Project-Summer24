import { addDoc, collection } from "firebase/firestore";
import { database } from "./firebaseSetup";
import { deleteDoc, doc } from "firebase/firestore";
import { updateDoc, getDocs } from "firebase/firestore";

export async function writeToDB(data, col, uid) {
    try {
        await addDoc(collection(database, col), { ...data, owner: uid });
    } catch (err) {
        console.log(err);
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

export async function updateDB(id, collectionName, updatedGoal) {
    try {
        await updateDoc(doc(database, collectionName, id), updatedGoal);
    }
    catch (err) {
        console.log(err)
    }
}

export async function readAllData(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        const dataArray = [];
        querySnapshot.forEach((doc) => {
            dataArray.push({ ...doc.data(), id: doc.id });
        });
        console.log("array from the database", dataArray);
        return dataArray;
    } catch (err) {
        console.log(err);
    }
}