export const FETCH_CHARACTERS_SUCCESS = "FETCH_CHARACTERS_SUCCESS";
export const FETCH_CHARACTERS_FAILURE = "FETCH_CHARACTERS_FAILURE";

export const fetchCharactersSuccess = (characters) => ({
  type: FETCH_CHARACTERS_SUCCESS,
  payload: characters,
});

export const fetchCharactersFailure = (error) => ({
  type: FETCH_CHARACTERS_FAILURE,
  payload: error,
});
