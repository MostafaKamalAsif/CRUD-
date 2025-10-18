import React, { useState, useEffect } from "react";
import { Input } from "/src/Components/ui/input";
import { Button } from "/src/Components/ui/button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, update } from "firebase/database";

const EditPages = () => {
  const { id } = useParams();
  const db = getDatabase();
  const navigate = useNavigate();
  const [updateTask, setUpdateTask] = useState("");

  // Load current task name
  useEffect(() => {
    const taskRef = ref(db, "todotask/" + id);
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUpdateTask(data.TaskName || "");
      }
    });
  }, [db, id]);

  // Handle update
  const handleUpdatebtn = () => {
    if (!updateTask.trim()) return alert("Task name cannot be empty");
    update(ref(db, "todotask/" + id), {
      TaskName: updateTask,
    }).then(() => {
      alert("Task updated successfully!");
      navigate("/"); // ✅ redirect to home after update
    });
  };

  return (
    <>
      <div className="moving-gradient min-h-screen">
        <div className="max-w-[1240px] m-auto py-[120px] text-center">
          <div className="flex justify-center">
            <Input
              value={updateTask}
              onChange={(e) => setUpdateTask(e.target.value)}
              type="text"
              className="w-[600px] bg-gray-300"
              placeholder="Update Task"
            />
          </div>
          <Button
            className="my-5 bg-gray-500 text-white cursor-pointer duration-500"
            onClick={handleUpdatebtn}
          >
            Update
          </Button>
          <Link to="/">
            <Button className="my-5 bg-green-500 text-black hover:text-white cursor-pointer duration-500 block m-auto">
              Back To Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EditPages;
