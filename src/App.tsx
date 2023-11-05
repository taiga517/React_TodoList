import React, {useState} from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: string;
    checked: boolean;
  };

  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 入力値が空白文字の場合何もせずに処理を終了
    if (inputValue.trim() === "") {
      return;
    };

    // 新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: uuidv4().toString(),
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  // Edit
  const handleEdit = (id: string, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // Checked
  const handleChecked = (id: string, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // Delete
  const handleDelete =(id: string) => {
    const newTodos = todos.filter((todo) => todo.id !==id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>TodoList</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input 
            className="inputText" 
            type="text" 
            onChange={(e)=> handleChange(e)}
            value={inputValue}
          />
          <input 
            className="submitButton" 
            type="submit" 
            value="作成"
          />
        </form>
        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input 
                className="inputText" 
                type="text" 
                onChange={(e)=> handleEdit(todo.id, e.target.value)}
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input 
                className="checkbox"
                type='checkbox'
                onChange={(e)=> handleChecked(todo.id, todo.checked)}
              />
              <button onClick={()=> handleDelete(todo.id)}>消</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
