const calcType = document.getElementById("calcType");
const materialSelect = document.getElementById("material");
const inputHmotnost = document.getElementById("input-hmotnost");
const inputCas = document.getElementById("input-cas");
const inputPeople = document.getElementById("input-people");
const inputWatty = document.getElementById("input-watty");
const resultDiv = document.getElementById("result");

function getMaterialCoefficient() {
  const mat = materialSelect.value;
  switch(mat){
    case "copper": return 89.6;
    case "gold": return 193.2;
    case "iron": return 78.7;
    case "kolo": return 2;
    case "auto": return 250;
    default: return 108.5;
  }
}

function updateInputs() {
  const type = calcType.value;
  inputHmotnost.classList.remove("hidden");
  inputCas.classList.remove("hidden");
  inputPeople.classList.remove("hidden");
  inputWatty.classList.remove("hidden");

  if (type === "watty") inputWatty.classList.add("hidden");
  if (type === "hmotnost") inputHmotnost.classList.add("hidden");
  if (type === "cas") inputCas.classList.add("hidden");
  if (type === "people") inputPeople.classList.add("hidden");
  if (type === "hmotnost85") inputHmotnost.classList.add("hidden");
}

calcType.addEventListener("change", updateInputs);
updateInputs();

document.getElementById("calcBtn").addEventListener("click", () => {
  const coef = getMaterialCoefficient();
  const hmotnost = parseFloat(document.getElementById("hmotnost").value);
  const cas = parseFloat(document.getElementById("cas").value);
  const people = parseFloat(document.getElementById("people").value);
  const watty = parseFloat(document.getElementById("watty").value);
  let result;

switch(calcType.value){
  case "watty":
    // výkon ve wattech
    result = ((coef * hmotnost) / (cas * people)) * Math.sqrt(8460);
    resultDiv.textContent = result.toFixed(3) + " cW";
    break;

  case "hmotnost":
    // hmotnost v kg
    result = (watty * people * cas) / coef / Math.sqrt(8460);
    resultDiv.textContent = result.toFixed(3) + " kg";
    break;

  case "cas":
    // čas ve vteřinách
    result = ((coef * hmotnost) / (watty * people) * Math.sqrt(8460));
    resultDiv.textContent = result.toFixed(3) + " h";
    break;

  case "people":
    // počet lidí
    result = ((coef * hmotnost) / watty) * Math.sqrt(8460) / cas;
    resultDiv.textContent = Math.round(result) + " lidí";
    break;

  case "hmotnost85":
    // hmotnost × 85
    const mass = (watty * people * cas) / coef;
    resultDiv.textContent = (mass * 85).toFixed(2) + " kg × 85";
    break;
}

});

document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("hmotnost").value = "";
  document.getElementById("cas").value = "";
  document.getElementById("people").value = "";
  document.getElementById("watty").value = "";
  resultDiv.textContent = "—";
});
