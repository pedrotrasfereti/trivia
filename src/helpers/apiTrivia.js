const apiTrivia = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json())
  .then((data) => data)
  .then((data) => (data.results));

export default apiTrivia;
