import React, { useState, useReducer } from "react";
import { useLink } from "valuelink";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { setAlert } from "../../actions/alert";

import InputText from "../input/InputText";
import InputTextArea from "../input/InputTextArea";
import * as human from "humanparser";

export const addEstimate = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/estimates", formData, config);

    dispatch({
      type: "ADD_ESTIMATE",
      payload: res.data
    });

    dispatch(setAlert("Estimate Requested", "success"));
  } catch (err) {
    dispatch({
      type: "ESTIMATE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

const Input = ({ link, ...props }) => {
  return (
    <div>
      <input {...link.props} {...props} />
      <span>{link.error || ""}</span>
    </div>
  );
};

const EstimateForm = ({ addEstimate }) => {
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addressDestination: ""
  });

  const handleChangeX = e => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  const handleX = {
    onChange: handleChangeX
    // value: userInput.name
  };
  const { firstName, lastName, phoneNumber, addressDestination } = userInput;

  const test2 = useLink("");
  const users = useLink([]);

  // Apply validation rules.
  test2
    .check(x => x, "Name is required!")
    .check(x => x.length > 5, "Now it's too short")
    .check(x => x[0] !== "A", "Oh, and sorry - it can't start with A")
    .check(x => x[0] !== "B", "...and with B as well. Sorry for that.");

  const [values, setValues] = useState({});
  const [xtest, setXtest] = useState();

  const handleSubmit = event => {
    if (event) event.preventDefault();
    addEstimate({ ...values });
    // @TODO: reset form
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const handle = {
    onChange: handleChange
    // value: values.name
  };

  const getName = e => {
    const attrs = human.parseName(e.target.value);
    const { firstName, fullName, lastName, middleName, salutation, suffix } = attrs;
    // console.log(e.target.value);
    console.log(attrs);

    setValues(values => ({
      ...values,
      nameFirst: firstName,
      nameMiddle: middleName,
      nameLast: lastName,
      nameSalutation: salutation,
      nameSuffix: suffix
    }));
    console.log("VALUES");
    console.log(values);
  };

  const [show, setShow] = useState(false);
  let showNameStructure = "";
  //If balance form should display
  if (show) {
    showNameStructure = (
      <div style={{ padding: 15 }}>
        <InputText name="nameTitle" label="Salutation" {...handle} />
        {/* id={'todoName' + this.props.id} */}
        <InputText name="nameFirst" label="First Name" {...handle} />
        <InputText name="nameMiddle" label="Middle Name" {...handle} />
        <InputText name="nameLast" label="Last Name" {...handle} />
        <InputText name="nameSuffix" label="Suffix" {...handle} />
      </div>
    );
  } else {
    showNameStructure = null;
  }

  const [showAddress, setShowAddress] = useState(false);
  let showAddressStructure = "";
  //If balance form should display
  if (showAddress) {
    showAddressStructure = (
      <div style={{ padding: 15 }}>
        <InputText name="streetNumber" label="Street Number" {...handle} />
        <InputText name="street" label="Street" {...handle} />
        <InputText name="apartment" label="Appartment (Optional)" {...handle} />
        <InputText name="city" label="City" {...handle} />
        <InputText name="state" label="State" {...handle} />
        <InputText name="zip" label="Zip Code" {...handle} />
      </div>
    );
  } else {
    showAddressStructure = null;
  }
  const inputValue = "";
  return (
    <div>
      <br />
      <label>First Name: </label>
      {userInput.firstName}
      <br />
      <input type="text" name="lastName" value={lastName} {...handleX} />
      <br />
      <label>Last Name: </label>
      {userInput.lastName}
      <br />
      <input type="text" name="lastName" value={lastName} {...handleX} />
      <br />
      <label>Phone Number: </label>
      {phoneNumber}
      <br />
      <input type="text" name="phoneNumber" {...handleX} />
      <button
        type="button"
        onClick={e =>
          setUserInput({
            lastName: "field"
          })
        }
      />

      <form onSubmit={handleSubmit}>
        <h1>Moving Estimate</h1>
        <h3>Main Contact</h3>

        <Input link={test2} />
        <button
          type="button"
          className="small"
          onClick={e =>
            setValues(values => {
              return { ...values, test: "bbz kas" };
            })
          }
        >
          + Change
        </button>
        <div />
        <a href="#!" onClick={() => setShow(!show)}>
          <label>
            <i className="material-icons" style={{ fontSize: 13 }}>
              keyboard_arrow_right
            </i>
            Full Name
          </label>
        </a>
        <InputText name="fullName" onBlur={getName} {...handle} />
        {showNameStructure}
        <InputText name="email" label="Email" type="email" {...handle} />
        <InputText name="phone" label="Phone (Optional)" type="tel" {...handle} />
        <button type="button" className="small">
          + Person
        </button>
        <h3>Locations</h3>
        <a href="#!" onClick={() => setShowAddress(!showAddress)}>
          <label>
            <i className="material-icons" style={{ fontSize: 13 }}>
              keyboard_arrow_right
            </i>
            Origin Address
          </label>
        </a>
        <InputText name="addressOrigin" {...handle} />
        {showAddressStructure}
        <InputText name="addressDestination" label="Destination Address" {...handle} value={addressDestination} />
        <input type="submit" value="Add Stop" />
        <h3>Dates</h3>
        <InputText name="moveDate" label="Date of Move" type="date" {...handle} />
        <h3>Furniture List</h3>
        <InputText name="boxes" label="Boxes" type="range" step="5" {...handle} />
        <InputTextArea name="inventory" label="Inventory (Separate items by pressing ENTER)" {...handle} />
        <h3>Additional Information</h3>
        <InputTextArea name="notes" label="Notes" {...handle} />
        {/* <input type="submit" value="Add Another Contact" />

        <input type="submit" value="Add Date" /> */}
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

// import React, { useState } from "react";
// import { useLink } from "valuelink";

// function useInput({ type /*...*/ }) {
//   const [value, setValue] = useState("");
//   const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
//   return [value, input];
// }

// export default function Example() {
//   const clients = useLink([]);

//   const [username, userInput] = useInput({ type: "text" });
//   const [password, passwordInput] = useInput({ type: "text" });

//   return (
//     <div>
//       {clients.map((client, i) => (
//         <div key={i}>
//           <h1>{i}</h1>
//           {/* <input {...client.at("fullName").props} /> */}
//           <input {...client.at("nameFirst").props} />
//           <input {...client.at("nameMiddle").props} />
//           <input {...client.at("nameLast").props} />
//           <input {...client.at("nameSalutation").props} />
//           <input {...client.at("nameSuffix").props} />
//         </div>
//       ))}

//       <div>
//         {userInput} -> {username} <br />
//         {passwordInput} -> {password}
//         <br /> {userInput} <button onClick={() => alert(username)}>Set username</button>
//       </div>
//       <button
//         onClick={() =>
//           clients.push({ nameFirst: "", nameMiddle: "", nameLast: "", nameSalutation: "", nameSuffix: "" })
//         }
//       >
//         Click me
//       </button>
//     </div>
//   );
// }

// import React, { useState } from "react";

// function Estimate() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   return (
//     <form>
//       <input
//         value={firstName}
//         onChange={e => setFirstName(e.target.value)}
//         placeholder="First name"
//         type="text"
//         name="firstName"
//         required
//       />
//       <button onClick={() => setFirstName("Arnas")}>Set username</button>
//       <input
//         value={lastName}
//         onChange={e => setLastName(e.target.value)}
//         placeholder="Last name"
//         type="text"
//         name="lastName"
//         required
//       />
//       <input
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         placeholder="Email address"
//         type="email"
//         name="email"
//         required
//       />
//       <input
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         placeholder="Password"
//         type="password"
//         name="password"
//         required
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
// export default Estimate;
