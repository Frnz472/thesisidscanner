import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from"./firebase";


export const doCreateUserWithEmailandPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}