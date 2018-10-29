export default (text = "Hello world") => {
  const element = document.createElement("div");
  element.className = "flex h-2 bg-green";

  element.innerHTML = text;

  return element;
};
