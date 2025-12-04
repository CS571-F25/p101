

import { Card, Container, Image, Button } from 'react-bootstrap';
import { use, useEffect, useState, useContext } from 'react';
import SteamIDContext from "../contexts/SteamIDContext";


function CompareGameCard(props) {

    const [steamID, setSteamId, validId, userData] = useContext(SteamIDContext);

    const key = ""

    const imageURL = `https://media.steampowered.com/steamcommunity/public/images/apps/${props.appid}/${props.img_icon_url}.jpg`
    const [gameInfo, setGameInfo] = useState();

    const [expanded, setExpanded] = useState(false);
    const [sharedAchievements, setSharedAchievements] = useState([]);
    const [primaryUserAchieved, setPrimaryUserAchieved] = useState([]);
    const [secondaryUserAchieved, setSecondaryUserAchieved] = useState([]);
    const [globalData, setGlobalData] = useState([]);


    // can filter by finding specific game in userData.ownedGames with appid === props.appid
    async function onExpand(){
        console.log("im being clicked COMPARE");

        // only fetch achievements if we haven't already to limit api calls
        if(sharedAchievements.length === 0){
            let response = await fetch(
                `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${props.appid}&key=${key}&steamid=${steamID}`
            )
            let data = await response.json();
            console.log("data: ",data)

            // filter out any achievments the primary SteamID doesnt have
            setPrimaryUserAchieved(data.playerstats.achievements.filter(ach => ach.achieved === 1));

            let comparedResponse = await fetch(
                `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${props.appid}&key=${key}&steamid=${props.compareID}`
            )
            let comparedData = await comparedResponse.json();
            setSecondaryUserAchieved(comparedData.playerstats.achievements.filter(ach => ach.achieved === 1));

            // find shared achievements
            setSharedAchievements(
                comparedData.playerstats.achievements.filter(ach => ach.achieved === 1 && primaryUserAchieved.some(pAch => pAch.apiname === ach.apiname))
            );

            // obtain global achievement data
            let globalResponse = await fetch(
                `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${props.appid}&format=json`
            )
            let globalData = await globalResponse.json();
            setGlobalData(globalData);

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
                        let percent = globalData?.achievementpercentages?.achievements.find(a => a.name === ach.apiname)?.percent || 0;
                        return <p key={`${props.appid}${index}`}>{ach.apiname} - {percent}%</p>
                    })
                    }
                </Container>

                    {/*not obtained */}
                <Container style={{display: "flex", flexDirection: "column"}}>
                    <h3>Not Achieved:</h3>

                    { 
                    notAchieved.map((ach, index) => {
                        let percent = globalData?.achievementpercentages?.achievements.find(a => a.name === ach.apiname)?.percent || 0;
                        return <p key={`${props.appid}${index}`}>{ach.apiname} - {percent}%</p>
                    })
                    }
                </Container>
           

            </Container>
        </> : <>

        </>}
        </Card>
    
    
    </>)
}

export default CompareGameCard;