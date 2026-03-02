const PROJECT_ID = "cusodt8u";
const DATASET = "production";

const QUERY = encodeURIComponent(`
*[_type == "clubRecord" && isVisible == true]
| order(date asc){
  event,
  athlete,
  result,
  date,
  category
}
`);

const URL = `https://${PROJECT_ID}.api.sanity.io/v2023-10-01/data/query/${DATASET}?query=${QUERY}`;

const tbody = document.getElementById("records-body");
const errorBox = document.getElementById("records-error");
const buttons = document.querySelectorAll("[data-filter]");

let allRecords = [];
let activeFilter = "senior";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pl-PL");
}

function createRow(r) {
  return `
<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
data-category="${r.category}">
  <td class="px-6 py-4 font-bold text-primary">${r.event}</td>
  <td class="px-6 py-4">${r.athlete}</td>
  <td class="px-6 py-4 font-semibold">${r.result}</td>
  <td class="px-6 py-4 text-right text-slate-500">
    ${formatDate(r.date)}
  </td>
</tr>`;
}

function render() {
  tbody.innerHTML = "";

  const filtered = activeFilter === "all"
    ? allRecords
    : allRecords.filter(r => r.category === activeFilter);

  const limited = filtered.slice(-5); // ostatnie 5

  limited.forEach(r => {
    tbody.insertAdjacentHTML("beforeend", createRow(r));
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b =>
      b.classList.remove("bg-white", "dark:bg-slate-700", "active")
    );

    btn.classList.add("bg-white", "dark:bg-slate-700", "active");

    activeFilter = btn.dataset.filter;

    render();
  });
});

async function loadRecords() {
  try {
    const res = await fetch(URL);
    const data = await res.json();

    allRecords = data.result || [];

    render();

  } catch (err) {
    console.error(err);
    errorBox.classList.remove("hidden");
  }
}

loadRecords();
