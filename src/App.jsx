import { useEffect, useState } from "react";
import "./App.css";
import { getDatabase, ref, set,push,onValue,remove } from "firebase/database";

// 💫 Custom CSS for animated borders


function App() {
  const db = getDatabase();
  const [task, setTask] = useState("");
  const [show, setShow] = useState(false);
  const [msgColor, setMsgColor] = useState("");
  const [taskView, settaskView] = useState([]);
  //  Handle input
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
     
      set(push(ref(db, "todotask/")), {
        TaskName: task,
        
      })
      
      setTask("")
    }
  };


// Data read start
useEffect(()=>{
  const ToDoTaskref = ref(db, 'todotask/');

onValue(ToDoTaskref, (snapshot) => {
  let arr=[];
  snapshot.forEach((item)=>{
    arr.push({...item.val(), id:item.key})
    console.log(item.key);
    
  })
settaskView(arr)
 
});
},[])
// Data read end

// Data Delete start
const handelDelete=((id)=>{
  remove(ref(db, 'todotask/' +id))
});
// Data Delete End
 //  Delete all
  const handleDeleteAll = () => {
    if (window.confirm(" Are you sure you want to delete all tasks?")) {
      remove(ref(db, "todotask/"));
      setShow(" All tasks deleted successfully!");
      setMsgColor("bg-red-600");
      setTimeout(() => setShow(false), 2500);
    }
  };

  return (
    <>
  
      <div className="moving-gradient min-h-screen flex items-center justify-center">
        <div className="max-w-[1320px] m-auto">
          <div className="w-[600px] m-auto">
            {/*  Animated Input */}
            <div className="animated-border-container m-auto my-10 ">
              <div className="search-inner-content">
                <input
                  type="text"
                  placeholder="Enter your task..."
                  value={task}
                  className="w-full bg-transparent py-5 px-4 text-lg rounded-lg text-gray-800 placeholder-gray-500"
                  onChange={handleInput}
                  onClick={()=>setShow(false)}
                  onKeyDown={(e) => {
                  if (e.key === "Enter") handleClick(); // 👈 Enter adds the task
                }}
                />
              </div>
            </div>

            {/*  Animated Button */}
            <div className="animated-border-button mt-6">
              <button
                className="animated-inner"
                onClick={handleClick}
              >
                ADD Task
              </button>
            </div>

            {/*  Message */}
            {show && (
              <h3
                className={`text-white text-2xl text-center px-4 py-5 mt-5 rounded-2xl ${msgColor}`}
              >
                {show}
              </h3>
            )}
          </div>

          {/* Table */}
<div className="my-5  w-[600px] m-auto  rounded-xl overflow-hidden">
  {/* Table header */}
  <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-4 rounded-t-xl">
    <h2 className="text-lg font-semibold tracking-wide">
      Task List
    </h2>
    <button
      onClick={handleDeleteAll}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
    >
      Delete All
    </button>
  </div>

  {/* Scrollable table body */}
  <div className="min-h-64 overflow-y-auto ">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-300 text-black">
          <th className="p-3 text-left">Task</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {taskView.map((item) => (
          <tr key={item.id} className="bg-gray-100">
            <td className="p-3 text-black">{item.TaskName}</td>
            <td className="p-3 flex justify-center space-x-3">
              <button className="px-4 py-1 text-sm rounded-lg bg-yellow-400 text-white font-medium shadow hover:bg-yellow-500">
                Edit
              </button>
              <button
                className="px-4 py-1 text-sm rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600"
                onClick={() => handelDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        </div>
      </div>
    </>
  );
}

export default App;
