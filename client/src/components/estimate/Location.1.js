import React, { useState, useReducer } from "react";
import InputText from "../input/InputText";

import GoogleSuggest from "./AddressInput";

const Location = props => {
  const { locationArrayId, remove, locationArrayLenght } = props;
  const locationId = parseInt(locationArrayId, 10);
  const locationCount = parseInt(locationArrayLenght, 10);

  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    addressFull: "",
    streetNumber: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: ""
  });

  const handleChange = e => {
    setUserInput({ [e.target.name]: e.target.value });
  };
  const handleChangeAddress = address => {
    setUserInput({ addressFull: address });
  };
  const handleSelectAddress = address => {
    setUserInput({ addressFull: address });
  };

  const { addressFull, streetNumber, street, apartment, city, state, zip } = userInput;

  //   const getAddress = e => {
  //     // const attrs = address.parse(e.target.value);
  //     // const { firstName, fullName, lastName, middleName, salutation, suffix } = attrs;
  //     setUserInput({
  //       addressFull: addressFull ? addressFull : "",
  //       streetNumber: streetNumber ? streetNumber : "",
  //       street: street ? street : "",
  //       apartment: apartment ? apartment : "",
  //       city: city ? city : "",
  //       state: state ? state : "",
  //       zip: zip ? zip : ""
  //     });
  //   };

  const removeButton = (
    <button type="button" onClick={() => remove("locationArray", locationId)} className="button-remove">
      X
    </button>
  );

  const description = (locationId, locationCount) => {
    if (locationId === 0) {
      return "Origin";
    } else if (locationId === locationCount - 1) {
      return "Destination";
    } else if (locationId > 0 && locationId < locationCount - 1) {
      return "Stop #" + locationId;
    }
  };

  const [showAddress, setShowAddress] = useState(false);
  // const fullAddressGenerated = [(streetNumber+" "+street), apartment, city, state, zip].filter(Boolean).join(" ");

  // const searchOptions = {
  //   location: { lat: -47, lng: 122 },
  //   radius: 2000,
  //   types: ["address"]
  // };

  // const AddressDetails = props => {
  //   return (
  //     <div>
  //       <pre>{JSON.stringify(props.place, null, 2)}</pre>
  //     </div>
  //   );
  // };

  return (
    <div>
      <label>
        <a href="#!" onClick={() => setShowAddress(!showAddress)}>
          <i className="material-icons">keyboard_arrow_right</i>
          {description(locationId, locationCount)} Address: {addressFull}
        </a>{" "}
        {(locationId === 0) | (locationId === locationCount - 1) ? null : removeButton}
      </label>
      <GoogleSuggest />
      <div>{/* <LocationSearchInput onPlaceChanged={AddressDetails} /> */}</div>
      {/* <LocationSearchInput /> */}
      {/* <GooglePlacesAutocomplete onSelect={console.log} /> */}
      {/* <PlacesAutocomplete
        value={addressFull}
        onChange={handleChangeAddress}
        onSelect={handleSelectAddress}
        highlightFirstSuggestion={true}
        // searchOptions={searchOptions}
        shouldFetchSuggestions={addressFull.length > 2}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#f0f0f0", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    {console.log(suggestion)}
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete> */}
      {/* <input name="addressFull" value={addressFull} onChange={handleChange} /> */}
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
    </div>
  );
};

export default Location;
