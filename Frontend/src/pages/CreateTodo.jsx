import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateToDo = () => {
  const navigate = useNavigate();

  const [todoData, setTodoData] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    try {
      await axios.post("http://localhost:3000/api/todo/create", todoData, {
        headers: {
          Authorization: `${token}`
        }
      });
      alert("Todo created successfully");
      navigate("/");
    } catch (error) {
      alert("Error creating todo. Please try again.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Create a New To-Do</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={todoData.title}
              onChange={handleChange}
              placeholder="Enter the title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={todoData.description}
              onChange={handleChange}
              placeholder="Enter the description"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
          >
            Create To-Do
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateToDo;
