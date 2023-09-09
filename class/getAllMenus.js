const getMenusData = async () => {
  await fetch("https://api.irannobat.ir/InoMenu/getAll")
    .then((response) => response.json())
    .then((json) => {
      console.log("menus", json);
      return json;
    })
    .catch((err) => console.log(err));
};

module.exports.getMenusData = getMenusData;
