import React, { useState } from "react";
import axios from "axios";
const Adder = () => {
  const URL = "https://localhost:7161/api/Todoes";
  const [todo, setTodo] = useState("");
  const result = (e) => {
    e.preventDefault(e);
    axios
      .post(URL, {
        listId: 0,
        listContent: todo,
        listStatus: "not complete",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(todo);

    setTimeout(mydelay, 1000);
    //Kawasan POST API dari Client ke Database
  };

  const mydelay = () => {
    window.location.reload();
  };
  return (
    <div>
      <div className="flex justify-center m-14">
        <form onSubmit={result} className="w-9/12 flex justify-center">
          <input
            value={todo}
            className="w-6/12 rounded-md text-center border border-solid border-sgcrayola"
            placeholder="Add ToDo"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            value={todo}
            type="submit"
            className="bg-cadetblue hover:bg-indigodye text-black font-bold py-2 px-4 border border-indigodye rounded ml-4"
          >
            + ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adder;
