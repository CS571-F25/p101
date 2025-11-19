import SteamIDContext from "../../contexts/SteamIDContext";
import { useContext, useEffect, useState} from "react";

function ProfileDisplay(props) {
    
    const [steamID, setSteamId, validId, userData] = useContext(SteamIDContext);

    //console.log("In Profile Display, validId: " + validId + " steamID: " + steamID + " userData: " + userData);

    return (
        validId ?<>
    <h1>I am Profile Display, {steamID}</h1> 
    <p>{userData} and data is {userData}</p>

    </> : <>

    <h1>No Steam ID provided</h1>
    <p>{userData}</p>
    </>
    );
}

export default ProfileDisplay;