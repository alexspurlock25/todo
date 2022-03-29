import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"

function Todo({ todo, deleteFun, isDoneFun }) {
    return (
        <ListGroup.Item key={ todo.id } className="d-flex align-items-center justify-content-between" >
            <div>
                <Button onClick={ () => deleteFun(todo.id) } className="btn-close m-2"></Button>
                { todo.title }
            </div>
            <Button onClick={ () => isDoneFun(todo.id) }>{ todo.isDone ? "Done" : "Not Done"}</Button>
        </ListGroup.Item>
    )
}

export default Todo