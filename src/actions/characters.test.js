import {
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE,
  fetchCharactersSuccess,
  fetchCharactersFailure,
} from "./characters";

describe("characters actions", () => {
  it("should create an action to indicate successful character fetch", () => {
    const characters = [{ name: "Mickey Mouse" }];
    const expectedAction = {
      type: FETCH_CHARACTERS_SUCCESS,
      payload: characters,
    };
    expect(fetchCharactersSuccess(characters)).toEqual(expectedAction);
  });

  it("should create an action to indicate character fetch failure", () => {
    const error = "Failed to fetch characters";
    const expectedAction = {
      type: FETCH_CHARACTERS_FAILURE,
      payload: error,
    };
    expect(fetchCharactersFailure(error)).toEqual(expectedAction);
  });
});
