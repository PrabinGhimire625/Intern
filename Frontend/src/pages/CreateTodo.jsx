import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

const CreateToDo = () => {
  const navigate = useNavigate();

  const [todoData, setTodoData] = useState({
    title: "",
    description: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token=localStorage.getItem('token');
    const response = await axios.post("http://localhost:3000/api/todo/create", todoData, {
      headers :{
        Authorization : `${token}`
      }
    });

    alert("Todo created successfully");
    navigate("/");
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create the todo
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>

                <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                  <input type="title" onChange={handleChange} name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter the title" required="" />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <input type="description" onChange={handleChange} name="description" id="description" placeholder="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className="flex items-start">
                </div>
                <button type="submit" className="w-full border-4 border-white text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">CreateToDo</button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CreateToDo
