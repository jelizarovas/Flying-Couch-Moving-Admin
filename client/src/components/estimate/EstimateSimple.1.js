import React from "react";
import useForm from "../UseForm";
import { useState, useReducer, useRef } from "react";
import InputText from "../input/InputText";
import InputTextArea from "../input/InputTextArea";
import * as human from "humanparser";

import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GET_ESTIMATE } from "../../actions/types";
import { setAlert } from "../../actions/alert";

//CREATE ACTION
const createEstimate = (client, locations, dates, inventory, notes, details) => async dispatch => {
  try {
    // const res = await axios.post('/api/estimate');
    dispatch({
      type: "CREATE_ESTIMATE",
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: "ERROR_ESTIMATE",
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

function estimateReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_ESTIMATE":
      return {
        ...state,
        estimates: [payload, ...state.estimate],
        loading: false
      };
    default:
      return { state };
  }
}

const EstimateSimple = props => {
  const submit = () => {
    console.log(values);
  };

  const [show, setShow] = useState({ show: false });
  const initialState = useState({
    estimate: {
      client: [
        {
          fullName: "Arnas",
          email: "jelizarovas@gmail.com",
          phone: "860-515-0847"
        }
      ]
    }
  });
  const { values, handleChange, handleSubmit } = useForm(submit);

  const handle = {
    onChange: handleChange,
    value: values.name
  };

  const getName = e => {
    const attrs = human.parseName(e.target.value);
    // console.log(e.target.value);
    console.log(attrs);
  };

  let balanceForm = "";
  //If balance form should display
  if (show) {
    balanceForm = (
      <div style={{ padding: 15 }}>
        <InputText name="nameTitle" label="Salutation" {...handle} />
        <InputText name="nameFirst" label="First Name" {...handle} />
        <InputText name="nameMiddle" label="Middle Name" {...handle} />
        <InputText name="nameLast" label="Last Name" {...handle} />
        <InputText name="nameSuffix" label="Suffix" {...handle} />
      </div>
    );
  } else {
    balanceForm = null;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {} = state;

  return (
    <div>
      <div>
        <>
          Count: {console.log(state)}
          <button onClick={() => dispatch({ type: "READ" })}>READ</button>
        </>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Moving Estimate</h1>
        <h3>Main Contact</h3>
        <a href="#!" onClick={() => setShow(!show)}>
          <label>
            <i className="material-icons" style={{ fontSize: 13 }}>
              keyboard_arrow_right
            </i>
            Full Name
          </label>
        </a>
        <InputText name="fullName" onBlur={getName} {...handle} />
        {balanceForm}
        <InputText name="email" label="Email" type="email" {...handle} />
        <InputText name="phone" label="Phone (Optional)" type="tel" {...handle} />
        <button type="button" className="small">
          + Person
        </button>
        <h3>Locations</h3>
        <InputText name="addressOrigin" label="Origin Address" {...handle} />
        <InputText name="addressDestination" label="Destination Address" {...handle} />
        <h3>Dates</h3>
        <InputText name="moveDate" label="Date of Move" type="date" {...handle} />
        <h3>Furniture List</h3>
        <InputText name="boxes" label="Boxes" type="range" step="5" {...handle} />
        <InputTextArea name="inventory" label="Inventory (Separate items by pressing ENTER)" {...handle} />
        <h3>Additional Information</h3>
        <InputTextArea name="notes" label="Notes" {...handle} />
        {/* <input type="submit" value="Add Another Contact" />
        <input type="submit" value="Add Stop" />
        <input type="submit" value="Add Date" /> */}
        <input type="submit" value="Next" />
      </form>
    </div>
  );
};

// export default EstimateSimple;
EstimateSimple.propTypes = {
  createEstimate: PropTypes.func.isRequired
};

export default connect(
  null,
  { createEstimate }
)(EstimateSimple);
