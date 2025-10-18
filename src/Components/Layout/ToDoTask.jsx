import React, { useEffect, useState } from "react";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

const ToDoTask = () => {
  const db = getDatabase();
  const [task, setTask] = useState("");
  const [show, setShow] = useState(false);
  const [msgColor, setMsgColor] = useState("");
  const [taskView, setTaskView] = useState([]);
  const navigate = useNavigate();

  // Handle input
  const handleInput = (e) => {
    setTask(e.target.value);
  };

  // Add task
  const handleClick = () => {
    if (!task.trim()) {
      setShow(" The task is missing!");
      setMsgColor("bg-red-500");
    } else {
      setShow(" Congratulations! Task sent.");
      setMsgColor("bg-green-500");
      push(ref(db, "todotask/"), {
        TaskName: task,
      });
      setTask("");
    }
  };

  // Read data
  useEffect(() => {
    const ToDoTaskref = ref(db, "todotask/");
    onValue(ToDoTaskref, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setTaskView(arr);
    });
  }, [db]);

  // Delete single
  const handelDelete = (id) => {
    remove(ref(db, "todotask/" + id));
  };

  // Delete all
  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      remove(ref(db, "todotask/"));
      setShow(" All tasks deleted successfully!");
      setMsgColor("bg-red-600");
      setTimeout(() => setShow(false), 2500);
    }
  };

  // Edit
  const handleEditBtn = (id) => {
    navigate(`/editpages/${id}`);
  };

  return (
    <>
      <div className="moving-gradient min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="max-w-[1320px] w-full">
          <div className="w-full max-w-[600px] m-auto">
            {/*  Animated Input */}
            <div className="animated-border-container m-auto my-10">
              <div className="search-inner-content">
                <input
                  type="text"
                  placeholder="Enter your task..."
                  value={task}
                  className="w-full  bg-transparent py-4 px-3 sm:py-5 sm:px-4 text-base sm:text-lg rounded-lg text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none"
                  onChange={handleInput}
                  onClick={() => setShow(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleClick(); // 👈 Enter adds the task
                  }}
                />
              </div>
            </div>

            {/*  Animated Button */}
            <div className=" ">
              <button
                className=" mt-6 text-center px-6 py-2 bg-yellow-300 rounded-xl cursor-pointer text-black font-semibold sm:px-10 sm:py-3 text-sm sm:text-base"
                onClick={handleClick}
              >
                ADD Task
              </button>
            </div>

            {/*  Message */}
            {show && (
              <h3
                className={`text-white text-lg sm:text-2xl text-center px-4 py-4 mt-5 rounded-2xl ${msgColor}`}
              >
                {show}
              </h3>
            )}
          </div>

          {/* Table */}
          <div className="my-5 w-full max-w-[600px] m-auto rounded-xl overflow-hidden bg-white shadow-md">
            {/* Table header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-4 rounded-t-xl text-center sm:text-left">
              <h2 className="text-lg font-semibold tracking-wide">
                Task List
              </h2>
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md transition duration-300 text-sm"
              >
                Delete All
              </button>
            </div>

            {/* Scrollable table body */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-300 text-black">
                    <th className="p-3 text-left">Task</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {taskView.map((item) => (
                    <tr key={item.id} className="bg-gray-100">
                      <td className="p-3 text-black break-words max-w-[250px] sm:max-w-none">
                        {item.TaskName}
                      </td>
                      <td className="p-3 flex justify-center space-x-2 sm:space-x-3">
                        <button
                          className="px-3 sm:px-4 py-1 text-xs cursor-pointer sm:text-sm rounded-lg bg-yellow-400 text-white font-medium shadow hover:bg-yellow-500"
                          onClick={() => handleEditBtn(item.id)}
                        >
                          Edit
                        </button>

                        <button
                          className="px-3 cursor-pointer sm:px-4 py-1 text-xs sm:text-sm rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600"
                          onClick={() => handelDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {taskView.length === 0 && (
                    <tr>
                      <td
                        colSpan="2"
                        className="text-center py-4 text-gray-600 italic"
                      >
                        No tasks found. Add your first one above! ✨
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoTask;
