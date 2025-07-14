import React, { useEffect, useState } from 'react'
import Navbar from '../globals/Navbar'
import axios from 'axios';

const Home = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {

        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/todo/getAll");
                setTodos(response.data.data);
                console.log("Response", response.data.data)

            } catch (err) {
                console.log("Error on fetching the data")

            }
        };

        //call the function
        fetchTodos();

 

    }, [])

    console.log("Todos : ", todos)


    return (
        <>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32">
                <div className="px-4 py-2">
                    <h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
                </div>
                <ul className="divide-y divide-gray-200 px-4">
                    {
                        todos.map((todo) => (
                            <li key={todo._id} className="py-4">
                                <div className="flex items-center">
                                    <input id="todo1" name="todo1" type="checkbox"
                                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
                                    <label htmlFor="todo1" className="ml-3 block text-gray-900">
                                        <span className="text-lg font-medium">{todo.title}</span>
                                        <span className="text-sm font-light text-gray-500">{todo.description}</span>
                                    </label>
                                </div>
                            </li>

                        ))
                    }

                </ul>
            </div>
        </>
    )
}

export default Home
