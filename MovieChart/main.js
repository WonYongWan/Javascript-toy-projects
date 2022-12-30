async function getDate() {
  const rawResponse = await fetch("https://openapi.naver.com/v1/search/movie.json")
  const jsonResponse = await rawResponse.json();
  console.log(jsonResponse)
}
getDate()