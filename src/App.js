import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore"; 

const App = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState({})

  const [name, setName] = useState("")

// sign up
  const handleSubmit = async () => {

   try {
    const user =  await createUserWithEmailAndPassword(auth, email, password)
    console.log(user);
   }
    catch(error) {
    console.log(error.message);
   }
   
  } 

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [user])

  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // const getData = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //     });
  // }

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
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}  type="text"/> <br />
        <button onClick={sendData}>Send data</button>
      </div>
    </>
  );
};

export default App;
