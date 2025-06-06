export function magnify(imgID: string, zoom: number): void {
  let img: HTMLImageElement | null, w: number, h: number, bw: number;

  // Remove any existing magnifier glass to prevent multiple instances
  const existingGlass = document.querySelector(".img-magnifier-glass");
  if (existingGlass) {
    existingGlass.remove();
  }

  img = document.getElementById(imgID) as HTMLImageElement | null;

  if (!img || !img.parentElement) {
    console.error(
      `Image with ID "${imgID}" not found or has no parent element.`
    );
    return;
  }

  // Create a new magnifier glass
  const glass = document.createElement("DIV"); // Use const for glass
  glass.setAttribute("class", "img-magnifier-glass");
  img.parentElement.insertBefore(glass, img);

  glass.style.backgroundImage = `url('${img.src}')`;
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;

  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  // Function to move the magnifier
  const moveMagnifier = (e: MouseEvent | TouchEvent) => {
    let pos, x, y;
    e.preventDefault();

    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;

    // Prevent the magnifier glass from going out of bounds
    if (x > img!.width - w / zoom) {
      x = img!.width - w / zoom;
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img!.height - h / zoom) {
      y = img!.height - h / zoom;
    }
    if (y < h / zoom) {
      y = h / zoom;
    }

    glass.style.left = `${x - w}px`;
    glass.style.top = `${y - h}px`;
    glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${
      y * zoom - h + bw
    }px`;
  };

  // Function to get the cursor position
  const getCursorPos = (e: MouseEvent | TouchEvent) => {
    let a: DOMRect,
      x = 0,
      y = 0;
    const event = e as MouseEvent;
    a = img!.getBoundingClientRect();

    if ("touches" in e) {
      x = e.touches[0].pageX - a.left;
      y = e.touches[0].pageY - a.top;
    } else {
      x = event.pageX - a.left;
      y = event.pageY - a.top;
    }

    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x, y };
  };

  // Add event listeners
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
}
