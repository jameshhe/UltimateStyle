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
        <div class="mb-3 row">
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

        <div class="mb-3 row">
          <label for="inputState" className="col-sm-2 col-form-label">
            Category
          </label>
          <div className="col-sm-10">
            <select
              id="inputState"
              class="form-select"
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

{
  /* <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <label for="inputAddress2">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form> */
}
