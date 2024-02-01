const BASE_URL = import.meta.env.PUBLIC_API_URL;

const fethData = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/search/${query}`);

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export default fethData;
