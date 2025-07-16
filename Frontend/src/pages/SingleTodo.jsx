import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const SingleTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [singleTodo, setSingleTodo] = useState(null);


    useEffect(() => {
        const fetchSingleTodo = async () => {

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/todo/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setSingleTodo(response.data.data);
                console.log("Response on the single todo :", response.data.data)

            } catch (err) {
                console.log("Error on fetching the data")
            }
        };

        //call the function
        fetchSingleTodo();
    }, [])


    //delete the todo
    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`http://localhost:3000/api/todo/delete/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });
        console.log("Response : ", response)

        alert("Todo deleted successfully");
        navigate("/")
    }


    //update todo
    const updateTodo = async () => {
        const token = localStorage.getItem('token')
        const response = await axios.patch(`http://localhost:3000/api/todo/update/${id}`, singleTodo, {
            headers: {
                Authorization: `${token}`
            }
        });
        console.log("Response : ", response)

        alert("Todo deleted successfully");
        navigate("/")
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSingleTodo({
            ...singleTodo,
            [name]: value
        })
    }



    console.log("Single todo : ", singleTodo)

    return (
        <>
            {/* edit todo section */}

            <div className="flex flex-col items-center justify-center px-6 py-8 mt-32 ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Update the todo
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" >

                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="title" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter the title" required="" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input type="description" name="description" id="description" placeholder="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-start">
                            </div>
                            <button type="submit" className="w-full border-4 border-white text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update todo</button>

                        </form>
                    </div>
                </div>
            </div>



            <div className="h-screen w-full flex flex-col justify-center items-center mt-[-200px]">
                <div className='max-w-lg bg-white shadow-md rounded-lg overflow-hidden mx-auto'>
                    <div className="py-4 px-8 mt-3">
                        <div className="flex flex-col mb-8">
                            <h2 className="text-gray-700 font-semibold text-2xl tracking-wide mb-2">{singleTodo?.title}</h2>
                            <p className="text-gray-500 text-base">{singleTodo?.description}</p>
                        </div>

                        <div className="py-4 flex ml-12">
                            <button className="block tracking-widest uppercase text-center shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded">Edit</button>
                            <button onClick={handleDelete} className="block tracking-widest uppercase text-center shadow bg-red-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded ml-5">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleTodo
