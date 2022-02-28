import "./App.css";
import TodoList from "./components/TodoList";
import Toolbar from "./components/Utils";
import "./css/Utils.css";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <TodoList />
    </div>
  );
}

export default App;
