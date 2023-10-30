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
import PodcastDetails from "./Pages/Podcasts/PodcastDetails";
import CreateAnEpisode from "./Pages/Podcasts/CreateAEpisode";
import Home from "./Pages/Home/Home";
import EditAnEpisode from "./Pages/Podcasts/EditAnEpisode";
import EditPodcast from "./Pages/Podcasts/EditPodcast";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribeAuth = onAuthStateChanged( auth, (user)=>{
      if(user){
        const unsubscribeSnapshot = onSnapshot(doc(db, 'users', user.uid),userDoc=>{
            if(userDoc.exists()){
              const userData = userDoc.data();
              // console.log(userData)
              dispatch(setUsers({
                name: userData.name,
                email: userData.email,
                id: userData.uid,
                dp: userData.dp
              }));
            }
          },
          error=> {
            console.log(error);
          }
        );
        return ()=>{
          unsubscribeSnapshot();
        }
      }
    });
    return ()=>{
      unsubscribeAuth();
    }
  },[dispatch]);
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in-sign-up" element={<Auth/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/start-a-podcast" element={<StartAPodcast/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/podcasts" element={<Podcasts/>}/>
        <Route path="/podcasts/:id" element={<PodcastDetails/>}/>
        <Route path="/podcasts/:id/edit-podcast" element={<EditPodcast/>}/>
        <Route path="/podcasts/:id/create-an-episode" element={<CreateAnEpisode/>}/>
        <Route path="/podcasts/:id/update-an-episode" element={<EditAnEpisode/>}/>
      </Route>
    </Routes>
    <ToastContainer position='top-right' />
    </>
  );
}

export default App;
