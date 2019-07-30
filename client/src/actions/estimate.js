import axios from "axios";
import { setAlert } from "./alert";
import { ADD_ESTIMATE } from "./types";

export const addEstimate = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/api/estimates", formData, config);
    dispatch({
      type: ADD_ESTIMATE,
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
