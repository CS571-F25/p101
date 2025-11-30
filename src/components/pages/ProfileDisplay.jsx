import SteamIDContext from "../../contexts/SteamIDContext";
import { use, useContext, useEffect, useState} from "react";
import { Image, Card, Container, Button } from "react-bootstrap";
import GameCard from "../GameCard";

function ProfileDisplay(props) {
    
    const [steamID, setSteamId, validId, userData] = useContext(SteamIDContext);
    const [displayedGames, setDisplayedGames] = useState([]);
    const [numLoadedGames, setNumLoadedGames] = useState(10);

    // path is userData.profileInfo


    // update displayed games to 10 when a valid steamID is first set
    useEffect(() => {

        if(userData.ownedGames){
            setDisplayedGames(userData.ownedGames.slice(0, numLoadedGames));
        }

    }, [userData]);


    // update number of displayed games when numLoadedGames changes
    useEffect(() => {

        if(userData.ownedGames){
            setDisplayedGames(prev =>{
                return userData.ownedGames.slice(0, numLoadedGames);
            })
        }

    }, [numLoadedGames]);
  

    function loadMoreGames(){
        setNumLoadedGames(prev => prev + 10);
    }

    //console.log("In Profile Display, validId: " + validId + " steamID: " + steamID + " userData: " + userData);
    console.log("In Profile Display, userData: ", userData);
    return (
        validId ? <>

        <Container style={{marginTop: "5%"}}>
        <Card style={{contentAlign:"center"}}>

            {/*TODO figure out how to center image based on center vs left edge*/}
            <Container style={{margin: "5%", display: "flex", justifyContent: "center", alignItems: "center", padding: "0"}}>
            <Image src={userData.profileInfo.avatarfull} rounded />
            </Container>

            <h1 style={{textAlign: "center"}}>Displaying profile information for {userData.profileInfo.personaname}</h1> 
            <p>{userData.profileInfo.personaName} and data is</p>

            {
                displayedGames.map((game, index) => {
                    //TODO change key to appid
                    return <GameCard key={game.appid} {...game} />

                })
            }

            <Button variant="primary" onClick={loadMoreGames}>Load more games</Button>
        </Card>
        </Container>
    </> : <>

    <h1>No Steam ID provided</h1>
    <p></p>
    </>
    );
}

export default ProfileDisplay;