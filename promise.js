const human = require("./humanData");
const fetch = require("node-fetch");

const url = "//reqres.in/api/users?page=2";
const fetchData = async () => {
  const dataApi = await fetch(human);
  //   const data = await dataApi.json();
  return dataApi;
};
fetchData().then((data) => console.log(data));
