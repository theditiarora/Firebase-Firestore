import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { collection, setDoc, doc, getDocs } from "firebase/firestore"; 

const App = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [userr, setUser] = useState({})

  const [name, setName] = useState("")

  
  const addDoc = async (du) => {
    // console.log(userr);
    try {
      const docRef = await setDoc(doc(db, "users", du), {
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

// sign up
  const handleSubmit = async () => {

   try {
    const user =  await createUserWithEmailAndPassword(auth, email, password)
    setUser(user)
    addDoc(user.user.uid)
  }
  catch(error) {
    console.log(error.message);
  }
  
} 

useEffect(() => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    console.log(userr);
  })
  }, [userr])


  return (
    <>
      <div className="signupdiv">
      <p>Email</p>
        <input value={email} onChange={e => setEmail(e.target.value)}  type="text"/>

        <p className="pas">Password</p>
        <input value={password} onChange={e => setPassword(e.target.value)}  type="text"/>

        <br />
        <button onClick={handleSubmit}>Sign up</button>
      </div>

      <div className="dbdiv">
        {/* <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}  type="text"/> <br /> */}
        <button>retrieve data</button>
      </div>
    </>
  );
};

export default App;

// 
