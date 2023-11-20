import charactersReducer from "./characters";
import {
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE,
} from "../actions/characters";

describe("characters reducer", () => {
  it("should return the initial state", () => {
    expect(charactersReducer(undefined, {})).toEqual({
      characters: [],
      error: null,
    });
  });

  it("should handle FETCH_CHARACTERS_SUCCESS", () => {
    const characters = [{ name: "Mickey Mouse" }];
    const action = {
      type: FETCH_CHARACTERS_SUCCESS,
      payload: characters,
    };
    expect(charactersReducer(undefined, action)).toEqual({
      characters,
      error: null,
    });
  });

  it("should handle FETCH_CHARACTERS_FAILURE", () => {
    const error = "Failed to fetch characters";
    const action = {
      type: FETCH_CHARACTERS_FAILURE,
      payload: error,
    };
    expect(charactersReducer(undefined, action)).toEqual({
      characters: [],
      error,
    });
  });
});
