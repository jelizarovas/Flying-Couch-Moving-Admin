import React, { useState, useReducer } from "react";
import InputText from "../input/InputText";

import GoogleSuggest from "./AddressInput";

import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import PropTypes from "prop-types";

const API_KEY = "AIzaSyDpJe-dT4ZDeTXrvKks8Vb26C-VTTej0S8";

const Location = props => {
  const { locationArrayId, remove, locationArrayLenght } = props;
  const locationId = parseInt(locationArrayId, 10);
  const locationCount = parseInt(locationArrayLenght, 10);

  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    search: "",
    addressFull: "",
    streetNumber: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: ""
  });

  const { addressFull, streetNumber, street, apartment, city, state, zip, search } = userInput;

  const getAddressComponent = addressType => {
    switch (addressType) {
      case "street_number":
        return "streetNumber";
      case "route":
        return "street";
      case "apartment":
        return "apartment";
      case "locality":
        return "city";
      case "administrative_area_level_1":
        return "state";
      case "postal_code":
        return "zip";
      case "subpremise":
        return "apartment";
      default:
        return "";
    }
  };

  const handleChange = e => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  const handleInputChange = e => {
    setUserInput({ search: e.target.value, addressFull: e.target.value });
  };

  // const handleNoResult = () => {
  //   console.log("No results for ", search);
  //   // setShowAddress(true);
  // };

  const handleSelectSuggest = suggest => {
    console.log(suggest);
    setUserInput({
      search: "",
      addressFull: suggest.formatted_address,
      streetNumber: "",
      street: "",
      apartment: "",
      city: "",
      state: "",
      zip: ""
    });

    var componentForm = {
      street_number: "short_name",
      route: "long_name",
      locality: "long_name",
      administrative_area_level_1: "short_name",
      // country: "long_name",
      postal_code: "short_name"
    };

    suggest.address_components.map(component => {
      var addressType = component.types[0];

      if (componentForm[addressType]) {
        var val = component[componentForm[addressType]];
        // console.log(addressType);
        const addressComponent = getAddressComponent(addressType);
        setUserInput({ [addressComponent]: val });
      }
      return null;
    });
  };

  const findApartment = e => {
    var regex = /(((upper|lower|, [a-z])\b( ))?((\b(APT\.?|APARTMENT|SUITE|STE\.?|UNIT|Unti|LEVEL|FLOOR))|(#|#A))( |\.|-)?(NUMBER|NO\.?|SUITE|STE\.?)?( |\.|-)?(\w*))|((?<!^)(?<!-)(?<!\w)\b[a-z]?\d{1,4}\b)|((?<!^)(?<!-)\b[a-df-mo-rt-vx-z]\b)(\s?,?\s)/gim;
    var result = regex.exec(e.target.value);
    var val = e.target.value;

    if (result) {
      var longest = result
        .filter(function(el) {
          return el != null;
        })
        .reduce((a, b) => (a.length > b.length ? a : b), "");
      // console.log(longest);

      val = val
        .replace(regex, "")
        .replace(/(\s*,)/gi, ",")
        .replace(/(,,)/gi, ",");
      setUserInput({ addressFull: val, apartment: longest });
    }
  };

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

  return (
    <div>
      <label>
        <a href="#!" onClick={() => setShowAddress(!showAddress)}>
          <i className="material-icons">keyboard_arrow_right</i>
          {description(locationId, locationCount)} Address: {addressFull}
        </a>{" "}
        {(locationId === 0) | (locationId === locationCount - 1) ? null : removeButton}
      </label>
      <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: "places,geocode"
        }}
        render={googleMaps =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{ input: search }}
                googleMaps={googleMaps}
                onSelectSuggest={handleSelectSuggest}
                onStatusUpdate={status => {
                  // console.log(status);
                }}
                // onNoResult={handleNoResult}
              >
                <input
                  type="text"
                  value={addressFull}
                  placeholder="Search a location"
                  onChange={handleInputChange}
                  onBlur={findApartment}
                />{" "}
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
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

GoogleSuggest.propTypes = {
  googleMaps: PropTypes.object
};

export default Location;
