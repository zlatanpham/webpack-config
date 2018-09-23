export default (text = "Hello world") => {
  const element = document.createElement("div");
  const p = document.createElement("p");
  const button = document.createElement("button");
  button.innerText = "Click me";
  p.innerText = "paragraph";

  element.appendChild(button);
  element.appendChild(p);

  button.onclick = () => {
    import("./lazy")
      .then(lazy => {
        p.innerText = lazy.default;
      })
      .catch(err => {
        console.error(err);
      });
  };

  return element;
};
