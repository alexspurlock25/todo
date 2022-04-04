// configs
import { db } from '../firebase.config'

// react and firebase
import { useEffect, useState } from "react"
import { collection, deleteDoc, where, query, doc, getDocs, updateDoc, orderBy } from 'firebase/firestore'

// custom components
import Todo from '../components/Todo'
// bootstrap
import ListGroup from "react-bootstrap/ListGroup"

function TodoList() {
    const rootDir = 'todo'
    const collectionRef = collection(db, rootDir)
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    }, [todos]);

    function getTodos() {
        getDocs( query(collectionRef, orderBy('dateAdded')) )
            .then(snapshot => {
                // TODO: Figure out if its normal for this to run infinitely
                setTodos( snapshot.docs.map(doc => doc.data()) )
                console.log('getDocs()')
        })
    }

    function handleDelete(todoId) {
        const collectionQuery = query(collectionRef, where("id", "==", todoId))
        getDocs( collectionQuery ).then(documents =>
            deleteDoc(documents.docs[0].ref)
        )
    }

    function handleIsDone(todoId) {
        const collectionQuery = query(collectionRef, where("id", "==", todoId))
        getDocs(collectionQuery).then(documents => {
            const docRef = documents.docs[0].ref
            const updatedIsDone = !documents.docs[0].data()['isDone']

            updateDoc(docRef, {isDone: updatedIsDone})
        })
    }
    
    return (
        <ListGroup variant="flush" className="w-50 m-auto pt-5">
            { todos.map(todo => <Todo key={todo.id} todo={todo} deleteFun={handleDelete} isDoneFun={handleIsDone}/>) }
        </ListGroup>
    )
}

export default TodoList