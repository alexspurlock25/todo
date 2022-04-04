// custom components
import TodoList from './TodoList'
import AddTodo from "./AddTodo";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from "react-bootstrap/Container";

function App() {
  return (
      <Container>
        <AddTodo />
        <TodoList />
      </Container>
  )
}

export default App;
