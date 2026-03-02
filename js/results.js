const PROJECT_ID = "cusodt8u";
const DATASET = "production";

const QUERY = encodeURIComponent(`
*[_type == "competitionResult" && isVisible == true]
| order(date desc){
  title,
  date,
  city,
  country,
  medals,
  description
}
`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2023-10-01/data/query/${DATASET}?query=${QUERY}`;

const container = document.getElementById("results-container");
const loadBtn = document.getElementById("load-more-btn");
const errorBox = document.getElementById("results-error");

let allResults = [];
let visible = 0;
const STEP = 3;

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pl-PL");
}

// minimalist portable text → html
function portableToHTML(blocks = []) {
  return blocks.map(b =>
    `<p>${b.children?.map(c => c.text).join("")}</p>`
  ).join("");
}

function createCard(r) {
  return `
<div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-700 flex flex-col lg:flex-row lg:items-center gap-8">

  <div class="flex flex-col gap-1 w-full lg:w-1/4">
    <span class="text-xs font-bold text-primary uppercase tracking-widest">
      ${formatDate(r.date)}
    </span>
    <h3 class="text-xl font-bold dark:text-white">${r.title}</h3>
    <p class="text-sm text-slate-500 flex items-center gap-1">
      <span class="material-symbols-outlined text-sm">location_on</span>
      ${r.city}, ${r.country}
    </p>
  </div>

  <div class="flex-1 grid grid-cols-3 gap-4 border-l border-r border-slate-100 dark:border-slate-700 px-8">

    <div class="text-center">
      <span class="block text-2xl font-black text-primary">${r.medals.gold}</span>
      <span class="text-[10px] font-bold uppercase text-slate-400">Gold</span>
    </div>

    <div class="text-center">
      <span class="block text-2xl font-black text-slate-400">${r.medals.silver}</span>
      <span class="text-[10px] font-bold uppercase text-slate-400">Silver</span>
    </div>

    <div class="text-center">
      <span class="block text-2xl font-black text-orange-400">${r.medals.bronze}</span>
      <span class="text-[10px] font-bold uppercase text-slate-400">Bronze</span>
    </div>

  </div>

  <div class="lg:w-1/4">
    <div class="text-sm text-slate-600 dark:text-slate-300">
      ${portableToHTML(r.description)}
    </div>
  </div>

</div>`;
}

function renderBatch() {
  const next = allResults.slice(visible, visible + STEP);

  next.forEach(r => {
    container.insertAdjacentHTML("beforeend", createCard(r));
  });

  visible += STEP;

  if (visible >= allResults.length) {
    loadBtn.disabled = true;
    loadBtn.classList.add("opacity-50", "cursor-not-allowed");
  }
}

async function loadResults() {
  try {
    const res = await fetch(URL);
    const data = await res.json();

    allResults = data.result || [];

    if (!allResults.length) {
      errorBox.textContent = "Brak wyników.";
      errorBox.classList.remove("hidden");
      return;
    }

    renderBatch();

  } catch (err) {
    console.error(err);
    errorBox.classList.remove("hidden");
  }
}

loadBtn.addEventListener("click", renderBatch);

loadResults();
