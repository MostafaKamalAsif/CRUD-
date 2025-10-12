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

  const handleInput = (e) => {
    setTask(e.target.value);
  };
// Data write start
  const handleClick = () => {
    if (!task) {
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
// Data write end

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
  return (
    <>
  
      <div className="py-[250px] bg-black/40 min-h-screen">
        <div className="max-w-[1320px] m-auto">
          <div className="w-[600px] m-auto">
            {/*  Animated Input */}
            <div className="animated-border-container m-auto mb-5">
              <div className="search-inner-content">
                <input
                  type="text"
                  placeholder="Enter your task..."
                  value={task}
                  className="w-full bg-transparent py-5 px-4 text-lg rounded-lg text-gray-800 placeholder-gray-500"
                  onChange={handleInput}
                  onClick={()=>setShow("")}
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

          {/*  Table */}
          <div className="overflow-x-auto mt-10 border w-[600px] m-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="p-3 text-left">Task</th>
                  <th className="p-3 text-center">Actions</th>
                  <td className="p-3 text-center"></td>
                </tr>
              </thead>
              <tbody className="divide-y">
               
                {taskView.map((item)=>
                     <tr className="bg-gray-100">
                  
                  <td className="p-3 text-black">{item.TaskName}</td>
                  <td className="p-3 flex justify-center space-x-3">
                    <button className="px-4 py-1 text-sm rounded-lg bg-yellow-400 text-white font-medium shadow hover:bg-yellow-500">
                      Edit
                    </button>
                    <button className="px-4 py-1 text-sm rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600" onClick={()=>handelDelete(item.id)} >
                      Delete
                    </button>
                  </td>
                   <td className="p-3 ">
                    <button className="px-4 py-1 text-sm rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600" onClick={()=>remove} >
                     All Delete
                    </button>
                   </td>
                </tr>
                  )}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
