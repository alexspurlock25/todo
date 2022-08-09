// configs
import { db } from '../firebase.config'

// react and firebase
import { useEffect, useState } from "react"
import { onSnapshot, collection, deleteDoc, where, query, doc, getDocs, updateDoc, orderBy } from 'firebase/firestore'

import Todo from '../components/Todo'
import ListGroup from "react-bootstrap/ListGroup"

const TodoList = () => {
    const rootDir = 'todo'
    const collectionRef = collection(db, rootDir)
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    }, []);

    const getTodos = () => {
        const q = query(collection(db, rootDir));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const _todos = [];
            querySnapshot.forEach((doc) => {
                _todos.push(doc.data());
            });
            setTodos(_todos)
        });
    }

    const handleDelete = (todoId) => {
        const collectionQuery = query(collectionRef, where("id", "==", todoId))
        getDocs( collectionQuery ).then(documents =>
            deleteDoc(documents.docs[0].ref)
        )
    }

    const handleIsDone = (todoId) => {
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