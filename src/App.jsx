import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [todolist, setTodolist] = useState([])
    const [todo, setTodo] = useState({})

    useEffect(() => {
        const savedTodolist = JSON.parse(localStorage.getItem("todolist"))
        if (savedTodolist != null && savedTodolist.length !== 0) {
            setTodolist(savedTodolist)
        }
    }, []);

    useEffect(() => {
       saveToLocalStorage();
    }, [todolist]);

    const saveToLocalStorage = () => {
        localStorage.setItem("todolist", JSON.stringify(todolist));
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // setTodolist([...todolist, "new to do list"])
        if (todo.todo.trim() !== "") {
            setTodolist([todo, ...todolist]);
            setTodo({
                isDone: false,
                todo: ""
            })
        }
    }
    const updateTodo = (index) => {
        let newList = todolist.map((todoItem, idx) => {
            if (idx === index) todoItem.isDone = !todoItem.isDone;
            return todoItem
        })
        setTodolist(newList)
    }

    const deleteTodo = (index) => {
        let newList = todolist.filter((item, idx) => {
            return idx !== index;
        })
        setTodolist(newList);
    }

    return (
        <>
            <h1 className="font-extrabold text-5xl text-white bg-[#212121] text-center">TODO APP</h1>
            <div className="bg-[#212121] min-h-screen flex flex-col gap-4 py-8 items-center">
                <form className="flex gap-2" onSubmit={(event) => handleFormSubmit(event)}>
                    <input className="rounded-md p-2 text-lg outline-none" type="text" placeholder="Enter todo..."
                           name="todo" value={todo.todo}
                           onChange={e => setTodo({isDone: false, todo: e.target.value})}/>
                    <input className="border-2 px-3 rounded-md bg-blue-700 border-blue-950 text-white" type="submit"
                           value="ADD"/>
                </form>
                <ul className="flex flex-col gap-2">
                    {
                        todolist.map((todoItem, index) => {
                            return <li key={index} className="flex items-center gap-8  w-full">
                                <input type={"checkbox"} onChange={() => updateTodo(index)} className=""
                                       checked={todoItem.isDone}></input>
                                <div className="text-white font-bold">{todoItem.todo}</div>
                                <button onClick={() => deleteTodo(index)}
                                        className="border-2 p-2 rounded-md bg-red-600 border-blue-950 text-white">DELETE
                                </button>
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default App
