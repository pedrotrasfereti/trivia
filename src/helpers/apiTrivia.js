const apiTrivia = async (token) => {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
};

export default apiTrivia;
