///(function () {
  "use strict";
  var W = window.WD, page = document.body.getAttribute("data-page");
  var active = function () { return W.get("packages").filter(function (p) { return p.active !== false; }); };

  if (page === "packages") {
    var all = active(), grid = W.$("#pkg-grid"), q = W.params();
    var cats = all.map(function (p) { return p.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; }).sort();
    W.$("#f-cat").innerHTML = '<option value="">All categories</option>' + cats.map(function (c) { return "<option>" + W.esc(c) + "</option>"; }).join("");
    var max = Math.max.apply(null, all.map(function (p) { return p.price; }).concat([10000])), min = Math.min.apply(null, all.map(function (p) { return p.price; }).concat([max]));
    var range = W.$("#f-price"); range.min = Math.floor(min / 1000) * 1000; range.max = Math.ceil(max / 1000) * 1000; range.value = range.max;
    if (q.get("q")) W.$("#f-q").value = q.get("q");
    if (q.get("cat")) W.$("#f-cat").value = q.get("cat");
    function apply() {
      var t = W.$("#f-q").value.trim().toLowerCase(), c = W.$("#f-cat").value, d = W.$("#f-dur").value, s = W.$("#f-sort").value, pm = +range.value;
      W.$("#f-price-val").textContent = W.fmt(pm);
      var out = all.filter(function (p) {
        var hay = (p.name + " " + p.route + " " + p.category + " " + p.short + " " + (p.destinations || []).join(" ")).toLowerCase();
        return (!t || hay.indexOf(t) > -1) && (!c || p.category === c) && p.price <= pm &&
          (!d || (d === "short" && p.days <= 4) || (d === "mid" && p.days >= 5 && p.days <= 6) || (d === "long" && p.days >= 7));
      });
      out.sort(function (a, b) { return s === "low" ? a.price - b.price : s === "high" ? b.price - a.price : s === "days" ? a.days - b.days : (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
      W.$("#f-count").textContent = out.length + " of " + all.length + " packages";
      grid.innerHTML = out.length ? out.map(W.cards.package).join("") : '<div class="empty"><h3>No packages match</h3><p>Try a higher budget or clear the filters.</p><button class="btn" id="f-clear2" type="button">Clear filters</button></div>';
      var c2 = W.$("#f-clear2"); if (c2) c2.onclick = reset;
    }
    function reset() { W.$("#f-q").value = ""; W.$("#f-cat").value = ""; W.$("#f-dur").value = ""; W.$("#f-sort").value = "featured"; range.value = range.max; apply(); }
    W.$("#f-q").addEventListener("input", W.debounce(apply, 150));
    ["f-cat", "f-dur", "f-sort"].forEach(function (i) { W.$("#" + i).addEventListener("change", apply); });
    range.addEventListener("input", apply); W.$("#f-clear").onclick = reset; W.$("#filter-form").addEventListener("submit", function (e) { e.preventDefault(); apply(); });
    apply();
  }

  if (page === "package-details") {
    var list = active(), host = W.$("#pkg-detail"), tabs = W.$("#pkg-tabs");
    function show() {
      var id = location.hash.slice(1), p = list.find(function (x) { return x.id === id; }) || list[0];
      if (!p) { host.innerHTML = '<div class="empty"><h3>No packages available</h3><a class="btn" href="packages.html">Back to Packages</a></div>'; return; }
      document.title = p.name + " | Wanderly";
      tabs.innerHTML = list.map(function (x) { return '<a class="chip' + (x.id === p.id ? " on" : "") + '" href="#' + W.esc(x.id) + '">' + W.esc(x.name) + "</a>"; }).join("");
      var dests = (p.destinations || []).map(W.dest).filter(Boolean);
      host.innerHTML =
        '<section class="section"><div class="detail-hero"><img src="' + W.esc(p.img) + '" alt="' + W.esc(p.name) + '"><div class="detail-copy"><div class="breadcrumb"><a href="packages.html">Packages</a> / ' + W.esc(p.name) + "</div><h2>" + W.esc(p.name) + "</h2><p>" + p.days + " Days / " + p.nights + " Nights · " + W.esc(p.category) + " · <strong>" + W.esc(p.route) + '</strong></p><div class="price">' + W.fmt(p.price) + ' <span class="small">per person</span></div><div class="button-row"><a class="btn" href="booking.html#' + W.esc(p.id) + '">Book This Package</a><a class="btn btn-secondary" href="enquiry.html?service=custom&destination=' + encodeURIComponent(p.name) + '">Ask a Question</a></div></div></div>' +
        '<div class="section content-box"><h2>About this package</h2><p>' + W.esc(p.about) + "</p>" + (dests.length ? '<p class="small">Destination guides: ' + dests.map(function (d) { return '<a href="destination-details.html#' + W.esc(d.id) + '">' + W.esc(d.name) + "</a>"; }).join(" · ") + "</p>" : "") + "</div>" +
        '<div class="section"><h2>Day-wise schedule</h2><div class="itinerary">' + (p.itinerary || []).map(function (d) { return '<div class="day-card"><strong>' + W.esc(d.day) + "</strong>: " + W.esc(d.text) + "</div>"; }).join("") + "</div></div>" +
        '<div class="section check-grid"><div class="content-box"><h3>Package includes</h3><ul class="check-list">' + (p.includes || []).map(function (i) { return "<li>" + W.esc(i) + "</li>"; }).join("") + '</ul></div><div class="content-box"><h3>Package notes</h3><ul class="check-list">' + (p.notes || []).map(function (i) { return "<li>" + W.esc(i) + "</li>"; }).join("") + "</ul></div></div>" +
        '<div class="section cta"><h2>Ready to request this trip?</h2><p>Go to the booking form, select your preferred date and traveller details, then submit the request.</p><div class="button-row"><a class="btn btn-secondary" href="booking.html#' + W.esc(p.id) + '">Open Booking Form</a><a class="btn btn-secondary" href="packages.html">Back to Packages</a></div></div></section>';
    }
    window.addEventListener("hashchange", function () { show(); window.scrollTo({ top: 0, behavior: "smooth" }); }); show();
  }
})();
