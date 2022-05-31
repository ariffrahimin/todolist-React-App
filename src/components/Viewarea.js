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

  const handleDeleteClick = (thisId) => {
    axios.delete(URL + "/" + thisId);
    setTimeout(handleReload, 1000);
  };

  const handleEditClick = (thisEvent, thisId, thisContent, thisStatus) => {
    thisEvent.preventDefault();
    if (thisStatus == "COMPLETE") {
      var status = "NOT COMPLETE";
    } else {
      var status = "COMPLETE";
    }
    //if else statement diatas adalah
    //untuk bidirectional button
    axios.put(URL + "/" + thisId, {
      listId: thisId,
      listContent: thisContent,
      listStatus: status,
    });
    setTimeout(handleReload, 1000);
    //selepas axios bagi request ke API
    //kita akan invoke function handlereload
    //untuk page refresh nampak current view
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
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              {item.listStatus != "NOT COMPLETE" ? (
                <td className="text-center bg-green-300">{item.listId}</td>
              ) : (
                <td className="text-center bg-red-300">{item.listId}</td>
              )}
              {item.listStatus != "NOT COMPLETE" ? (
                <td className="text-center bg-green-300">{item.listContent}</td>
              ) : (
                <td className="text-center bg-red-300">{item.listContent}</td>
              )}
              {item.listStatus != "NOT COMPLETE" ? (
                <td className="text-center bg-green-300 text-green-700 font-bold">
                  {item.listStatus}
                </td>
              ) : (
                <td className="text-center bg-red-300 text-red-700 font-bold ">
                  {item.listStatus}
                </td>
              )}
              {item.listStatus != "NOT COMPLETE" ? (
                <td className="bg-green-300">
                  <div className="flex justify-center ">
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
              ) : (
                <td className="bg-red-300">
                  <div className="flex justify-center ">
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
              )}

              {/* dekat bawah ni adalah if else statement untuk element 
                  font colour berubah mengikut content dalam item */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Viewarea;
