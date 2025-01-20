import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
function App() {
  let [current, setCurrent] = useState(1);
  let [data, setData] = useState([]);
  useEffect(function () {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?_page=${current}&_limit=4`)
      .then((response) => {
        if (response.status == 200) {
          return setData(response.data)
        }
      });
  }, [current]);
  useEffect(function() {
    
  },[])
  function handlePaginate(event, position) {
    console.log(position);
    setCurrent(position)
  }
  return (
    <div className="container mx-auto w-[600px] flex flex-wrap gap-5">
      { 
        data.length > 0 && data.map((value, index) => {
          return (
            <div key={index} className="p-3 w-[200px] border rounded-sm mt-5 mb-4 ">
              <h3 className="text-2xl mb-4">name: {value.name}</h3>
              <h3>body: {value.body}</h3>
            </div>
          );
        })
      }
      <Pagination onChange={handlePaginate} count={10} />
    </div>
  );
}

export default App;
