
import { useContext } from "react";
import SteamIDContext from "../../contexts/SteamIDContext";
import { Container } from "react-bootstrap";
import CompareSearch from "../CompareSearch";

function ProfileCompare(props) {

    const [steamID, setSteamId, validId, userData] = useContext(SteamIDContext);


    function handleCompareSearch(id) {
        console.log("Comparing with ID: " + id);
    }

    return (
        validId ?<>
    <Container>
        <h1>I am Profile Compare, {steamID}</h1> 
        <p>Compare {userData.profileInfo.personaName} with another steam user by searching their Steam ID below</p>
        <CompareSearch search={handleCompareSearch} />
    </Container>
    </> : <>

    <h1>No Valid Steam ID provided</h1>
    <p></p>
    </>
    );
}

export default ProfileCompare;