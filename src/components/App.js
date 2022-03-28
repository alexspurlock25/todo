import Controls from './Controls'
import TodoList from './TodoList'
import Container from 'react-bootstrap/Container'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Container>
      <Controls />
      <TodoList />
    </Container>
  );
}

export default App;
