const apiTrivia = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json())
  .then((data) => data.results);
apiTrivia();

export default apiTrivia;
