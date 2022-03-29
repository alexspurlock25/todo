import { useState } from "react"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"

function Controls() {
    const [title, setTitle] = useState('')

    function handleAdd() {
        console.log("handleAdd")
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container className="d-flex justify-content-end" fluid>
                <Form className="d-flex align-items-center">
                    <Form.Control className="me-2" type="text" placeholder="Add Todo..." onChange={(e) => setTitle(e.target.value)} />
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </Form>
            </Container>
        </Navbar>
        
    );
  }
  
  export default Controls;
  

