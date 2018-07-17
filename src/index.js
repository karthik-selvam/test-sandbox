import React from "react";
import { render } from "react-dom";
import Example from "./Example";
import { compose } from "recompose";

const todos = [
  {
    id: "test",
    name: "write test"
  },
  {
    id: "test1",
    name: "create code"
  }
];

const App = () => (
  <TodoListWithConditionalRendering todos={todos} isLoadingTodos={false} />
);

const withTodosNull = Component => props =>
  !props.todos ? <h1>Todos is invalid</h1> : <Component {...props} />;

const withTodosEmpty = Component => props =>
  !props.todos.length ? (
    <div>
      <p>You have no Todos.</p>
    </div>
  ) : (
    <Component {...props} />
  );

const withLoadingIndicator = Component => props =>
  props.isLoadingTodos ? (
    <div>
      <p>Loading todos ...</p>
    </div>
  ) : (
    <Component {...props} />
  );

const withConditionalRenderings = compose(
  withLoadingIndicator,
  withTodosNull,
  withTodosEmpty
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);

function TodoItem({ todo }) {
  return <p>{todo.name}</p>;
}

function TodoList({ todos }) {
  if (!todos) {
    return null;
  }

  console.log(todos.length);

  if (!todos.length) {
    return (
      <div>
        <p>You have no Todos.</p>
      </div>
    );
  }

  return <div>{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}</div>;
}

render(<App />, document.getElementById("root"));
