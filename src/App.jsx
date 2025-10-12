import { useState } from "react";
import "./App.css";
import { getDatabase, ref, set } from "firebase/database";

// 💫 Custom CSS for animated border
const CustomStyles = () => (
  <style>
    {`
      @keyframes flowBorder {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .animated-border-container {
        position: relative;
        padding: 4px;
        border-radius: 0.75rem;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        width: 600px;
        transition: all 0.3s ease;
      }

      .animated-border-container:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
      }

      /* Animated multicolor gradient */
      .animated-border-container::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          90deg,
          #3b82f6,
          #10b981,
          #f59e0b,
          #ef4444,
          #8b5cf6,
          #3b82f6
        );
        background-size: 300% 300%;
        border-radius: 0.75rem;
        animation: flowBorder 4s linear infinite;
        z-index: 1;
      }

      /* Inner container ensures input and placeholder are above animation */
      .search-inner-content {
        position: relative;
        z-index: 2;
        background: rgba(255, 255, 255, 0.85);
        border-radius: 0.5rem;
      }

      /* Input glow on focus */
      .search-inner-content input:focus {
        outline: none;
        box-shadow: 0 0 10px #3b82f6, 0 0 20px #9333ea;
        transition: box-shadow 0.3s ease;
      }

      body {
        font-family: 'Inter', sans-serif;
      }
    `}
  </style>
);

function App() {
  const db = getDatabase();
  const [task, setTask] = useState("");
  const [show, setShow] = useState(false);
  const [msgColor, setMsgColor] = useState("");

  const handleInput = (e) => {
    setTask(e.target.value);
  };

  const handleClick = () => {
    if (!task) {
      setShow("⚠️ The task is missing!");
      setMsgColor("bg-red-500");
    } else {
      setShow("✅ Congratulations! Task sent.");
      setMsgColor("bg-green-500");

      set(ref(db, "todotask/"), {
        TaskName: task,
      });
    }
  };

  return (
    <>
      <CustomStyles />
      <div className="py-[250px] bg-blue-300 min-h-screen">
        <div className="max-w-[1320px] m-auto">
          <div className="w-[600px] m-auto">
            
            {/* Animated search bar */}
            <div className="animated-border-container m-auto mb-5">
              <div className="search-inner-content">
                <input
                  type="text"
                  placeholder="Enter your task..."
                  className="w-full bg-transparent py-5 px-4 text-lg rounded-lg text-gray-800 placeholder-gray-500"
                  onChange={handleInput}
                />
              </div>
            </div>

            {/* Button */}
            <button
              className="bg-amber-200 border border-amber-600 py-3 px-5 text-center mt-5 cursor-pointer rounded-lg hover:bg-amber-300"
              onClick={handleClick}
            >
              ADD Task
            </button>

            {/* Message */}
            {show && (
              <h3
                className={`text-white text-2xl text-center px-4 py-5 mt-5 rounded-2xl ${msgColor}`}
              >
                {show}
              </h3>
            )}
          </div>

          {/* Simple Table */}
          <div className="overflow-x-auto mt-10 border w-[600px] m-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="bg-gray-100">
                  <td className="p-3">1</td>
                  <td className="p-3 flex justify-center space-x-3">
                    <button className="px-4 py-1 text-sm rounded-lg bg-yellow-400 text-white font-medium shadow hover:bg-yellow-500">
                      Edit
                    </button>
                    <button className="px-4 py-1 text-sm rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
