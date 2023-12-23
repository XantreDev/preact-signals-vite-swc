import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useResource } from "@preact-signals/utils/hooks";
import { Switch, Match } from "@preact-signals/utils/components";
import "./App.css";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const fetchTodos = () =>
  fetch("https://jsonplaceholder.typicode.com/todos").then<Todo[]>((response) =>
    response.json()
  );

function App() {
  const [resource, { refetch }] = useResource({
    fetcher: fetchTodos,
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        React <br /> @preact-signals/safe-react/swc + @preact-signals/utils
      </h1>
      <div className="card">
        <button
          onClick={() => {
            refetch();
          }}
        >
          Refetch
        </button>
        <div>
          <Switch>
            <Match when={() => resource.loading}>Loading...</Match>
            <Match when={() => resource.error}>Error</Match>
            <Match when={() => resource()}>
              {(todos) => (
                <ul>
                  {todos().map((todo) => (
                    <li key={todo.id}>
                      {todo.title},{" "}
                      {todo.completed ? "Completed" : "Not completed"}
                    </li>
                  ))}
                </ul>
              )}
            </Match>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
