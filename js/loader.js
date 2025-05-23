import example from "../generators/example.js";

const generators = {
  example
};

const urlParams = new URLSearchParams(window.location.search);
const gen = urlParams.get("gen");

if (gen && generators[gen]) {
  import('./engine.js').then(engine => {
    engine.default(generators[gen]);
  });
} else {
  window.location.href = "./home/home.html";
}
