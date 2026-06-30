import ImageCompare from 'image-compare-viewer';


document.addEventListener("DOMContentLoaded", () => {
  const viewers = document.querySelectorAll(".image-compare");
  viewers.forEach((element) => {
    let view = new ImageCompare(element).mount();
  });
});