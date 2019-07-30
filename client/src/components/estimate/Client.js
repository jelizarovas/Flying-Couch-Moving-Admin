import React, { useState, useReducer } from "react";
import InputText from "../input/InputText";
import * as human from "humanparser";
import Email from "react-email-autocomplete";

const Client = props => {
  const { clientArrayId, remove, roleShow } = props;
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    fullName: "",
    nameTitle: "",
    nameFirst: "",
    nameMiddle: "",
    nameLast: "",
    nameSuffix: "",
    phone: "",
    email: "",
    role: clientArrayId > 0 ? "" : "Main"
  });

  const handleChange = e => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  const { fullName, nameTitle, nameFirst, nameMiddle, nameLast, nameSuffix, phone, email, role } = userInput;

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

  const removeButton = (
    <button type="button" onClick={() => remove("clientArray", clientArrayId)} className="button-remove">
      X
    </button>
  );

  const [showNameComponents, setShowNameComponents] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const fullNameGenerated = [nameTitle, nameFirst, nameMiddle, nameLast, nameSuffix].filter(Boolean).join(" ");

  return (
    <div>
      <div>
        <h3>
          {clientArrayId === 0 ? "Your Contact Information" : "Contact #" + (parseInt(clientArrayId) + 1) + " details"}
          {clientArrayId === 0 ? null : removeButton}
        </h3>
      </div>

      {/* @TODO: Remove contact if addition */}
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
          {/* @TODO: ONBLUR DO NOT RUN GET NAME IF WASN'T TOUCHED */}
          <input name="fullName" onBlur={getName} value={fullName} onChange={handleChange} />
        </div>
      )}
      {/* @TODO: OPTIONAL IF 2nd+ addition */}
      {/* {clientArrayId === 0 ? "Optional" : ""} */}
      {/* <InputText name="email" label="Email" type="email" value={email} onChange={handleChange} /> */}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Email
          className="form-control"
          // placeholder="Enter email"
          name="email"
          // type="email"
          value={email}
          onChange={handleChange}
        />
      </div>

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
      {/* <button onClick={e => console.log(key)}>Show props</button> */}
      {roleShow ? (
        <InputText name="role" label="Contact Role" type="text" value={role} onChange={handleChange} />
      ) : null}
    </div>
  );
};

export default Client;
