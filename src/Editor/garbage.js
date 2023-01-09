const setCaretPosition = (e, line, column) => {
  this.moveCaretToEnd(e);
  e.focus();
  const range = document.createRange();
  const selection = document.getSelection();
  let row = null;
  //    console.log(e.childNodes);
  for (var i = e.childNodes.length - 1; i >= 0; i--) {
    if (e.childNodes[i].nodeName !== "BR") {
      row = i;
      //        console.log(row);
      break;
    }
  }
  console.log(
    e.childNodes[row].nodeName === "#text"
      ? e.childNodes[row].length
      : e.childNodes[row].innerText.length
  );
  if (row !== null) {
    range.setStart(
      e.childNodes[row],
      e.childNodes[row].nodeName === "#text"
        ? e.childNodes[row].length
        : e.childNodes[row]
    );
    console.log(e.childNodes[row], e.childNodes[row].length);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
const handleCaretPosition2 = (e) => {
  var sel = document.getSelection(),
    nd = sel.anchorNode,
    text = nd.textContent.slice(0, sel.focusOffset);

  var line = text.split("\n").length;
  var col = text.split("\n").pop().length;

  return [line, col];
};
