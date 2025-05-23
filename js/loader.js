import example from "../generators/example.js";

const generators = {
  example
};

const gen = new URLSearchParams(window.location.search).get("gen");

if (gen && generators[gen]) {
  import('./engine.js').then(engine => {
    engine.default(generators[gen]);
  });
} else {
  document.getElementById("form-container").innerText = "No generator selected or invalid name in ?gen=...";
}
