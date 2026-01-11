const createElement = (arr) => {
  const htmlElements = arr.map((el) => ` <span>${el}</span>`);
  console.log(htmlElements.join(" "));
};
const synonyms = ["synonym", "synonym", "synonym", "synonym", "synonym"];
createElement(synonyms);
