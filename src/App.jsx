import { StrictMode, useContext, createContext, useState } from 'react'
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



    const [steamID, setSteamID] = useState("");
    const [validId, setValidId ] = useState(false);
    const [ userData, setUserData ] = useState(null);

    function handleMainSearch(id) {
        // do some checks 
        let trimmedID = id.trim();
        console.log("Searching for ID: " + trimmedID);
        
        setSteamID(trimmedID);

        if(validateID(trimmedID)){
            console.log("ID is valid, fetching data...");
            setUserData("Test Data");
            //fetch from steam API
            // setUserData(fetchedData);
        } else{
            console.log("ID is not valid.");
            setUserData("No user data, Check if ID is valid or profile is public");
        }
        // if it passes checks send a fetch via the api

    }

    function validateID(id) {
        console.log("Validating ID: " + id);
        if (id.trim().length > 0) {
            setValidId(true);
            return true;
        } else {
            setValidId(false);
            return false;
        }

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