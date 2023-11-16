import {
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE,
} from "../actions/characters";

const initialState = {
  characters: [],
  error: null,
};

const charactersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: action.payload,
        error: null,
      };
    case FETCH_CHARACTERS_FAILURE:
      return {
        ...state,
        characters: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default charactersReducer;
