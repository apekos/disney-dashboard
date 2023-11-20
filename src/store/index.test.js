import store from "./index";

describe("Redux Store Configuration", () => {
  it("should create the store with the correct initial state", () => {
    const initialState = {
      characters: {
        characters: [],
        error: null,
      },
    };

    expect(store.getState()).toEqual(initialState);
  });
});
