import { useEffect, useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container"
import Todo from '../components/Todo'

let data = [
    { id: 1, title: "Todo 1", desc: "Todo 1 desc", isDone: false },
    { id: 2, title: "Todo 2", desc: "Todo 1 desc", isDone: true },
    { id: 3, title: "Todo 3", desc: "Todo 1 desc", isDone: false },
    { id: 4, title: "Todo 4", desc: "Todo 1 desc", isDone: false },
    { id: 5, title: "Todo 5", desc: "Todo 1 desc", isDone: true },
    { id: 6, title: "Todo 6", desc: "Todo 1 desc", isDone: false }
]

function TodoList() {
    const [add, setAdd] = useState(false)
    const [title, setTitle] = useState('')
    const [todos, setTodos] = useState(data)

    useEffect(() => {
        console.log(`Todo Len ${todos.length}`)
        setAdd(false)
    }, [add, todos])

    function handleAdd() {
        setAdd(true)
        const lastId = todos[todos.length - 1].id
        todos.push({id: lastId + 1, title: title, isDone: false})
        setTodos(todos)
        setTitle('')
    }

    function handleDelete(id) {
        const newArr = todos.filter(todo => todo.id !== id)
        setTodos(newArr)
    }

    function handleIsDone(id) {
        const todoIndex = todos.findIndex(todo => todo.id === id)
        const newArr = todos
        newArr[todoIndex] = { ...newArr[todoIndex], isDone: !newArr[todoIndex].isDone}
        setTodos(newArr)
        return newArr[todoIndex].isDone
    }

    function handleIsDoneStr(id) {
        const todoIndex = todos.findIndex(todo => todo.id === id)
        console.log(todos[todoIndex].isDone)
        return todos[todoIndex].isDone
    }
    
    return (
        <Container>
            <Container className="d-flex justify-content-center mt-5" fluid>
                <Form className="d-flex align-items-center">
                    <Form.Control className="me-2" type="text" placeholder="Add Todo..." onChange={(e) => setTitle(e.target.value)} />
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </Form>
            </Container>
            <ListGroup variant="flush" className="w-50 m-auto pt-5">
                {
                    todos.map(todo => <Todo key={todo.id} todo={todo} deleteFun={handleDelete} isDoneFun={handleIsDone} isDoneStrFun={handleIsDoneStr}/>)
                }
            </ListGroup>
        </Container>
    )
}

export default TodoList