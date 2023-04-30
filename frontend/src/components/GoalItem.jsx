import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";

import { MdModeEdit, MdDeleteForever, MdSave } from "react-icons/md";
import { IconContext } from "react-icons";
import { useState } from "react";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(goal.text);

  function handleSave () {
    dispatch(updateGoal({text: editText, id: goal._id}))
    setIsEditing(!isEditing)
  }

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleDateString("en-US")}</div>

      {!isEditing ? (
        <>
          <h2>{goal.text}</h2>
          <button onClick={() => setIsEditing(!isEditing)} className="edit">
            <MdModeEdit />
          </button>
        </>
      ) : (
        <>
          <button onClick={handleSave} className="edit">
            <MdSave />
          </button>
          <input autoFocus value={editText} onChange={(e) => setEditText(e.target.value)} onKeyDown={(e) => {e.key === 'Enter' && handleSave()}}/>
        </>
      )}

      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        <IconContext.Provider value={{ color: "red" }}>
          {" "}
          <MdDeleteForever />{" "}
        </IconContext.Provider>
      </button>
    </div>
  );
}

export default GoalItem;
