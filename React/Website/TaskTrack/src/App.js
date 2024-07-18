import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setShowFinished] = useState(false);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showfinished);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };



  const [navColor, setNavColor] = useState("green");
  const colors = ["red", "blue", "green", "yellow", "purple", "slate"];

  const handleColorChange = (e) => {
    setNavColor(e.target.value);
  };

  const color = navColor;
  const svgBgColor = navColor;

  return (
    <>
      <Navbar navBgColor={navColor} />
      <div className={`container mx-auto bg-${color}-100 rounded-xl my-5 p-5 min-h-[70vh]`}>
        <div className="flex justify-between items-center mb-5 bg-transparent ">
          <h2 className='font-bold text-lg'>Add a Task</h2>
          <select value={navColor} onChange={handleColorChange} className='rounded-md' >
            {colors.map(color => (
              <option key={color} value={color} className='rounded-md'>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="addtodo flex flex-col justify-between gap-3">
          <input onChange={handleChange} value={todo} className='w-full rounded-md p-2' type="text" />
          <button onClick={handleAdd} disabled={todo.length < 3} className={`w-full bg-${color}-500 disabled:bg-${color}-300 py-1 px-2 text-white rounded-md`}>Save</button>
        </div>
        <input onChange={toggleFinished} className='mt-6' type="checkbox" checked={showfinished} /> Show Finished
        <div className="todos">
          {todos.length === 0 && <div className='text-center font-bold text-xl m-10'>No to dos to display</div>}
          {todos.map(item => (
            (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex my-4 align-center justify-between">
              <div className='flex gap-5 align-center justify-center'>
                <input onChange={handleCheckbox} className='mb-1' type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex">
                <button onClick={(e) => { handleEdit(e, item.id) }} className={`bg--900 py-1 px-2 mx-2 text-white rounded-md`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`bg-${svgBgColor}-700 rounded `} viewBox="0 0 24 24" width="24" height="24" color="white" fill="none">
                    <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className={`bg--900 py-1 px-2 mx-2 text-white rounded-md`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`bg-${svgBgColor}-700 rounded `} viewBox="0 0 24 24" width="24" height="24" color="white" fill="none">
                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;