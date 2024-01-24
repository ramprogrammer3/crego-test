import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Form = () => {
  // hook to navigate one page to another
  const navigate = useNavigate();

  // hook to store and set data
  const [formData, setFormData] = useState({
    rule: "",
    operator: "",
    value: "",
    score: "",
    combinator: "",
  });

  // handle to save data on every key press
  const changeHandler = (events) => {
    const { name, value, type, checked } = events.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  // api call to add data in data base
  const setData = async (data) => {
    try {
      const response = await axios.post("http://localhost:3031/rules", data);
      toast.success("Data Added successfully");
      navigate("/");
      console.log(response.data);
    } catch (error) {
      toast.error("Unable to add data,please try again");
    }
  };

  // submit handler to submit data  and call set data function
  const submitHandler = (events) => {
    events.preventDefault();
    let data = {
      key: formData.rule,
      output: {
        value: formData.value,
        operator: formData.operator,
        score: formData.score,
        combinator: formData.combinator,
      },
    };
    setData(data);
  };

  return (
    <div className="w-11/12 max-w-[1080px] mx-auto my-10">
      <h1 className="text-center text-2xl">Add Data </h1>
      <form
        className=" p-4 my-5 flex gap-y-2 flex-col"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-2 ">
          <p className="text-[20px] font-semibold">Rule Type </p>
          <select
            name="rule"
            value={formData.rule}
            onChange={changeHandler}
            required
            className="border border-blue-400 px-2 py-1
          focus:outline-blue-600 rounded-md"
          >
            <option value="Select Rule Type" disabled>
              Select rule type{" "}
            </option>

            <option value="age" checked>
              Age
            </option>

            <option value="credit_Score">Credit Score</option>

            <option value="account_balance ">Account Balance </option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-semibold">Operator </p>
          <select
            name="operator"
            required
            value={formData.operator}
            onChange={changeHandler}
            className="border border-blue-400 px-2 py-1
          focus:outline-blue-600 rounded-md"
          >
            <option value="Select Operator" disabled>
              Operator
            </option>
            <option value=">" checked>
              {" "}
              &gt;{" "}
            </option>
            <option value="<"> &lt; </option>
            <option value=">="> &gt;= </option>
            <option value="<="> &lt;= </option>
            <option value="="> = </option>
          </select>
        </div>

        <label className="flex flex-col gap-2 ">
          <p className="text-[20px] font-semibold">Value </p>
          <input
            type="number"
            className="border border-blue-400 focus:outline-blue-600 rounded-md px-2 py-1"
            placeholder="Enter value "
            name="value"
            value={formData.value}
            onChange={changeHandler}
            required
          />
        </label>

        <label className="flex flex-col gap-2 ">
          <p className="text-[20px] font-semibold">Score </p>
          <input
            type="number"
            className="border border-blue-400 focus:outline-blue-600 rounded-md px-2 py-1"
            placeholder="Enter Score"
            name="score"
            value={formData.score}
            onChange={changeHandler}
            required
          />
        </label>

        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-semibold"> Combinator </p>
          <select
            name="combinator"
            value={formData.combinator}
            onChange={changeHandler}
            required
            className="border border-blue-400 px-2 py-1
          focus:outline-blue-600 rounded-md"
          >
            <option value="and" checked>
              {" "}
              AND{" "}
            </option>
            <option value="or"> OR </option>
          </select>
        </div>
        <button
          className="bg-blue-500 my-5 text-white py-1 cursor-pointer
          rounded-md hover:transition-all duration-200 hover:bg-blue-600"
        >
          {" "}
          Add{" "}
        </button>
      </form>
    </div>
  );
};

export default Form;

// json-server --watch db.json --port 3031
