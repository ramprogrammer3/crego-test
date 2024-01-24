import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import {json} from "./datas"
const Data = () => {
  // Array to store data
  const [populateData, setPopulateData] = useState([]);

  //api call to fetch data
  const getData = async () => {
    try {
      json.rules.length = 0;
      const response = await axios.get("http://localhost:3031/rules");
      setPopulateData(response.data);
      toast.success("Data Fetch successfully");
      
    } catch (error) {
      toast.error("Unable to fetch data, please try again");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // api call to delete data
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3031/rules/${id}`);
      toast.success("Delete successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Unable to Delete , please try again ");
    }
  };


  // below code populate json data on screen

  if(populateData.length > 0){
    json.rules.length = 0;
    for(let i = 0; i<populateData.length; i++){
      let data = {
        key : populateData[i].key,
        output : {
          value : populateData[i].output.value,
          operator : populateData[i].output.operator,
          score : populateData[i].output.score
        }
      }
     json.rules.push(data);
    }
    let tempCombinator = populateData[populateData.length-1].output.combinator
    json.combinator = tempCombinator;
  }


    // below code populating data

  return (
    <div className="w-11/12 max-w-[1080px] mx-auto my-10">
      <Link to="/add" className="text-center block my-3 text-blue-700 text-3xl">
        {" "}
        Add Data{" "}
      </Link>
      <h1 className="text-center text-2xl">Populating Form data </h1>
      <table className="w-11/12 max-w-[1080px] mx-auto my-5">
        <thead>
          <tr>
            <th>Rule Type </th>
            <th>Operator </th>
            <th>Value</th>
            <th>Score </th>
            <th>delet</th>
          </tr>
        </thead>
        <tbody>
          {populateData.length > 0 &&
            populateData.map((item, index) => {
              return (
                <tr key={index}>
                  <td> {item.key} </td>
                  <td> {item.output.operator} </td>
                  <td> {item.output.value} </td>
                  <td> {item.output.score} </td>
                  <td
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                  >
                    {" "}
                    <MdDelete className="mx-auto text-red-600 cursor-pointer" />{" "}
                  </td>
                </tr>
              );
            })}
            
        </tbody>
      </table>


      <h3 className="text-center my-3 font-bold text-2xl">Below is Expected Json output </h3>

      <div className="w-11/12 mx-auto max-w-[800px]">
      <JsonView data={json} shouldExpandNode={allExpanded} style={darkStyles} />

      </div>

    </div>
  );
};

export default Data;
