import Dropdown from 'react-bootstrap/Dropdown';
import { Card, Container, Image, Button } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { use, useEffect, useState, useContext } from 'react';
import SteamIDContext from "../contexts/SteamIDContext";
import { data } from 'react-router';





function GameCard(props) {

    const [steamID, setSteamId, validId, userData] = useContext(SteamIDContext);

    const key = ""

    const imageURL = `https://media.steampowered.com/steamcommunity/public/images/apps/${props.appid}/${props.img_icon_url}.jpg`
    const [gameInfo, setGameInfo] = useState();

    const [expanded, setExpanded] = useState(false);
    const [achievements, setAchievements] = useState([]);
    const [achieved, setAchieved] = useState([]);
    const [notAchieved, setNotAchieved] = useState([]);


    async function onExpand(){
        console.log("im being clicked");

        // only fetch achievements if we haven't already to limit api calls
        if(achievements.length === 0){
            let response = await fetch(
                `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${props.appid}&key=${key}&steamid=${steamID}`
            )
            let data = await response.json();
            setAchievements(data);

            setAchieved(data.playerstats.achievements.filter(ach => ach.achieved === 1));
            setNotAchieved(data.playerstats.achievements.filter(ach => ach.achieved === 0));
            console.log("data: ",data)

        }

        setExpanded(prev => !prev);
        // console.log("achievements: ", achievements);
        // console.log("achieved: ", achieved);
        // console.log("notAchieved: ", notAchieved);

    }


    // remove all data when steamID changes
    useEffect(() => {
        setAchievements([]);
        setAchieved([]);
        setNotAchieved([]);
        setExpanded(false);
    }, [steamID]);

    return(<>
        <Card style={{ margin: "2%", cursor: "pointer"}} onClick={onExpand}>
        <Container style={{margin: "2%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "0"}}>
            
            
            <Image src={imageURL} rounded />

            <p>{props.name}</p>

        </Container>

        {/* show achievement data when expanded */}
        {expanded ? <>
        
        
            <Container style={{margin: "2%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "0"}}>
            
                    {/* obtained */}
                <Container style={{display: "flex", flexDirection: "column", marginRight: "5%"}}>
                    <h3>Achievements earned:</h3>
                    {
                    achieved.map((ach, index) => {
                        return <p key={`${props.appid}${index}`}>{ach.apiname}</p>
                    })
                    }
                </Container>

                    {/*not obtained */}
                <Container style={{display: "flex", flexDirection: "column"}}>
                    <h3>Not Achieved:</h3>

                    { 
                    notAchieved.map((ach, index) => {
                        return <p key={`${props.appid}${index}`}>{ach.apiname}</p>
                    })
                    }
                </Container>
           

            </Container>
        </> : <>

        </>}
        </Card>
    
    
    </>)
}

export default GameCard;