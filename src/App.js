import { Routes,Route } from "react-router-dom";
import Profile from "./Pages/ProfilePage.js/Profile";
import StartAPodcast from "./Pages/StartAPodcast/StartAPodcast";
import Podcasts from "./Pages/Podcasts/Podcast";
import './index.css'
import Auth from "./Pages/SignInPage/Auth";
import PrivateRoute from "./Pages/PrivateRoute";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUsers } from "./ReduxToolkit/Slices/userSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   const unsubscribeAuth = onAuthStateChanged( auth, (user)=>{
  //     if(user){
  //       const unsubscribeSnapshot = onSnapshot(doc(db, 'users', user.uid),(userDoc=>{
  //           if(userDoc.exists()){
  //             const userData = userDoc.data();
  //             console.log(userData)
  //             dispatch(setUsers({
  //               name: userData.displayName,
  //               email: userData.email,
  //               id: userData.uid
  //             }));
  //           }
  //         },
  //         (error)=> {
  //           console.log(error);
  //         }
  //         )
  //       );
  //       return ()=>{
  //         unsubscribeSnapshot();
  //       }
  //     }
  //   });
  //   return ()=>{
  //     unsubscribeAuth();
  //   }
  // },[dispatch]);
  return (
    <>
    <Routes>
      <Route path="/" element={<Auth/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/podcasts" element={<Podcasts/>}/>
        <Route path="/start-a-podcast" element={<StartAPodcast/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
    <ToastContainer position='top-right' />
    </>
  );
}

export default App;
