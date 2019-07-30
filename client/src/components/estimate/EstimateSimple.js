import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import InputText from "../input/InputText";
import InputTextArea from "../input/InputTextArea";

import { addEstimate } from "../../actions/estimate";
import Client from "./Client";
import Location from "./Location";
import DatePicker from "./DatePicker";
import Inventory from "./Inventory";
// import ButtonClick from "./ButtonClick";

import shortid from "shortid";

const EstimateForm = ({ addEstimate }) => {
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    // moveDate: "",
    boxes: "",
    inventory: "",
    notes: ""
  });

  const handleChange = e => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  const { boxes, inventory, notes } = userInput;

  const handleSubmit = event => {
    if (event) event.preventDefault();
    // addEstimate({ ...userInput }); // To prevent accidental submitting while dev
    // @TODO: reset form
  };

  // const [fields, setFields] = useState([{ clientArrayId: 0, _id: shortid.generate() }]);
  const [fields, setFields] = useState({
    clientArray: [shortid.generate()],
    locationArray: [shortid.generate(), shortid.generate()]
  });

  function handleAdd(arraySelector) {
    const values = { ...fields };
    values[arraySelector].push(shortid.generate());
    setFields(values);
  }

  function handleRemove(arraySelector, i) {
    const values = { ...fields };
    values[arraySelector].splice(i, 1);
    setFields(values);
  }

  return (
    <div className="estimate-form">
      <form onSubmit={handleSubmit}>
        {/* <ButtonClick /> */}
        <h1>Moving Estimate Inquiry</h1> {/* <button type="button" onClick={e => console.log(fields)}>
          + Log Fields
        </button> */}
        {fields.clientArray.map((field, i) => {
          return <Client key={fields.clientArray[i]} clientArrayId={i} remove={handleRemove} roleShow={fields.clientArray.length > 1 ? true : false} />;
        })}
        <button type="button" onClick={e => handleAdd("clientArray")}>
          + Contact Person
        </button>
        <h3>Locations</h3>
        {fields.locationArray.map((field, i) => {
          return <Location key={fields.locationArray[i]} locationArrayId={i} locationArrayLenght={fields.locationArray.length} remove={handleRemove} />;
        })}
        <button type="button" onClick={e => handleAdd("locationArray")}>
          + Additional Stop
        </button>{" "}
        <button type="button" disabled>
          - No Destination (Labor Only Move)
        </button>
        <h3>Dates</h3>
        <DatePicker />
        <br />
        {/* <br />
        <br />
        <InputText name="moveDate" label="Date of Move" type="date" value={moveDate} onChange={handleChange} /> */}
        <h3>Furniture List</h3>
        <InputText name="boxes" label="Boxes" type="range" step="5" value={boxes} onChange={handleChange} />
        <Inventory />
        {/* <InputTextArea name="inventory" label="Inventory (Separate items by pressing ENTER)" value={inventory} onChange={handleChange} /> */}
        <h3>Additional Information</h3>
        <InputTextArea name="notes" label="Notes" value={notes} onChange={handleChange} />
        <input type="submit" value="Next" />
      </form>
    </div>
  );
};

EstimateForm.propTypes = {
  addEstimate: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEstimate }
)(EstimateForm);
