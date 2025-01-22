import React, { useEffect, useState, } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
function App() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get("current")
    ? parseInt(searchParams.get("current"))
    : 1;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit"))
    :4;

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/comments?_page=${current}&_limit=${limit}`
      )
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [searchParams, current, limit]);

  function handlePaginate(event, value) {
    setSearchParams({ current: value, limit });
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
