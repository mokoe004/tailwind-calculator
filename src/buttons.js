var checkbox = document.getElementById("AcceptConditions");

checkbox.onchange = function () {
  if (checkbox.checked) {
    console.log("Die Checkbox ist aktiviert.");
    document.documentElement.classList.add("dark");
  } else {
    console.log("Die Checkbox ist deaktiviert.");
    document.getElementById("bg-cb").classList.replace("bg-green-500","bg-grey-300");
  }
};
