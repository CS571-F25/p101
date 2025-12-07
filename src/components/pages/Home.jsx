import TopNavBar from "../TopNavBar";
import ProfileSearch from "./ProfileSearch";
import { Card, Container, Image } from "react-bootstrap";
import profileSuccessExample from "../../assets/profileSuccessExample.png"
import compareSuccessExample from "../../assets/compareSuccessExample.png"
import compareNotSuccess from "../../assets/compareNotSuccess.png"

export default function Home(props) {


    return <>

    <Container style={{marginTop: "20px", containerAlign: "center", textAlign: "center"}}>

        <h1 id ="welcome-heading">Welcome to Steam Profile Viewer and Achievement Tracker</h1>

        <Card style={{display: "flex", textAlign: "left", margin: "20px", justifyContent: "center", alignItems: "center"}}>
          <Card.Body>
            <Card.Title style={{textAlign: "center", margin:"5%"}}>Profiles</Card.Title>
            <Card.Text>
              On the Profiles page, explore user profiles and compare their achievements against the global leaderboard for each game. <br />
              Ensure that the steam profile you're viewing is set to public and that game details are also public, otherwise data will not be displayed. <br />
              <div style={{textAlign: "center"}}>
                <Image src={profileSuccessExample} 
                width={450} height={250}

                alt="Example of public profile settings" /> 
              </div>
              <br />
              If you have a valid profile, the profiles page will look similar to the figure above.
            </Card.Text>

            <Card.Title style={{textAlign: "center", margin:"5%"}}>Compare Profiles</Card.Title>
            <Card.Text>
                All users must be searched by a valid steam ID and have their profiles set to public, otherwise information will be unavailable. <br />
                <div style={{textAlign: "center"}}>
                  <Image src = {compareNotSuccess} alt = "Example of invalid profile comparison"
                  width={470} height={100} />
                </div>
                <br />
                If both profiles are valid and public, the compare page will look similar to the figure below.
                <br />

                <div  style={{textAlign: "center"}}>
                  <Image src={compareSuccessExample} 
                  width={450} height={250} 
                  alt ="Example of successful profile comparison"
                  />
                </div>

            </Card.Text>
          </Card.Body>
        </Card>
       

    </Container>
    </>
}




