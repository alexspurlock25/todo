import { useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"

function Todo({ todo, deleteFun, isDoneFun, isDoneStrFun }) {
    const [isDoneStr, setIsDoneStr] = useState(todo.isDone ? "Done" : "Not Done")
    
    return (
        <ListGroup.Item key={ todo.id } className="d-flex align-items-center justify-content-between" >
            <div>
                <Button onClick={ () => deleteFun(todo.id) } className="btn-close m-2"></Button>
                { todo.title }
            </div>
            <Button onClick={ () => {isDoneFun(todo.id); setIsDoneStr(isDoneStrFun(todo.id) ? "Done" : "Not Done")}}>{ isDoneStr }</Button>
        </ListGroup.Item>
    )
}

export default Todo