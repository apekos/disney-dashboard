import axios from "axios";

const BASE_URL = "https://api.disneyapi.dev/character";

export const fetchDisneyCharacters = async (page, pageSize) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Disney characters:", error);
    throw error;
  }
};
