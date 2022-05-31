import axios from "axios";
import React, { useEffect, useState } from "react";
const Viewarea = () => {
  const [data, getData] = useState([]);

  const URL = "https://localhost:7161/api/Todoes";
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(URL)
      .then((res) => res.json())

      .then((response) => {
        console.log(response);
        getData(response);
      });
  };
  const client = axios.create({
    baseURL: "https://localhost:7161/api/Todoes",
  });

  const handleDeleteClick = (thisId) => {
    client.delete(`${thisId}`);
    setTimeout(handleReload, 1000);
  };

  const handleEditClick = (thisEvent, thisId, thisContent, thisStatus) => {
    thisEvent.preventDefault();
    var currStatus = thisStatus;
    if (currStatus == "complete") {
      var status = "not complete";
    } else {
      var status = "complete";
    }
    axios.put(URL + "/" + thisId, {
      listId: thisId,
      listContent: thisContent,
      listStatus: status,
    });
    console.log(thisId + " " + thisContent + " " + status);
    setTimeout(handleReload, 1000);
  };

  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="bg-white border border-solid border-sgcrayola h-4/6 mx-32 flex justify-center overflow-auto">
      <table className="border-separate border border-slate-500 w-full">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Content</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td className="text-center">{item.listId}</td>

              <td className="text-center">{item.listContent}</td>

              <td>
                <div className="flex justify-center">
                  <button
                    className="bg-cadetblue hover:bg-indigodye text-black font-bold py-2 px-4 border border-indigodye rounded"
                    type="button"
                    onClick={(event) => {
                      handleEditClick(
                        event,
                        item.listId,
                        item.listContent,
                        item.listStatus
                      );
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 hover:bg-indigodye text-white font-bold py-2 px-4 border border-indigodye rounded ml-4"
                    type="button"
                    onClick={() => handleDeleteClick(item.listId)}
                  >
                    Delete
                  </button>
                </div>
              </td>
              {item.listStatus != "not complete" ? (
                <td className="text-center text-green-600 font-bold">
                  {item.listStatus}
                </td>
              ) : (
                <td className="text-center text-red-600 font-bold ">
                  {item.listStatus}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Viewarea;
