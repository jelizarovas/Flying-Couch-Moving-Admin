import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import InputText from "../input/InputText";
import InputTextArea from "../input/InputTextArea";
import * as human from "humanparser";

import { addEstimate } from "../../actions/estimate";

const EstimateForm = ({ addEstimate }) => {
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    fullName: "",
    nameTitle: "",
    nameFirst: "",
    nameMiddle: "",
    nameLast: "",
    nameSuffix: "",
    phone: "",
    email: "",
    addressOrigin: "",
    streetNumber: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    addressDestination: "",
    moveDate: "",
    boxes: "",
    inventory: "",
    notes: ""
  });

  const handleChange = e => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  const {
    fullName,
    nameTitle,
    nameFirst,
    nameMiddle,
    nameLast,
    nameSuffix,
    phone,
    email,
    addressOrigin,
    streetNumber,
    street,
    apartment,
    city,
    state,
    zip,
    addressDestination,
    moveDate,
    boxes,
    inventory,
    notes
  } = userInput;

  const handleSubmit = event => {
    if (event) event.preventDefault();
    // addEstimate({ ...userInput }); // To prevent accidental submitting while dev
    // @TODO: reset form
  };

  const getName = e => {
    const attrs = human.parseName(e.target.value);

    const { firstName, fullName, lastName, middleName, salutation, suffix } = attrs;
    setUserInput({
      fullName: fullName ? fullName : "",
      nameTitle: salutation ? salutation : "",
      nameFirst: firstName ? firstName : "",
      nameMiddle: middleName ? middleName : "",
      nameLast: lastName ? lastName : "",
      nameSuffix: suffix ? suffix : ""
    });
  };

  const [showNameComponents, setShowNameComponents] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const fullNameGenerated = [nameTitle, nameFirst, nameMiddle, nameLast, nameSuffix].filter(Boolean).join(" ");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Moving Estimate Inquiry</h1>
        <h3>Your Contact Information</h3>

        <a
          href="#!"
          onClick={() => {
            setShowNameComponents(!showNameComponents);
            setUserInput({ fullName: fullNameGenerated });
          }}
        >
          <label>
            <i className="material-icons">{showNameComponents ? "keyboard_arrow_down" : "keyboard_arrow_right"}</i>
            Full Name
          </label>
        </a>
        {showNameComponents ? (
          <div>
            <input name="fullName" value={fullNameGenerated} disabled />
            <div style={{ padding: 15 }}>
              <InputText name="nameTitle" label="Salutation" value={nameTitle} onChange={handleChange} />
              <InputText name="nameFirst" label="First Name" value={nameFirst} onChange={handleChange} />
              <InputText name="nameMiddle" label="Middle Name" value={nameMiddle} onChange={handleChange} />
              <InputText name="nameLast" label="Last Name" value={nameLast} onChange={handleChange} />
              <InputText name="nameSuffix" label="Suffix" value={nameSuffix} onChange={handleChange} />
            </div>
          </div>
        ) : (
          <div>
            <input name="fullName" onBlur={getName} value={fullName} onChange={handleChange} />
          </div>
        )}
        <InputText name="email" label="Email" type="email" value={email} onChange={handleChange} />

        <a
          href="#!"
          onClick={() => {
            setShowPhone(!showPhone);
            setUserInput({ fullName: fullNameGenerated });
          }}
        >
          <label>
            <i className="material-icons">{showPhone ? "keyboard_arrow_down" : "keyboard_arrow_right"}</i>
            Phone (Optional)
          </label>
        </a>
        <input name="phone" type="tel" value={phone} onChange={handleChange} />
        {showPhone ? (
          <div>
            <InputText name="phone" label="Phone #2 (Optional)" type="tel" value={phone} onChange={handleChange} />
          </div>
        ) : null}

        {/* <button
          type="button"
          onClick={e => {
            e.target.value = "Dr. Michael Bolton III";
            getName(e);
          }}
        >
          + Set Name to "Dr. Michael Bolton III"
        </button> */}
        <h3>Locations</h3>
        <a href="#!" onClick={() => setShowAddress(!showAddress)}>
          <label>
            <i className="material-icons">keyboard_arrow_right</i>
            Origin Address: {addressOrigin}
          </label>
        </a>
        <input name="addressOrigin" value={addressOrigin} onChange={handleChange} />
        {showAddress ? (
          <div style={{ padding: 15 }}>
            <InputText name="streetNumber" label="Street Number " value={streetNumber} onChange={handleChange} />
            <InputText name="street" label="Street" value={street} onChange={handleChange} />
            <InputText name="apartment" label="Appartment (Optional)" value={apartment} onChange={handleChange} />
            <InputText name="city" label="City" value={city} onChange={handleChange} />
            <InputText name="state" label="State" value={state} onChange={handleChange} />
            <InputText name="zip" label="Zip Code" value={zip} onChange={handleChange} />
          </div>
        ) : null}
        <InputText
          name="addressDestination"
          label="Destination Address"
          onChange={handleChange}
          value={addressDestination}
        />
        <button type="button">+ Stop</button>
        <h3>Dates</h3>
        <InputText name="moveDate" label="Date of Move" type="date" value={moveDate} onChange={handleChange} />
        <h3>Furniture List</h3>
        <InputText name="boxes" label="Boxes" type="range" step="5" value={boxes} onChange={handleChange} />
        <InputTextArea
          name="inventory"
          label="Inventory (Separate items by pressing ENTER)"
          value={inventory}
          onChange={handleChange}
        />
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
