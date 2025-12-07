import { Card, Container, Image, Button, Col } from 'react-bootstrap';
import { use, useEffect, useState, useContext } from 'react';
import SteamIDContext from "../contexts/SteamIDContext";
import StatsDisplay from './StatsDisplay';
import { Color, useColor } from "color-thief-react";
import GameCardHeader from './GameCardHeader';


function GameCard(props) {

    const [steamID, setSteamId, validId, userData] = useContext(SteamIDContext);

    const key = ""

    const imageURL = `https://media.steampowered.com/steamcommunity/public/images/apps/${props.appid}/${props.img_icon_url}.jpg`
    const [gameInfo, setGameInfo] = useState();

    const [expanded, setExpanded] = useState(false);
    const [achievements, setAchievements] = useState([]);
    const [achieved, setAchieved] = useState([]);
    const [notAchieved, setNotAchieved] = useState([]);
    const [globalData, setGlobalData] = useState([]);

    const proxiedURL = `https://corsproxy.io/?${encodeURIComponent(imageURL)}`;

    async function onExpand(){
        console.log("im being clicked");

        // only fetch achievements if we haven't already to limit api calls
        if(achievements.length === 0){
            let response = await fetch(
                `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${props.appid}&key=${key}&steamid=${steamID}`
            )
            let data = await response.json();
            setAchievements(data.playerstats.achievements);

            setAchieved(data.playerstats.achievements.filter(ach => ach.achieved === 1));
            setNotAchieved(data.playerstats.achievements.filter(ach => ach.achieved === 0));
            console.log("data: ",data)

            let globalResponse = await fetch(
                `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${props.appid}&format=json`
            )
            let globalData = await globalResponse.json();
            setGlobalData(globalData);

        }

        setExpanded(prev => !prev);

    }


    // remove all data when steamID changes
    useEffect(() => {
        setAchievements([]);
        setAchieved([]);
        setNotAchieved([]);
        setExpanded(false);
    }, [steamID]);

    const { data, loading, error } = useColor(proxiedURL, 'hex', { crossOrigin: "anonymous", quality: 10 });
    const bgColor = data ? data : "#ffffff";

    return(<>
        
        <Card style={{ margin: "2%", cursor: "pointer", backgroundColor: bgColor}} onClick={onExpand} >
            {/* <Color src={proxiedURL}  getColors={colors => {setBgColor(colors[0])}}>
                <img src={proxiedURL} crossOrigin="anonymous" style={{display: "none"}} />
            </Color> */}
        <Container style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "0"}}>
            
            <GameCardHeader image={imageURL} title={props.name} color={bgColor} />

        </Container>

        {/* show achievement data when expanded */}
        {expanded ? <>
        
            <Container style={{margin: "2%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "0"}}>
            
                    {/* obtained */}
                <Container style={{display: "flex", flexDirection: "column", marginRight: "5%"}}>
                   <StatsDisplay achievements={achievements} globalData={globalData} />
                </Container>
           
            </Container>
        </> : <>

        </>}
        </Card>
    
    
    </>)
}

export default GameCard;