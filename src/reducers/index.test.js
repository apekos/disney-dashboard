import { combineReducers } from "redux";
import charactersReducer from "./characters";
import rootReducer from "./index";

describe("root reducer", () => {
  it("should combine reducers correctly", () => {
    const combinedReducer = combineReducers({
      characters: charactersReducer,
    });

    const initialState = {
      characters: {
        characters: [],
        error: null,
      },
    };

    const action = { type: "SOME_ACTION" };

    expect(rootReducer(initialState, action)).toEqual(
      combinedReducer(initialState, action)
    );
  });
});
