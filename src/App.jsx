import { StrictMode, useContext, createContext, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/pages/Home'
import { HashRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from './components/TopNavBar'
import SteamIDContext from './contexts/SteamIDContext'
import ProfileDisplay from './components/pages/ProfileDisplay'
import ProfileCompare from './components/pages/ProfileCompare'

function App(){


    const key = "";

    const [steamID, setSteamID] = useState("");
    const [validId, setValidId ] = useState(false);
    const [ userData, setUserData ] = useState({
        ownedGames: null,
        achievementData: null,
        profileInfo: null
    });

    function handleMainSearch(id) {
        // do some checks 
        let trimmedID = id.trim();
        console.log("Searching for ID: " + trimmedID);
        
        setSteamID(trimmedID);

        if(validateID(trimmedID)){
            console.log("ID is valid, fetching data...");
         
            // if the steam id is valid, populate user data

            fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${id}&include_appinfo=1&format=json`,{
                method: 'GET',
            })
            .then(response => { return response.json() })
            .then(data => {
                console.log("Fetched owned games data: ", data);
                setUserData((prevData) => ({
                    ...prevData,
                    ownedGames: data.response.games
                }));
            });

            // fetch achievement data for a specific game (example appid 440)
            // let achievmentsObject = {};
            // fetch(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=440&key=${key}&steamid=${id}`,{
            //     method: 'GET',
            // })
            // .then(response => { return response.json() })
            // .then(data => {
            //     console.log("Fetched player achievements data: ", data);
            //     setUserData((prevData) => ({
            //         ...prevData,
            //         achievementData: data.playerstats
            //     }));
            // });


        } else{
            console.log("ID is not valid.");
        }
    }

  

    function validateID(id) {
        

        console.log("Validating ID: " + id);
        if (id.trim().length > 0) {

            fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${id}`,{
                method: 'GET',
            })
            .then(response => {
                
                return response.json()
            })
            .then(data => {
                // players must have public profiles to be valid
                if(data.response.players[0].communityvisibilitystate === 3){
                    setValidId(true);

                    let profileInfo = data.response.players[0];
                    setUserData((prevData) => ({
                        ...prevData,
                        profileInfo: profileInfo
                    }));
                } else {
                    console.log("Profile is not public.");
                    setValidId(false);
                    return false;
                }
            });
        } else {
            console.log("ID is empty.");
            setValidId(false);
            return false;
        }

        return true;

    }
    
    return (
    <HashRouter>
        <SteamIDContext.Provider value={[steamID, setSteamID, validId, userData]}>
        <TopNavBar search={handleMainSearch} />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProfileDisplay />} />
            <Route path="/compare" element={<ProfileCompare />} />
        </Routes>
        </SteamIDContext.Provider>
    </HashRouter>
    );

}

export default App;