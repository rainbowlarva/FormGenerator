import example from "../generators/example.js";
import fullTest from "../generators/full-feature-generator.js";
import sangang from "../generators/sangang.js";

const generators = {
  example,
  fullTest,
  sangang
};

const gen = new URLSearchParams(window.location.search).get("gen");

if (gen && generators[gen]) {
  import('./engine.js').then(engine => {
    engine.default(generators[gen]);
  });
} else {
  document.getElementById("form-container").innerText = "No generator selected or invalid name in ?gen=...";
}
