
import { useEffect, useContext, useState } from "react";
import SteamIDContext from "../../contexts/SteamIDContext";
import { Container, Card } from "react-bootstrap";
import CompareSearch from "../CompareSearch";
import CompareGameCard from "../CompareGameCard";

function ProfileCompare(props) {

    const [steamID, setSteamId, validId, userData] = useContext(SteamIDContext);
    const [comparedID, setComparedID] = useState("");
    const [validComparedId, setValidComparedId ] = useState(false);
    const [comparedData, setComparedData] = useState({
        ownedGames: null,
        achievementData: null,
        profileInfo: null
    });

    const [numLoadedGames, setNumLoadedGames] = useState(10);
    const [displayedGames, setDisplayedGames] = useState([]);
    const [commonGames, setCommonGames] = useState([]);


    // update lists containing only data they both share
    useEffect(() => {   
        if(comparedData.ownedGames){
        setCommonGames(userData.ownedGames.filter(game => 
            comparedData.ownedGames.some(compGame => compGame.appid === game.appid)
            ));
        }
    }, [comparedData.ownedGames]);

    // update displayed games when more games are loaded 
    useEffect(() => {
        setDisplayedGames(commonGames.slice(0, numLoadedGames));
    }, [numLoadedGames, commonGames]);

    function loadMoreGames(){
        setNumLoadedGames(prev => prev + 10);
    }

    /*
    plans for this page:
    enter a secondary steam ID to compare with primary
     - for a list of games that both own, display cards like in ProfileDisplay
        - show list of achievements that both players have, highlighting the rarest
        - dont display achievements that they dont have

    */

    function handleComparedSearch(id) {
        // do some checks 
        let trimmedID = id.trim();
        console.log("Searching for ID: " + trimmedID);
        
        setComparedID(trimmedID);

        if(validateComparedID(trimmedID)){
            console.log("ID is valid, fetching data...");
         
            // if the steam id is valid, populate user data

            fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${id}&include_appinfo=1&format=json`,{
                method: 'GET',
            })
            .then(response => { return response.json() })
            .then(data => {
                console.log("Fetched owned games data: ", data);
                setComparedData((prevData) => ({
                    ...prevData,
                    ownedGames: data.response.games
                }));
            });

        } else{
            console.log("ID is not valid.");
        }
    }

  

    function validateComparedID(id) {
        
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
                    setValidComparedId(true);

                    let profileInfo = data.response.players[0];
                    setComparedData((prevData) => ({
                        ...prevData,
                        profileInfo: profileInfo
                    }));
                } else {
                    console.log("Profile is not public.");
                    setValidComparedId(false);
                    return false;
                }
            });
        } else {
            console.log("ID is empty.");
            setValidComparedId(false);
            return false;
        }

        return true;

    }

    return (
        validId ? <>
        <Container>
        <Card style={{marginTop: "5%", contentAlign:"center"}}>
            <h1 style={{textAlign: "center"}}>Primary Steam user, {userData.profileInfo.personaname}</h1> 
            <p>Compare {userData.profileInfo.personaname} with another steam user by searching their Steam ID below</p>
            <CompareSearch search={handleComparedSearch} />


            {/*if both steam IDs are valid */}
            { validComparedId ? <>
            <Container>
                <h2>Comparing with {comparedData.profileInfo.personaname}</h2>

                {
                    displayedGames.map((game, index) => {
                        return <CompareGameCard key={game.appid} 
                        appid={game.appid} 
                        name={game.name} 
                        img_icon_url={game.img_icon_url} 
                        compareID={comparedID} />
                    })
                }

                <Button variant="primary" onClick={loadMoreGames}>Load more games</Button>
            </Container>
            
            {/* end display of compared user info */}

            </>: <p>No valid Steam ID to compare.</p>
            }
        </Card>
        </Container>
        </> : <>
        <Container style={{marginTop: "10%", containerAlign: "center", textAlign: "center"}}>
            <Card>
                <h1>Please Use a Valid Steam ID to Get Started</h1>
                <p>After you have provided a valid Steam ID, you will be prompted to enter another Steam ID to compare profiles.</p>
                <p>Make sure both profiles are public</p>
            </Card>
        </Container>
        </>);
}

export default ProfileCompare;