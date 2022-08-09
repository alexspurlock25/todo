// configs
import { db } from "../firebase.config";

import { useState } from "react";
import uuid from "react-uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// bootstrap
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddTodo() {
    const [title, setTitle] = useState('')

    function handleAdd() {
        if (title == null || title === '') return

        const todoRef = collection(db, 'todo')
        const data = { id: uuid(), title: title, isDone: false, dateAdded: serverTimestamp() }

        addDoc(todoRef, data).then(() => {
            // Clear title to clear the form input
            setTitle('')
        })
    }

    return (
        <Container className="d-flex justify-content-center mt-5" fluid>
            <Form className="d-flex align-items-center">
                <Form.Control
                    className="me-2"
                    type="text"
                    placeholder="Add Todo..."
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} />
                <Button variant="primary" onClick={handleAdd}>Add</Button>
            </Form>
        </Container>
    )
}

export default AddTodo