import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDJu0D_CcFWh3dRIcxYOPVKlrVczyM90mM",
  authDomain: "netflix-clone-bc32b.firebaseapp.com",
  projectId: "netflix-clone-bc32b",
  storageBucket: "netflix-clone-bc32b.firebasestorage.app",
  messagingSenderId: "26854479937",
  appId: "1:26854479937:web:499facd7d64bf21a2a8ec0",
  measurementId: "G-28Q9D5XHJF"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "user"), {
      uid:user.uid,
      name,
      authProvider: "local",
      email,
    });
  }
  catch (error) {
    console.log(error);
   toast.error(error.code.split('/')[1].replaceAll('-',' ') );
  }
}


 const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].replaceAll('-',' ') );
  }
}

const logout = () => {
   signOut(auth);
}

export { auth, db, signup, logout, login };