export function magnify(imgID, zoom) {
  let img, glass, w, h, bw;

  // Remove any existing magnifier glass to prevent multiple instances
  const existingGlass = document.querySelector(".img-magnifier-glass");
  if (existingGlass) {
    existingGlass.remove();
  }

  img = document.getElementById(imgID);

  // Create a new magnifier glass
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  img.parentElement.insertBefore(glass, img);

  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize =
    img.width * zoom + "px " + img.height * zoom + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  // Add event listeners to the image and the magnifier glass
  const moveMagnifier = (e) => {
    let pos, x, y;
    e.preventDefault();
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;

    // Prevent the magnifier glass from going out of bounds
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom;
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom;
    }
    if (y < h / zoom) {
      y = h / zoom;
    }

    glass.style.left = x - w + "px";
    glass.style.top = y - h + "px";
    glass.style.backgroundPosition =
      "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
  };

  const getCursorPos = (e) => {
    let a,
      x = 0,
      y = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  };

  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
}