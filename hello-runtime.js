(function () {
  const status = document.querySelector("#status");

  status.textContent = "Success: hello-runtime.js loaded and ran.";
  status.style.color = "green";

  const detail = document.createElement("p");
  detail.textContent = `Loaded at ${new Date().toLocaleTimeString()}.`;
  document.body.append(detail);
}());
