import{ Badge, Container, Image, Card }from 'react-bootstrap';

// display the header section of a game card for users to click on
function GameCardHeader(props){

    const imgSrc = props.image
    const title = props.title
    const originalColor = props.color

    const gradient = `radial-gradient(circle, #ffff 85%, ${originalColor} 100%)`;

    return <Container style={{  
        background: gradient, 
        alignItems: "center", 
        padding: "1%", 
        borderRadius: "5px",
        }}>
            <Container style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "3%"}}>
                <Image src={imgSrc}  />

                <h2>{title}</h2>
            </Container>
    </Container>;
}

export default GameCardHeader;