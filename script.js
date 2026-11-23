/* =========================================================
   KIYARA SUNSHINE — site config
   Edit this block: links + beats. Nothing else needs changing.
   ========================================================= */
const CONFIG = {
  links: {
    beatstars: "https://www.beatstars.com/kiyarasunshine",
    youtube: "https://www.youtube.com/@KiyaraSunshine",
    instagram: "", // e.g. "https://instagram.com/kiyarasunshine"
    telegram: "",  // e.g. "https://t.me/kiyarasunshine"
    tiktok: "",    // e.g. "https://www.tiktok.com/@kiyarasunshine"
    email: "",     // e.g. "kiyarasunshine@gmail.com"
  },

  /*
    Each beat:
      title  — beat name
      genre  — used for the filter chips
      bpm, key
      tags   — shown under the title, also searchable
      price  — lowest lease price
      audio  — preview file in /beats (mp3), e.g. "beats/hurricane.mp3"
      url    — link to this beat on BeatStars (falls back to the store page)
  */
  beats: [
    { title: "HURRICANE",  genre: "Rage",      bpm: 160, key: "C#m", tags: ["ken carson type", "rage", "synth"],     price: 25, audio: "beats/hurricane.mp3",  url: "" },
    { title: "CHROME",     genre: "Opium",     bpm: 150, key: "F#m", tags: ["destroy lonely type", "dark", "opium"], price: 25, audio: "beats/chrome.mp3",     url: "" },
    { title: "SUNSHINE",   genre: "Plugg",     bpm: 145, key: "E",   tags: ["pluggnb", "melodic", "bells"],          price: 25, audio: "beats/sunshine.mp3",   url: "" },
    { title: "BLACK ROSE", genre: "Dark trap", bpm: 140, key: "Gm",  tags: ["evil", "choir", "808"],                 price: 25, audio: "beats/black-rose.mp3", url: "" },
    { title: "CRASH OUT",  genre: "Rage",      bpm: 165, key: "Am",  tags: ["playboi carti type", "distorted"],      price: 25, audio: "beats/crash-out.mp3",  url: "" },
    { title: "ANGEL DUST", genre: "Jerk",      bpm: 155, key: "Dm",  tags: ["jerk", "bouncy", "underground"],        price: 25, audio: "beats/angel-dust.mp3", url: "" },
    { title: "GHOST",      genre: "Dark trap", bpm: 130, key: "Bm",  tags: ["yeat type", "bells", "dark"],           price: 25, audio: "beats/ghost.mp3",      url: "" },
    { title: "ICE",        genre: "Opium",     bpm: 148, key: "D#m", tags: ["homixide type", "hard"],                price: 25, audio: "beats/ice.mp3",        url: "" },
  ],
};

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const L = CONFIG.links;

const ICONS = {
  youtube: '<svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9L15.5 12z"/></svg>',
  beatstars: '<svg viewBox="0 0 24 24"><path d="M12 1l2.6 8.4H23l-6.8 5 2.6 8.4L12 17.6l-6.8 5.2 2.6-8.4L1 9.4h8.4z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2.2c2.7 0 3 0 4 .1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.7-.1-4-1.4-4.1-4.1-.1-1-.1-1.3-.1-4s0-3 .1-4C4 3.7 5.3 2.4 8 2.3c1 0 1.3-.1 4-.1zM12 .4C9.3.4 8.9.4 7.9.5 4.2.7 2.2 2.7 2 6.4 1.9 7.4 1.9 7.8 1.9 12s0 4.6.1 5.6c.2 3.7 2.2 5.7 5.9 5.9 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.7-.2 5.7-2.2 5.9-5.9.1-1 .1-1.4.1-5.6s0-4.6-.1-5.6C21.8 2.7 19.8.7 16.1.5 15.1.4 14.7.4 12 .4z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24"><path d="M21.9 3.6 18.6 19c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L6 12.6 1.1 11c-1.1-.3-1.1-1.1.2-1.6L20.5 2c.9-.3 1.7.2 1.4 1.6z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24"><path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.7a2.9 2.9 0 1 1-2-2.7V9.5a6.3 6.3 0 1 0 5.4 6.2V8.8a8.2 8.2 0 0 0 4.8 1.5V6.9a4.8 4.8 0 0 1-1-.2z"/></svg>',
  email: '<svg viewBox="0 0 24 24"><path d="M2 5h20v14H2zm2 2v.5l8 5 8-5V7zm16 3-8 5-8-5v7h16z"/></svg>',
};
const LABELS = { youtube: "YouTube", beatstars: "BeatStars", instagram: "Instagram", telegram: "Telegram", tiktok: "TikTok", email: "Email" };
const href = (k) => (k === "email" ? `mailto:${L.email}` : L[k]);

/* ---------- links ---------- */
$$("[data-link]").forEach((a) => {
  const k = a.dataset.link;
  if (L[k]) a.href = href(k);
  else a.remove();
});

$("#socials").innerHTML = Object.keys(LABELS)
  .filter((k) => L[k])
  .map((k) => `<a href="${href(k)}" ${k === "email" ? "" : 'target="_blank" rel="noopener"'}>${ICONS[k]}${LABELS[k]}</a>`)
  .join("");

const contactOrder = ["telegram", "instagram", "email", "beatstars", "youtube"].filter((k) => L[k]);
$("#contactActions").innerHTML = contactOrder
  .slice(0, 3)
  .map((k, i) => `<a class="btn ${i === 0 ? "btn-chrome" : "btn-ghost"} btn-lg" href="${href(k)}" ${k === "email" ? "" : 'target="_blank" rel="noopener"'}>${LABELS[k]}</a>`)
  .join("");

$("#year").textContent = new Date().getFullYear();

/* ---------- mobile menu ---------- */
const burger = $("#burger"), navLinks = $("#navLinks");
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
$$("#navLinks a").forEach((a) => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
}));

/* ---------- toast ---------- */
let toastT;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 2800);
}

/* ---------- beats ---------- */
const beats = CONFIG.beats.map((b, i) => ({ ...b, id: i, url: b.url || L.beatstars }));
const genres = ["All", ...new Set(beats.map((b) => b.genre))];
let activeGenre = "All";
let query = "";
let visible = beats;

function coverStyle(b) {
  // deterministic chrome-ish cover per beat
  let h = 0;
  for (const c of b.title) h = (h * 31 + c.charCodeAt(0)) % 360;
  const a = 20 + (h % 40), l = 8 + (h % 10);
  return `background: radial-gradient(circle at ${30 + (h % 40)}% ${20 + (h % 30)}%, hsl(0 0% ${a + 30}%), hsl(0 0% ${l}%) 60%, #000);`;
}
function bars(id) {
  let s = "";
  for (let i = 0; i < 22; i++) {
    const v = 25 + Math.abs(Math.sin((i + 1) * (id + 3) * 0.9)) * 75;
    s += `<i style="height:${v.toFixed(0)}%;animation-delay:${(i * 0.07).toFixed(2)}s"></i>`;
  }
  return s;
}

$("#genreChips").innerHTML = genres
  .map((g) => `<button class="chip${g === "All" ? " active" : ""}" data-genre="${g}">${g}</button>`)
  .join("");
$("#genreChips").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  activeGenre = btn.dataset.genre;
  $$(".chip").forEach((c) => c.classList.toggle("active", c === btn));
  render();
});
$("#search").addEventListener("input", (e) => { query = e.target.value.trim().toLowerCase(); render(); });

function render() {
  visible = beats.filter((b) => {
    if (activeGenre !== "All" && b.genre !== activeGenre) return false;
    if (!query) return true;
    return [b.title, b.genre, b.key, String(b.bpm), ...b.tags].join(" ").toLowerCase().includes(query);
  });
  $("#beatList").innerHTML = visible.map((b) => `
    <div class="beat${current && current.id === b.id ? " playing" + (isPlaying ? " is-on" : "") : ""}" role="listitem" data-id="${b.id}">
      <button class="beat-play" aria-label="Play ${b.title}">
        <svg viewBox="0 0 24 24" class="i-play"><path d="M7 4v16l13-8z"/></svg>
        <svg viewBox="0 0 24 24" class="i-pause"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
      </button>
      <div class="beat-cover" style="${coverStyle(b)}">${b.title[0]}</div>
      <div style="min-width:0">
        <div class="beat-title">${b.title}</div>
        <div class="beat-tags"><span class="tag">${b.genre.toLowerCase()}</span>${b.tags.slice(0, 2).map((t) => `<span class="tag">#${t}</span>`).join("")}</div>
      </div>
      <div class="bars" aria-hidden="true">${bars(b.id)}</div>
      <div class="beat-meta">${b.bpm} bpm<br>${b.key}</div>
      <a class="btn btn-chrome beat-buy" href="${b.url}" target="_blank" rel="noopener">Buy <span class="beat-price">$${b.price}</span></a>
    </div>`).join("");
  $("#emptyState").hidden = visible.length > 0;
}

/* ---------- player ---------- */
const audio = $("#audio");
const player = $("#player");
let current = null;
let isPlaying = false;

const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

function syncUI() {
  player.classList.toggle("is-on", isPlaying);
  $("#pPlay").setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  $$(".beat").forEach((el) => {
    const on = current && +el.dataset.id === current.id;
    el.classList.toggle("playing", !!on);
    el.classList.toggle("is-on", !!on && isPlaying);
  });
}

function load(b) {
  current = b;
  audio.src = b.audio;
  $("#pTitle").textContent = b.title;
  $("#pMeta").textContent = `${b.genre.toLowerCase()} · ${b.bpm} bpm · ${b.key}`;
  $("#pBuy").href = b.url;
  $("#pFill").style.width = "0";
  $("#pCur").textContent = "0:00";
  $("#pDur").textContent = "0:00";
  player.hidden = false;
}

function play(b) {
  if (!current || current.id !== b.id) load(b);
  audio.play().then(() => { isPlaying = true; syncUI(); }).catch(() => {
    isPlaying = false; syncUI();
    toast("preview coming soon — listen on BeatStars ✦");
  });
  isPlaying = true;
  syncUI();
}
function pause() { audio.pause(); isPlaying = false; syncUI(); }
function toggle(b) { (current && current.id === b.id && isPlaying) ? pause() : play(b); }
function step(dir) {
  const list = visible.length ? visible : beats;
  const i = current ? list.findIndex((b) => b.id === current.id) : -1;
  play(list[(i + dir + list.length) % list.length]);
}

$("#beatList").addEventListener("click", (e) => {
  if (e.target.closest(".beat-buy")) return;
  const row = e.target.closest(".beat");
  if (row) toggle(beats[+row.dataset.id]);
});
$("#pPlay").addEventListener("click", () => current && toggle(current));
$("#pPrev").addEventListener("click", () => step(-1));
$("#pNext").addEventListener("click", () => step(1));
audio.addEventListener("ended", () => step(1));
audio.addEventListener("error", () => {
  if (!current) return;
  isPlaying = false; syncUI();
  toast("preview coming soon — listen on BeatStars ✦");
});
audio.addEventListener("loadedmetadata", () => { $("#pDur").textContent = fmt(audio.duration); });
audio.addEventListener("timeupdate", () => {
  $("#pCur").textContent = fmt(audio.currentTime);
  if (audio.duration) $("#pFill").style.width = `${(audio.currentTime / audio.duration) * 100}%`;
});
$("#pBar").addEventListener("click", (e) => {
  if (!audio.duration) return;
  const r = e.currentTarget.getBoundingClientRect();
  audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
});
document.addEventListener("keydown", (e) => {
  if (e.code !== "Space" || !current || /INPUT|TEXTAREA|SELECT|BUTTON/.test(document.activeElement.tagName)) return;
  e.preventDefault();
  toggle(current);
});

render();

/* ---------- custom order form ---------- */
const form = $("#orderForm");
const hint = $(".form-hint");
if (!L.email) hint.textContent = L.telegram ? "message is copied — paste it in Telegram" : "message is copied — paste it in BeatStars chat";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const text = `Custom beat request\nArtist: ${d.name}\nContact: ${d.contact}\nStyle: ${d.genre}\nNotes: ${d.msg || "-"}`;
  if (L.email) {
    location.href = `mailto:${L.email}?subject=${encodeURIComponent("Custom beat — " + d.name)}&body=${encodeURIComponent(text)}`;
    return;
  }
  try { await navigator.clipboard.writeText(text); toast("request copied ✦ paste it in the chat"); }
  catch { toast("copy the request and send it to me ✦"); }
  window.open(L.telegram || L.instagram || L.beatstars, "_blank", "noopener");
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
$$(".section-head, .plan, .custom-card, .about, .faq details, .contact, .beat-list").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});
