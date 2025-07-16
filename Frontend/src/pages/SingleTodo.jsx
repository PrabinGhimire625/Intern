import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { APIAuthenticated } from '../http';

const SingleTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [singleTodo, setSingleTodo] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [updatedTodo, setUpdatedTodo] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        const fetchSingleTodo = async () => {
            try {
                const response = await APIAuthenticated.get(`/api/todo/${id}`);
                setSingleTodo(response.data.data);
                setUpdatedTodo({
                    title: response.data.data.title,
                    description: response.data.data.description
                });
            } catch (err) {
                console.log('Error on fetching the data');
            }
        };

        fetchSingleTodo();
    }, [id]);

    const handleDelete = async () => {
        try {
            await APIAuthenticated.delete(`/api/todo/delete/${id}`);
            alert('Todo deleted successfully');
            navigate('/');
        } catch (err) {
            alert('Failed to delete todo');
        }
    };
    

    const handleUpdate = async () => {
        try {
            await APIAuthenticated.patch(`/api/todo/update/${id}`, updatedTodo);
            alert('Todo updated successfully');
            setSingleTodo(updatedTodo);
            setEditMode(false);
        } catch (err) {
            alert('Failed to update todo');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTodo({
            ...updatedTodo,
            [name]: value
        });
    };

    if (!singleTodo) return null;

    return (
        <div className="min-h-screen bg-white px-6 ">
            <div className="max-w-4xl mx-auto mt-32 rounded-xl bg-white p-10 shadow-md flex items-center justify-between space-x-8 text-gray-800 ">
                {editMode ? (
                    <div className="flex-1 min-w-0 " >
                        <input
                            name="title"
                            className="border text-xl font-bold w-full mb-2 px-2 py-1 rounded"
                            value={updatedTodo.title}
                            onChange={handleChange}
                        />
                        <textarea
                            name="description"
                            className="border w-full px-2 py-1 rounded"
                            value={updatedTodo.description}
                            onChange={handleChange}
                        />
                    </div>
                ) : (
                    <>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-extrabold truncate">{singleTodo.title}</h2>
                            <p className="text-gray-600 truncate">{singleTodo.description}</p>
                        </div>
                    </>
                )}

                <div className="flex space-x-4 flex-shrink-0">
                    {editMode ? (
                        <>
                            <button
                                onClick={handleUpdate}
                                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                                aria-label="Save Todo"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-md transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
                                aria-label="Cancel Edit"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-md transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                                aria-label="Edit Todo"
                            >
                                <PencilIcon className="h-6 w-6" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
                                aria-label="Delete Todo"
                            >
                                <TrashIcon className="h-6 w-6" />
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SingleTodo;
