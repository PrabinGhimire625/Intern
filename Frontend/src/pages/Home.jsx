import React, { useEffect, useState } from 'react';
import Navbar from '../globals/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/todo/getAll");
                setTodos(response.data.data);
            } catch (err) {
                console.log("Error on fetching the data");
            }
        };

        fetchTodos();
    }, []);

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto mt-28 px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📋 To-Do List</h1>
                <ul className="space-y-4">
                    {
                        todos.map((todo) => (
                            <Link to={`singleTodo/${todo._id}`} key={todo._id}>
                                <li className="border-2 border-gray-300 hover:border-gray-400 transition-colors duration-300 p-3 rounded-xl shadow-sm cursor-pointer">
                                    <h2 className="text-lg font-semibold text-gray-800">{todo.title}</h2>
                                    <p className="text-sm text-gray-600 mt-0.5">{todo.description}</p>
                                    <div className="text-xs text-gray-500 mt-2 text-right">
                                        Last updated: {new Date(todo.updatedAt).toLocaleString()}
                                    </div>
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </>
    );
};

export default Home;
