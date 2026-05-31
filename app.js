// Abundant Grace — front-end logic
(function () {
  const S = window.SITE;
  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const search = document.getElementById("search");
  const filtersEl = document.getElementById("filters");
  const overlay = document.getElementById("overlay");
  const detail = document.getElementById("detail");

  document.getElementById("footer-updated").textContent = "Last updated " + S.lastUpdated + " · updated weekly";

  const sourceName = id => (S.sources.find(s => s.id === id) || {}).name || id;
  const fmtDate = d => {
    const [y, m, day] = d.split("-").map(Number);
    return new Date(y, m - 1, day).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  // Build theme filter chips
  const allThemes = [...new Set(S.sermons.flatMap(s => s.themes))].sort();
  let activeTheme = null;
  const makeChip = (label, theme) => {
    const c = document.createElement("button");
    c.className = "chip" + (theme === activeTheme ? " active" : "");
    c.textContent = label;
    c.onclick = () => { activeTheme = (activeTheme === theme) ? null : theme; renderChips(); render(); };
    return c;
  };
  function renderChips() {
    filtersEl.innerHTML = "";
    filtersEl.appendChild(makeChip("All", null));
    allThemes.forEach(t => filtersEl.appendChild(makeChip(t, t)));
  }

  function matches(s, q) {
    if (activeTheme && !s.themes.includes(activeTheme)) return false;
    if (!q) return true;
    const hay = [s.title, s.core, s.series, sourceName(s.source),
      ...s.themes, ...s.points, ...s.apply, ...s.verses.map(v => v.ref + " " + v.text)]
      .join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function render() {
    const q = search.value.trim();
    const list = S.sermons.filter(s => matches(s, q));
    grid.innerHTML = "";
    empty.style.display = list.length ? "none" : "block";
    list.forEach(s => {
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = () => openDetail(s);
      card.innerHTML = `
        <div class="meta">${fmtDate(s.date)}${s.series ? " · " + s.series : ""}</div>
        <h3>${s.title}</h3>
        <div class="core">${s.core}</div>
        <div class="tags">${s.themes.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="card-foot">
          <span class="src">${sourceName(s.source)}</span>
          <a class="post-link" href="${s.watch}" target="_blank" rel="noopener">View post ↗</a>
        </div>`;
      const link = card.querySelector(".post-link");
      if (link) link.onclick = e => e.stopPropagation();
      grid.appendChild(card);
    });
  }

  function openDetail(s) {
    detail.innerHTML = `
      <div class="detail-head">
        <button class="close-btn" id="closeBtn" aria-label="Close">×</button>
        <div class="meta">${fmtDate(s.date)}${s.series ? " · " + s.series : ""}</div>
        <h2>${s.title}</h2>
        <div class="src">${sourceName(s.source)} · <a href="${s.watch}" target="_blank" rel="noopener">watch the full message ↗</a></div>
      </div>
      <div class="detail-body">
        <section><h4>Core Message</h4><p class="core-text">${s.core}</p></section>
        ${s.background ? `<section><h4>Background &amp; Context</h4><p>${s.background}</p></section>` : ""}
        <section><h4>Key Points</h4><ul>${s.points.map(p => `<li>${p}</li>`).join("")}</ul></section>
        ${s.deepDive && s.deepDive.length ? `<section><h4>Going Deeper</h4>${s.deepDive.map(p => `<p>${p}</p>`).join("")}</section>` : ""}
        <section><h4>Bible Verses</h4>${s.verses.map(v => `
          <div class="verse-card"><div class="ref">${v.ref}</div><div class="txt">${v.text}</div>${v.note ? `<div class="vnote">${v.note}</div>` : ""}</div>`).join("")}</section>
        <section><h4>Apply It This Week</h4><ul>${s.apply.map(a => `<li>${a}</li>`).join("")}</ul></section>
        ${s.reflect && s.reflect.length ? `<section><h4>Questions to Reflect On</h4><ul class="reflect">${s.reflect.map(r => `<li>${r}</li>`).join("")}</ul></section>` : ""}
        <section><div class="practice"><strong>Practice</strong>${s.practice}</div></section>
        <section style="text-align:center;"><a class="watch-link" href="${s.watch}" target="_blank" rel="noopener">▶ Watch / View the Full Sermon</a></section>
      </div>`;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    document.getElementById("closeBtn").onclick = closeDetail;
  }

  function closeDetail() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
  overlay.onclick = e => { if (e.target === overlay) closeDetail(); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDetail(); });
  search.addEventListener("input", render);

  renderChips();
  render();
})();
