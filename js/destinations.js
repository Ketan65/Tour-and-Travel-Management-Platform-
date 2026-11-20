(function () {
  "use strict";
  var W = window.WD, page = document.body.getAttribute("data-page");

  /* ---------- destinations.html ---------- */
  if (page === "destinations") {
    var all = W.get("destinations"), grid = W.$("#dest-grid"), q = W.params();
    var cats = all.map(function (d) { return d.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; }).sort();
    W.$("#f-cat").innerHTML = '<option value="">All categories</option>' + cats.map(function (c) { return "<option>" + W.esc(c) + "</option>"; }).join("");
    if (q.get("q")) W.$("#f-q").value = q.get("q");
    if (q.get("cat")) W.$("#f-cat").value = q.get("cat");
    function apply() {
      var t = W.$("#f-q").value.trim().toLowerCase(), c = W.$("#f-cat").value, r = W.$("#f-region").value, d = W.$("#f-dur").value, s = W.$("#f-sort").value;
      var out = all.filter(function (x) {
        var hay = (x.name + " " + x.category + " " + x.short + " " + x.bestFor + " " + x.places.join(" ")).toLowerCase();
        return (!t || hay.indexOf(t) > -1) && (!c || x.category === c) && (!r || x.region === r) &&
          (!d || (d === "short" && x.maxDays <= 3) || (d === "medium" && x.maxDays >= 4 && x.maxDays <= 6) || (d === "long" && x.maxDays >= 7));
      });
      out.sort(function (a, b) { return s === "name" ? a.name.localeCompare(b.name) : s === "short" ? a.minDays - b.minDays : s === "long" ? b.maxDays - a.maxDays : (b.popular ? 1 : 0) - (a.popular ? 1 : 0); });
      W.$("#f-count").textContent = out.length + " of " + all.length + " destinations";
      grid.innerHTML = out.length ? out.map(W.cards.destination).join("") : '<div class="empty"><h3>No destinations match</h3><p>Try a different keyword or clear the filters.</p><button class="btn" id="f-clear2" type="button">Clear filters</button></div>';
      var c2 = W.$("#f-clear2"); if (c2) c2.onclick = reset;
      W.favs && W.favs.refresh();
    }
    function reset() { W.$("#f-q").value = ""; ["f-cat", "f-region", "f-dur"].forEach(function (i) { W.$("#" + i).value = ""; }); W.$("#f-sort").value = "popular"; apply(); }
    W.$("#f-q").addEventListener("input", W.debounce(apply, 150));
    ["f-cat", "f-region", "f-dur", "f-sort"].forEach(function (i) { W.$("#" + i).addEventListener("change", apply); });
    W.$("#f-clear").onclick = reset; W.$("#filter-form").addEventListener("submit", function (e) { e.preventDefault(); apply(); });
    apply();
  }

  /* ---------- destination-details.html ---------- */
  if (page === "destination-details") {
    var list = W.get("destinations"), host = W.$("#guide"), tabs = W.$("#guide-tabs");
    function show() {
      var id = location.hash.slice(1), d = list.find(function (x) { return x.id === id; }) || list[0];
      if (!d) { host.innerHTML = '<div class="empty"><h3>No destinations available</h3></div>'; return; }
      tabs.innerHTML = list.map(function (x) { return '<a class="chip' + (x.id === d.id ? " on" : "") + '" href="#' + W.esc(x.id) + '">' + W.esc(x.name) + "</a>"; }).join("");
      var pk = W.get("packages").filter(function (p) { return p.active !== false && (p.destinations || []).indexOf(d.id) > -1; });
      document.title = d.name + " Guide | Wanderly";
      host.innerHTML =
        '<section class="detail-section"><div class="detail-hero"><div class="card-media" style="flex:1 1 400px"><img style="height:100%;min-height:280px" src="' + W.esc(d.img) + '" alt="' + W.esc(d.name) + '"></div><div class="detail-copy"><div class="breadcrumb"><a href="destinations.html">Destinations</a> / ' + W.esc(d.name) + "</div><h2>" + W.esc(d.name) + "</h2><p>" + W.esc(d.short) + '</p><div class="info-grid"><div class="info-item"><strong>Suggested stay</strong><span>' + W.esc(d.days) + '</span></div><div class="info-item"><strong>Best for</strong><span>' + W.esc(d.bestFor) + '</span></div><div class="info-item"><strong>Best season</strong><span>' + W.esc(d.season || "Year-round") + '</span></div></div><div class="button-row"><a class="btn" href="packages.html?q=' + encodeURIComponent(d.name) + '">Find a Package</a><a class="btn btn-secondary" href="booking.html">Plan / Book</a><button type="button" class="btn btn-secondary fav-btn fav-inline" data-fav="' + W.esc(d.id) + '">&#9825; Save</button></div></div></div>' +
        '<div class="split section"><div class="content-box"><h3>About ' + W.esc(d.name) + "</h3><p>" + W.esc(d.about) + '</p></div><div class="content-box"><h3>Places to include</h3><ul class="clean-list">' + d.places.map(function (p) { return "<li>" + W.esc(p) + "</li>"; }).join("") + '</ul></div></div><div class="note-box"><strong>Local tip:</strong> ' + W.esc(d.tip) + "</div>" +
        '<div class="section"><h2>Packages covering ' + W.esc(d.name) + "</h2>" + (pk.length ? '<div class="card-grid">' + pk.map(W.cards.package).join("") + "</div>" : '<div class="content-box"><p>No ready-made package for ' + W.esc(d.name) + ' yet. <a href="enquiry.html">Request a custom plan</a> and our team will build one.</p></div>') + "</div></section>";
      W.favs && W.favs.refresh();
      if (!document.body.getAttribute("data-scrolled")) document.body.setAttribute("data-scrolled", "1"); else window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.addEventListener("hashchange", show); show();
  }
})();
