const PROJECT_ID = "cusodt8u";
const DATASET = "production";

const QUERY = encodeURIComponent(`
*[_type == "clubFace" && isVisible == true]
| order(order asc){
  name,
  role,
  "image": photo.asset->url
}
`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2023-10-01/data/query/${DATASET}?query=${QUERY}`;

const slider = document.getElementById("faces-slider");
const errorBox = document.getElementById("faces-error");

const btnPrev = document.getElementById("prev-face")
const btnNext = document.getElementById("next-face")

let faces = [];
let active = 0;

function card(face, type) {

  if(type === "center") {
    return `
<div class="flex-shrink-0 w-80 bg-white p-8 rounded-2xl shadow-2xl text-center scale-105 transition-all duration-300">
  <div class="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-primary shadow-lg">
    <img src="${face.image}" class="w-full h-full object-cover">
  </div>
  <h4 class="text-primary font-bold text-xl">${face.name}</h4>
  <p class="text-slate-500 text-sm font-bold uppercase mb-4">${face.role}</p>
</div>`;
  }

  return `
<div class="flex-shrink-0 w-72 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center transition-all duration-300 opacity-70">
  <div class="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-accent">
    <img src="${face.image}" class="w-full h-full object-cover grayscale">
  </div>
  <h4 class="text-white font-bold text-lg">${face.name}</h4>
  <p class="text-accent text-sm uppercase">${face.role}</p>
</div>`;
}

function render() {

  slider.innerHTML = "";

  if(!faces.length) return;

  const prev = faces[(active - 1 + faces.length) % faces.length];
  const curr = faces[active];
  const next = faces[(active + 1) % faces.length];

  slider.insertAdjacentHTML("beforeend", card(prev, "side"));
  slider.insertAdjacentHTML("beforeend", card(curr, "center"));
  slider.insertAdjacentHTML("beforeend", card(next, "side"));
}

btnPrev.onclick = () => {
  active = (active - 1 + faces.length) % faces.length;
  render();
};

btnNext.onclick = () => {
  active = (active + 1) % faces.length;
  render();
};

async function loadFaces() {

  try {

    const res = await fetch(URL);
    const data = await res.json();

    faces = data.result || [];

    render();

  } catch(e) {
    console.error(e);
    errorBox.classList.remove("hidden");
  }

}

loadFaces();
