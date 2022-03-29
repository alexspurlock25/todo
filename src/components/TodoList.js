import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Todo from '../components/Todo'

const data = [
    { id: 1, title: "Todo 1", desc: "Todo 1 desc", isDone: false },
    { id: 2, title: "Todo 2", desc: "Todo 1 desc", isDone: true },
    { id: 3, title: "Todo 3", desc: "Todo 1 desc", isDone: false }
]

function TodoList() {
    const [todos, setTodos] = useState(data)

    useEffect(() => {
        console.log("Changed")
    }, [todos])

    function handleDelete(id) {
        const newArr = todos.filter(todo => todo.id !== id)
        setTodos(newArr)
    }

    function handleIsDone(id) {
        const todoIndex = todos.findIndex(todo => todo.id === id)
        const newArr = todos
        newArr[todoIndex] = { ...newArr[todoIndex], isDone: !newArr[todoIndex].isDone}
        setTodos(newArr)
    }
    
    return (
        <ListGroup variant="flush" className="w-50 m-auto pt-5">
            {
                todos.map(todo => 
                    <Todo key={todo.id} todo={todo} deleteFun={handleDelete} isDoneFun={handleIsDone}/>
                )
            }
        </ListGroup>
    )
}

export default TodoList