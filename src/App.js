import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { collection, setDoc, query, doc, getDoc } from "firebase/firestore";

const App = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userr, setUser] = useState({});
  const [data, setData] = useState([]);
  const [inp, setInp] = useState();

  // const getData = async () => {
  //     await getDocs(collection(db, "users", userr.uid)).then((querySnapshot) => {
  //       querySnapshot.forEach((element) => {
  //         var dataa = element.data();
  //         setData([dataa, ...data]);
  //         console.log(data);
  //       });
  //     });
  // };

  const addDoc = async (du) => {
    try {
      const docRef = await setDoc(doc(db, "users", du), {
        email: email,
      });
      console.log("Document written with ID: ", du);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // sign up
  const handleSubmit = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      setUser(user.user);
      addDoc(user.user.uid);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getData = async e  => {
    // const q = query(collection(db, "users"))
    // const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
      // const hi = [ doc.data()]
      // console.log(hi.filter(useremail => doc.d));
      // console.log(doc.data());
    // });

    const docRef = doc(db, "users", userr.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
   console.log(data);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(userr);
    });
  }, [userr]);

  return (
    <>
      <div className="signupdiv">
        <p>Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />

        <p className="pas">Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
        />

        <br />
        <button onClick={handleSubmit}>Sign up</button>
      </div>

      <div className="dbdiv">
        <br />
        <button onClick={getData}>retrieve data</button>
        <pre>{data ? data.email : null}</pre>
      </div>
    </>
  );
};

export default App;

