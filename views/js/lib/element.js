define("element", ["vue", "ELEMENT"], function (Vue, Element) {
  console.log("vue :>> ", Vue);
  console.log("element-ui :>> ", Element);
  Vue.use(Element, { size: "small", zIndex: 3000 });
  return Element;
});
