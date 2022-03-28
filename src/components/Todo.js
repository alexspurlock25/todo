import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import ToggleButton from "react-bootstrap/ToggleButton"
import { useState } from "react"
import { hasSelectionSupport } from "@testing-library/user-event/dist/utils"

function Todo({ todo, deleteFun, isDoneFun }) {

    const [isDoneStr, setIsDoneStr] = useState(todo.isDone ? "Done" : "Not Done")
    return (
        <ListGroup.Item key={ todo.id } className="d-flex align-items-center justify-content-between" >
            <div>
                <Button onClick={ () => deleteFun(todo.id) } className="btn-close m-2"></Button>
                { todo.title }
            </div>
            <Button onClick={ () => { isDoneFun(todo.id); setIsDoneStr(todo.isDone ? "Done" : "Not Done"); } }>{ isDoneStr }</Button>
        </ListGroup.Item>
    )
}

export default Todo