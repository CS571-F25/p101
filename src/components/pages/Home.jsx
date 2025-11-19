import TopNavBar from "../TopNavBar";
import ProfileSearch from "./ProfileSearch";
import { Card, Container } from "react-bootstrap";

export default function Home(props) {


    return <>

    <Container style={{marginTop: "20px", containerAlign: "center", textAlign: "center"}}>

        <h1 id ="welcome-heading">Welcome to Steam Profile Viewer and Achievement Tracker</h1>

        <Card style={{textAlign: "left", margin: "20px"}}>
          <Card.Body>
            <Card.Title>Profiles</Card.Title>
            <Card.Text>
              On the Profiles page, explore user profiles and compare their achievements against the global leaderboard for each game.
              
            </Card.Text>

            <Card.Text>
                All users must be searched by a valid steam ID and have their profiles set to public, otherwise information will be unavailable
                {/*TODO: using pictures show examples on how to use site and where it might break if profile is private*/}
            </Card.Text>
          </Card.Body>
        </Card>
       

    </Container>
    </>
}




