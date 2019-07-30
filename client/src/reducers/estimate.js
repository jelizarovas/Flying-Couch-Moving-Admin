import { GET_ESTIMATE } from "../actions/types";

const initialState = {
  client: [{}],
  locations: [{}],
  dates: [{}],
  inventory: [{}],
  notes: "",
  helpers: [{}]
};

export default function(state = initialState, action) {
  // const { type, payload } = action;
  const { type } = action;

  switch (type) {
    case GET_ESTIMATE:
      return {
        ...state
      };
    default:
      return state;
  }
}
