import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import { useInput } from "../hooks/InputHook";

// Register User
// import { MenuItem } from '../temporaryObjects/restaurantModel';
const categories = [
  "Men's Haircut",
  "Women's Haircut",
  "Braids",
  "Color",
  "Facial",
  "Nails",
];
export const AddServices = () => {
  const [stylist, setStylist] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const stylistId = useParams();
  const URL = `${process.env.REACT_APP_BACKEND}/api`;
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const {
    value: description,
    bind: bindDescription,
    reset: resetDescription,
  } = useInput("");
  const { value: price, bind: bindPrice, reset: resetPrice } = useInput(0);
  const [category, setCategory] = useState("");

  function handleChangeCategory(e) {
    setCategory(e.target.value);
  }

  const onSend = () => {
    const service = {
      name: name,
      description: description,
      price: price,
      category: category,
    };
    const callAxios = async () => {
      await axios
        .post(`${URL}/stylists/services/${stylistId.id}/add`, service)
        .then((res) => {
          setStylist(res.data.stylist);
        })
        .catch((err) =>
          //   dispatch({
          //     type: GET_ERRORS,
          //     payload: err.response.data
          // })
          console.log("Error upon errors")
        );
    };
    resetName();
    resetDescription();
    resetPrice();
    callAxios();
  };

  useEffect(() => {
    const fetchStylist = async () => {
      console.log(stylist);
      await axios.get(`${URL}/stylists/${stylistId.id}`).then((res) => {
        const stylistData = res.data.stylist;
        console.log(stylistData);
        setStylist(stylistData);
        setIsLoading(false);
      });
    };
    fetchStylist();
  }, [stylist]);
  /*
onChange={event => setNewService(event.target.value)}
*/
  return (
    <>
      <form
        className="container border border-secondary rounded"
        style={{ width: "50%", height: "50%" }}
      >
        <h3 className="my-3">Add Services Offered</h3>
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Service
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" {...bindName} />
          </div>

          <label htmlFor="ItemPrice" className="col-sm-2 col-form-label">
            Price
          </label>
          <div className="col-sm-2">
            <input type="number" className="form-control" {...bindPrice} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="ItemPrice" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" {...bindDescription} />
          </div>
        </div>

        <div className="mb-3 row">
          <label for="inputState" className="col-sm-2 col-form-label">
            Category
          </label>
          <div className="col-sm-10">
            <select
              id="inputState"
              className="form-select"
              // disabled={loading}
              // value={startTime}
              onChange={handleChangeCategory}
            >
              <option selected>Select a category</option>
              {categories.map((items, i) => (
                <option key={i} value={items}>
                  {items}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input
          className="btn btn-primary mb-2"
          type="button"
          value="Save"
          onClick={() => onSend()}
        />
      </form>
    </>
  );
};

export default AddServices;
