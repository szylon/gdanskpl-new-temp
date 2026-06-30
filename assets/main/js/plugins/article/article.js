// Dodanie w artykule do linku do innego artykułu przedrostka Czytaj więcej
const subtitle = document.querySelectorAll("article .read-also");
for (i = 0; i < subtitle.length; i++) {
    let span = document.createElement("span")
    subtitle[i].prepend(span);
    span.append("Czytaj także: ");
}