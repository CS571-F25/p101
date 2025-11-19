import { useContext, useState } from "react";
import { FormControl, Button, InputGroup, Form } from "react-bootstrap";

function CompareSearch(props) {

  const [inputID, setInputID] = useState("");

  return (
    <InputGroup className="mb-3" style={{maxWidth: "50%"}}>
        <Form.Control
          placeholder="Enter a Valid Steam ID"
          aria-label="Steam ID"
          aria-describedby="Steam ID input"
          value={inputID}
          onChange={(e) => setInputID(e.target.value)}
        />
        <Button variant="outline-secondary" id="primary-id-search-btn" onClick={() => console.log("Searching for ID: " + inputID)}>
          ⌕
        </Button>
      </InputGroup>
  );
}

export default CompareSearch