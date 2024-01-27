const fethData = async (query: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/search/${query}`);

    const res = await response.json();

    return res.data;
  } catch (error) {
    return error;
  }
};

export default fethData;
