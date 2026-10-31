const FEEDS = [
  "./news.json",
  "https://plykov.github.io/news-tilburg/news.json",
  "https://raw.githubusercontent.com/plykov/news-tilburg/main/news.json"
];
const I18N = {
  nl: {
    title: "Tilburg Nieuws",
    sub: "Dagelijkse briefing \u00b7 vrije bronnen",
    update: "Update",
    agenda: "Agenda",
    all: "Alles",
    gemeente: "Gemeente",
    omroep: "Omroep",
    incident: "Incident",
    cultuur: "Cultuur",
    banner: "Alleen vrije bronnen. Volledige artikelen staan bij de uitgever.",
    foot: "Inbox tilburg.news.v1. Geen BD/AD. EN/RU is modelvertaling, geen officiele tekst.",
    empty: "Geen items in dit filter.",
    translated: "EN/RU: modelvertaling, niet officieel.",
    sourceNl: "Brontekst in het Nederlands."
  },
  en: {
    title: "Tilburg News",
    sub: "Daily briefing \u00b7 free sources only",
    update: "Update",
    agenda: "Agenda",
    all: "All",
    gemeente: "Municipality",
    omroep: "Broadcaster",
    incident: "Incident",
    cultuur: "Culture",
    banner: "Free sources only. Full articles stay on the publisher site.",
    foot: "Inbox tilburg.news.v1. No BD/AD. EN/RU strings are model translations, not official.",
    empty: "No items in this filter.",
    translated: "EN/RU: model translation, not official.",
    sourceNl: "Source text is Dutch."
  },
  ru: {
    title: "\u041d\u043e\u0432\u043e\u0441\u0442\u0438 \u0422\u0438\u043b\u0431\u0443\u0440\u0433\u0430",
    sub: "\u0415\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u0430\u044f \u0441\u0432\u043e\u0434\u043a\u0430 \u00b7 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0435 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u0438",
    update: "\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c",
    agenda: "\u0410\u0444\u0438\u0448\u0430",
    all: "\u0412\u0441\u0435",
    gemeente: "\u041c\u0443\u043d\u0438\u0446\u0438\u043f\u0430\u043b\u0438\u0442\u0435\u0442",
    omroep: "\u0412\u0435\u0449\u0430\u0442\u0435\u043b\u044c",
    incident: "\u041f\u0440\u043e\u0438\u0441\u0448\u0435\u0441\u0442\u0432\u0438\u0435",
    cultuur: "\u041a\u0443\u043b\u044c\u0442\u0443\u0440\u0430",
    banner: "\u0422\u043e\u043b\u044c\u043a\u043e \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u0438. \u041f\u043e\u043b\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 \u2014 \u0443 \u0438\u0437\u0434\u0430\u0442\u0435\u043b\u044f.",
    foot: "tilburg.news.v1. \u0411\u0435\u0437 BD/AD. EN/RU \u2014 \u043c\u043e\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u043f\u0435\u0440\u0435\u0432\u043e\u0434, \u043d\u0435 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442.",
    empty: "\u0412 \u044d\u0442\u043e\u043c \u0444\u0438\u043b\u044c\u0442\u0440\u0435 \u043d\u0435\u0442 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u043e\u0432.",
    translated: "EN/RU: \u043c\u043e\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u043f\u0435\u0440\u0435\u0432\u043e\u0434, \u043d\u0435 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439.",
    sourceNl: "\u0418\u0441\u0445\u043e\u0434\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 \u043d\u0430 \u043d\u0438\u0434\u0435\u0440\u043b\u0430\u043d\u0434\u0441\u043a\u043e\u043c."
  }
};
const CATS = ["all", "gemeente", "omroep", "incident", "cultuur"];
const state = {
  lang: localStorage.getItem("tn.lang") || "nl",
  cat: "all",
  env: null
};
function t() { return I18N[state.lang] || I18N.nl; }
function pick(obj) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[state.lang] || obj.nl || "";
}
function loc() {
  return state.lang === "nl" ? "nl-NL" : state.lang === "ru" ? "ru-RU" : "en-GB";
}
function fmtWhen(iso) {
  return new Intl.DateTimeFormat(loc(), {
    weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
    timeZone: "Europe/Amsterdam"
  }).format(new Date(iso));
}
function dayKey(iso) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(new Date(iso));
}
function dayLabel(iso) {
  return new Intl.DateTimeFormat(loc(), {
    weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Amsterdam"
  }).format(new Date(iso));
}
async function loadNews() {
  let lastErr;
  for (const url of FEEDS) {
    try {
      const res = await fetch(url + "?t=" + Date.now(), { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (data && data.schema === "tilburg.news.v1") return data;
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error("no feed");
}
function renderChrome() {
  const ui = t();
  document.documentElement.lang = state.lang === "ru" ? "ru" : state.lang;
  document.getElementById("appTitle").textContent = ui.title;
  document.getElementById("appSub").textContent = ui.sub;
  document.getElementById("updateBtn").textContent = ui.update;
  document.getElementById("agendaLink").textContent = ui.agenda;
  document.getElementById("banner").textContent = ui.banner;
  document.getElementById("foot").innerHTML = ui.foot + ' \u00b7 <a href="https://github.com/plykov/news-tilburg">GitHub</a>';
  document.querySelectorAll("[data-lang]").forEach(b => b.classList.toggle("on", b.dataset.lang === state.lang));
  const filters = document.getElementById("filters");
  filters.innerHTML = "";
  CATS.forEach(c => {
    const b = document.createElement("button");
    b.textContent = ui[c];
    b.className = state.cat === c ? "on" : "";
    b.onclick = () => { state.cat = c; render(); };
    filters.appendChild(b);
  });
}
function escapeHtml(s) {
  return String(s || "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}
function render() {
  renderChrome();
  const env = state.env;
  const ui = t();
  if (!env) {
    document.getElementById("headline").textContent = "...";
    return;
  }
  const n = (env.items || []).length;
  const when = env.generatedAt ? fmtWhen(env.generatedAt) : "";
  const prefix = state.lang === "en" ? "Last import " : state.lang === "ru" ? "Import " : "Laatste import ";
  document.getElementById("importMeta").textContent = prefix + when + " \u00b7 " + n + " \u00b7 " + (env.source || "");
  document.getElementById("headline").textContent = pick(env.headline);
  document.getElementById("langFlag").textContent = env.headlineLangNote === "ui-translated" ? ui.translated : ui.sourceNl;
  const items = (env.items || [])
    .filter(it => it.paywall !== true)
    .filter(it => state.cat === "all" || it.category === state.cat)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const feed = document.getElementById("feed");
  feed.innerHTML = "";
  if (!items.length) {
    feed.innerHTML = '<p class="empty">' + ui.empty + "</p>";
    return;
  }
  let lastDay = "";
  items.forEach(it => {
    const dk = dayKey(it.publishedAt);
    if (dk !== lastDay) {
      lastDay = dk;
      const h = document.createElement("div");
      h.className = "day";
      h.textContent = dayLabel(it.publishedAt);
      feed.appendChild(h);
    }
    const a = document.createElement("a");
    a.className = "card";
    a.href = it.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    const missing = state.lang !== "nl" && !(it.title && it.title[state.lang]);
    const tag = it.langNote === "ui-translated"
      ? (state.lang === "nl" ? "vertaald" : state.lang === "ru" ? "\u043f\u0435\u0440\u0435\u0432\u043e\u0434" : "translated")
      : "";
    a.innerHTML =
      '<div class="meta">' + fmtWhen(it.publishedAt) + (it.city ? " \u00b7 " + it.city : "") + (it.area ? " \u00b7 " + it.area : "") + "</div>" +
      "<h3>" + escapeHtml(pick(it.title)) + "</h3>" +
      '<div class="src">' + escapeHtml(it.sourceName) + "</div>" +
      '<p class="teaser">' + escapeHtml(pick(it.teaser)) + "</p>" +
      '<div class="chips"><span class="chip">' + escapeHtml(ui[it.category] || it.category) + "</span>" +
      (tag ? '<span class="chip ghost">' + tag + "</span>" : "") +
      (missing ? '<span class="chip ghost">NL</span>' : "") +
      "</div>";
    feed.appendChild(a);
  });
}
async function refresh() {
  document.getElementById("headline").textContent = "...";
  try {
    state.env = await loadNews();
    localStorage.setItem("tn.env", JSON.stringify(state.env));
  } catch (e) {
    const cached = localStorage.getItem("tn.env");
    if (cached) state.env = JSON.parse(cached);
    else document.getElementById("headline").textContent = String(e);
  }
  render();
}
document.querySelectorAll("[data-lang]").forEach(b => {
  b.onclick = () => {
    state.lang = b.dataset.lang;
    localStorage.setItem("tn.lang", state.lang);
    render();
  };
});
document.getElementById("updateBtn").onclick = refresh;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
refresh();
setInterval(refresh, 30000);
