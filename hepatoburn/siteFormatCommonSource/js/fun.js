function myFunction() {
  var x = document.getElementById("myTopnav");
  x.classList.toggle('responsive')
}
function toggleMenu() {
  var menuToggler = document.getElementById("menu-toggler");
  menuToggler.classList.toggle("change");
  console.log(menuToggler.classList)
}

if (document.URL.startsWith('file://')) {
  var editOn = 0;
}
if (editOn == 0) {
  document.addEventListener('keypress', tryEdition);
}
function tryEdition(e) {
  if (e.key.toLowerCase() == 'e') {
    editOn++;
  }
  if (editOn > 2) {
    document.removeEventListener('keypress', tryEdition);
    editModeOn();
  }
}
function editModeOn() {
  document.querySelectorAll("*[id^='ed'], *[ed]").forEach(val => {
    val.setAttribute('contenteditable', 'true');
    val.addEventListener('paste', function (e) {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    });
  });
  document.querySelectorAll('a').forEach(val => {
    val.setAttribute('ref', val.getAttribute('href'));
    val.removeAttribute("href");
  })
  document.querySelector('body').insertAdjacentHTML('beforeend', `<button onclick="editModeOff();copyHTML();" id='buttonCopierCode' style="position: fixed; padding: 10px; top: 10px; right: 10px;">Copy Code</button>`)
}

function editModeOff() {
  document.querySelectorAll("*[contenteditable]").forEach(val => {
    val.removeAttribute('contenteditable');
  });
  document.querySelectorAll('a').forEach(val => {
    val.setAttribute('href', val.getAttribute('ref'));
    val.removeAttribute("ref");
  })
  document.querySelector('#buttonCopierCode').remove();
}
function copyHTML() {
  var txt = `<!DOCTYPE html>
`
  copy(txt + document.querySelector('html').outerHTML);

}

function copy(txt) {
  let elem = document.createElement("textarea");
  document.body.insertAdjacentElement("beforeend", elem)
  elem.value = txt;
  elem.select();
  elem.setSelectionRange(0, elem.value.length + 1);
  document.execCommand("copy");
  navigator.clipboard.writeText(elem.value);
  elem.remove();
  alert("Code copied successfully!")
}
