/* home.js — home page: live search with suggestions, featured content, animated counters */
(function () {
  "use strict";
  var W = window.WD;
  var dests = W.get("destinations"), pkgs = W.get("packages").filter(function (p) { return p.active !== false; });
  var pop = dests.filter(function (d) { return d.popular; }); if (pop.length < 3) pop = dests.slice(0, 3);
  W.$("#home-dests").innerHTML = pop.slice(0, 3).map(W.cards.destination).join("");
  var feat = pkgs.filter(function (p) { return p.featured; }); if (feat.length < 3) feat = pkgs;
  W.$("#home-pkgs").innerHTML = feat.slice(0, 3).map(W.cards.package).join("");
  W.favs && W.favs.refresh();

  var input = W.$("#home-search"), box = W.$("#search-suggest"), form = W.$("#search-form");
  function matches(t) {
    t = t.toLowerCase(); if (!t) return [];
    var r = [];
    dests.forEach(function (d) { if ((d.name + " " + d.category + " " + d.places.join(" ")).toLowerCase().indexOf(t) > -1) r.push({ type: "Destination", name: d.name, sub: d.category + " · " + d.days, href: "destination-details.html#" + d.id }); });
    pkgs.forEach(function (p) { if ((p.name + " " + p.route + " " + p.category).toLowerCase().indexOf(t) > -1) r.push({ type: "Package", name: p.name, sub: W.fmt(p.price) + " · " + p.days + " days", href: "package-details.html#" + p.id }); });
    window.WD_SEED.hotels.forEach(function (h) { if ((h.name + " " + h.city).toLowerCase().indexOf(t) > -1) r.push({ type: "Hotel", name: h.name, sub: h.city + " · from " + W.fmt(h.price), href: "hotels.html?q=" + encodeURIComponent(h.city) }); });
    return r.slice(0, 7);
  }
  function suggest() {
    var r = matches(input.value.trim());
    if (!input.value.trim()) { box.hidden = true; return; }
    box.innerHTML = r.length ? r.map(function (x) { return '<a href="' + x.href + '"><span class="sg-type">' + x.type + "</span><strong>" + W.esc(x.name) + '</strong><span class="small">' + W.esc(x.sub) + "</span></a>"; }).join("") : '<div class="sg-none">No matches — try “beach”, “Goa” or “mountain”.</div>';
    box.hidden = false;
  }
  input.addEventListener("input", W.debounce(suggest, 120));
  document.addEventListener("click", function (e) { if (!form.contains(e.target)) box.hidden = true; });
  form.addEventListener("submit", function (e) {
    e.preventDefault(); var t = input.value.trim(); if (!t) { input.focus(); return; }
    var r = matches(t); location.href = r.length === 1 ? r[0].href : "destinations.html?q=" + encodeURIComponent(t);
  });

  var stats = { "s-dest": dests.length, "s-pkg": pkgs.length, "s-book": W.get("bookings").length + 1200, "s-hotel": window.WD_SEED.hotels.length };
  Object.keys(stats).forEach(function (id) {
    var el = W.$("#" + id); if (!el) return; var end = stats[id], n = 0, step = Math.max(1, Math.ceil(end / 40));
    var t = setInterval(function () { n = Math.min(end, n + step); el.textContent = n.toLocaleString("en-IN") + (id === "s-book" ? "+" : ""); if (n >= end) clearInterval(t); }, 25);
  });
})();
