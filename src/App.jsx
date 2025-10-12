import { useState } from "react";
import "./App.css";
import { getDatabase, ref, set } from "firebase/database";

// 💫 Custom CSS for animated borders


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
  
      <div className="py-[250px] bg-black/40 min-h-screen">
        <div className="max-w-[1320px] m-auto">
          <div className="w-[600px] m-auto">
            {/* 🧠 Animated Input */}
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

            {/* 💜 Animated Button */}
            <div className="animated-border-button mt-6">
              <button
                className="animated-inner"
                onClick={handleClick}
              >
                ADD Task
              </button>
            </div>

            {/* 📢 Message */}
            {show && (
              <h3
                className={`text-white text-2xl text-center px-4 py-5 mt-5 rounded-2xl ${msgColor}`}
              >
                {show}
              </h3>
            )}
          </div>

          {/* 📋 Table */}
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
