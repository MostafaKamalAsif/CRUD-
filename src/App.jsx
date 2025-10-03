import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
const [task, setTask]=useState("")

 const handelInput=(e)=>{
  setTask(e.target.value)
  
 };
  const handelClick=()=>{
    if (!task){
      alert("Input pici")
    }
    else{
      alert("Input pi ni")
    }
  }
  return (
    <>
      <div className="py-[250px] bg-gray-100 ">
        <div className="max-w-[1320px] m-auto">
          <div className="w-[600px] m-auto ">
            <input
              type="text"
              placeholder="Enter Your Task"
              className="w-[600px] outline-none border-2 border-neutral-800 bg-green-100 py-5 px-4 " onChange={handelInput}
            />
            <button className="bg-amber-200 border border-amber-600 py-3 px-5  text-center mt-5 cursor-pointer"
            onClick={handelClick}>
              ADD Task
            </button>
          </div>
          <div className="overflow-x-auto mt-10 border w-[600px]  m-auto">
            <table className="w-full border-collapse ">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="p-3 text-left">ID</th>

                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-gray-100">
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
