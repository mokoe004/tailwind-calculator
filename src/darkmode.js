let checkbox = document.getElementById("AcceptConditions");

if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  console.log("Checkbox activated.");
  document.documentElement.classList.add("dark");
  checkbox.checked = true;
}

checkbox.onchange = function () {
  if (checkbox.checked) {
    console.log("Checkbox activated.");
    document.documentElement.classList.add("dark");
  } else {
    console.log("Checkbox deactivated");
    document.documentElement.classList.remove("dark");
  }
};
