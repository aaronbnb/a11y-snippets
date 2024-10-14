javascript: (() => {
  Array.from(document.getElementsByTagName("*")).forEach((el) => {
    if (window.getComputedStyle(el).display == "none") {
      return;
    }
    if (
      el.tagName == "svg" &&
      parseInt(window.getComputedStyle(el).height) > 200
    ) {
      el.setAttribute("height", "200px");
      el.setAttribute("width", "200px");
    } else {
      if (el.hasAttribute("style")) {
        el.style = "null";
      }
    }
    if (el.tagName == "a") {
      el.style.margin = "3px 0px 3px 0px";
    }
  });
  document
    .querySelectorAll('style,link[rel="stylesheet"]')
    .forEach((item) => item.remove());
  Array.from(document.getElementsByTagName("img")).forEach((img) => {
    img.removeAttribute("src");
    img.style.height = "200px";
    img.style.width = "200px";
    img.style.border = "2px solid black;";
    if (img.hasAttribute("alt")) {
      let alt = img.getAttribute("alt");
      let span = document.createElement("span");
      if (alt.length > 0) {
        span.textContent = alt;
        img.innerHTML = span.innerHTML;
        img.parentNode.replaceChild(span, img);
      } else {
        span.textContent = "decorative image";
        img.innerHTML = span.innerHTML;
        img.parentNode.replaceChild(span, img);
      }
    }
  });
})();
