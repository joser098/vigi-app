const BASE_URL = import.meta.env.PUBLIC_API_URL;

const fethData = async (query: string) => {
  try {
    const queryFormated = query.replace("+", "%2B");
    const response = await fetch(`${BASE_URL}/api/search/${queryFormated}`);
    
    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export default fethData;
