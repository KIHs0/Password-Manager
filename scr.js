const spane = document.querySelector("  .details span");
const valueslider = document.querySelector(".passlength input");
const colorindicator = document.querySelector(".passindicator");
const generatebtn = document.getElementById("generatepassword");
const allcheckbox = document.querySelectorAll(".opt input");

const finalpassis = document.querySelector(".inputplace input");
const copyclip = document.getElementById("hh"); // or another selector

const createPassword = () => {
  let staticpass = "";
  let randompass = "";
  let exduplicate = false;
  let passlength = valueslider.value;

  allcheckbox.forEach((elem) => {
    if (elem.checked) {
      if (elem.id !== "duplicate" && elem.id !== "space") {
        staticpass += characters[elem.id];
      } else if (elem.id == "space") {
        staticpass = "  ${staticpass}   ";
        exduplicate = true;
      }
    } else {
      exduplicate = true;
    }
  });

  for (let i = 0; i < passlength; i++) {
    let randomchar = staticpass[Math.floor(Math.random() * staticpass.length)];
    if (exduplicate) {
      !randompass.includes(randomchar) || randomchar == " "
        ? (randompass += randomchar)
        : i--;
    } else {
      randompass += randomchar;
    }
  }
  finalpassis.value = randompass;
};

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  symbols: "!@#$%^&*(){}[],.><?_-+=~",
  numbers: "234567889",
};
const updateslide = () => {
  spane.innerText = valueslider.value;
  generatecolor();
};

const generatecolor = () => {
  colorindicator.id =
    valueslider.value < 10
      ? "weak"
      : valueslider.value < 16
      ? "medium "
      : valueslider.value <= 30
      ? "strong"
      : "";
};

updateslide();

valueslider.addEventListener("input", updateslide);

generatebtn.addEventListener("click", createPassword);

const Clipboard = () => {
  if (!navigator.clipboard) {
    console.error("Clipboard API is not supported on this browser.");
    alert(
      "Your browser does not support copying to clipboard. Please update your browser or use a secure context (HTTPS)."
    );
    return; // Exit early
  } else {
    navigator.clipboard.writeText(finalpassis.value);
    console.log("copied");

    copyclip.innerHTML = "check";
    setTimeout(() => {
      copyclip.innerHTML = "copy_all";
    }, 1000);
  }
};
copyclip.addEventListener("click", Clipboard);
