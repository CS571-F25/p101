

import { Card, Container, Image, Button } from 'react-bootstrap';
import { use, useEffect, useState, useContext } from 'react';
import SteamIDContext from "../contexts/SteamIDContext";
import CompareDataDisplay from './CompareDataDisplay';
import { Color, useColor } from "color-thief-react";
import GameCardHeader from './GameCardHeader';


function CompareGameCard(props) {

    const [steamID, setSteamId, validId, userData] = useContext(SteamIDContext);

    const key = ""

    const imageURL = `https://media.steampowered.com/steamcommunity/public/images/apps/${props.appid}/${props.img_icon_url}.jpg`
    const [gameInfo, setGameInfo] = useState();

    const [expanded, setExpanded] = useState(false);
    const [primaryUserAchievements, setPrimaryUserAchievements] = useState([]);
    const [secondaryUserAchievements, setSecondaryUserAchievements] = useState([]);
    const [globalData, setGlobalData] = useState([]);

    const proxiedURL = `https://corsproxy.io/?${encodeURIComponent(imageURL)}`;
    const secondaryUser = props.secondaryUser;

    // need a list of primary user achievements and secondary user achievements for this specific game
    // pass the lists to data display component


    // can filter by finding specific game in userData.ownedGames with appid === props.appid
    async function onExpand(){
        console.log("im being clicked COMPARE");

        // only fetch achievements if we haven't already to limit api calls
        if(primaryUserAchievements.length === 0){

            // fetch primary user achievements
            let response1 = await fetch(
                `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${props.appid}&key=${key}&steamid=${steamID}`
            )
            let data1 = await response1.json();
            console.log("data: ",data1)

            setPrimaryUserAchievements(data1.playerstats.achievements);
            let response2 = await fetch(
                `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${props.appid}&key=${key}&steamid=${secondaryUser.profileInfo.steamid}`
            )
            let data2 = await response2.json();
            setSecondaryUserAchievements(data2.playerstats.achievements);

            // obtain global achievement data
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
        setPrimaryUserAchievements([]);
        setSecondaryUserAchievements([]);
        setGlobalData([]);
        setExpanded(false);
    }, [steamID]);


    /* create a table with entries: Achievment | ${primaryUser} | ${secondaryUser} */
    const { data, loading, error } = useColor(proxiedURL, 'hex', { crossOrigin: "anonymous", quality: 10 });
    const bgColor = data ? data : "#FFFFFF";

    return(<>
        <Card style={{ margin: "2%", cursor: "pointer", backgroundColor: bgColor}} onClick={onExpand}>
        <Container style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "0"}}>
            
            
            <GameCardHeader image={imageURL} title={props.name} color={bgColor} />

        </Container>

        {/* show achievement data when expanded */}
        {expanded ? <>
        
        
            <Container style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "0"}}>
                
                <Container style={{display: "flex", flexDirection: "column", marginRight: "0.8%"}}>
                    <CompareDataDisplay 
                        primaryUserAchievements = {primaryUserAchievements} 
                        secondaryUserAchievements = {secondaryUserAchievements} 
                        primaryUser = {userData.profileInfo.personaname} 
                        secondaryUser = {props.secondaryUser.profileInfo.personaname} 
                        globalData = {globalData}
                    />
                </Container>

            </Container>
        </> : <>

        </>}
        </Card>
    
    
    </>)
}

export default CompareGameCard;