/* admin-catalog.js — admin Package + Destination management (add / edit / delete / activate) */
(function () {
  "use strict";
  var W = window.WD, page = document.body.getAttribute("data-page"); if (!W.me() || W.me().role !== "admin") return;
  var lines = function (s) { return s.split("\n").map(function (x) { return x.trim(); }).filter(Boolean); };
  var field = function (id, label, input, cls) { return '<div class="form-group ' + (cls || "") + '"><label for="' + id + '">' + label + "</label>" + input + "</div>"; };

  /* ================= PACKAGES ================= */
  if (page === "admin-packages") {
    var tbody = W.$("#p-body");
    var render = function () {
      var t = W.$("#p-q").value.trim().toLowerCase(), l = W.get("packages").filter(function (p) { return !t || (p.name + p.route + p.category).toLowerCase().indexOf(t) > -1; });
      W.$("#p-count").textContent = l.length + " package" + (l.length === 1 ? "" : "s");
      tbody.innerHTML = l.length ? l.map(function (p) {
        return '<tr><td><img class="thumb" src="' + W.esc(p.img) + '" alt=""></td><td><strong>' + W.esc(p.name) + '</strong><br><span class="small">' + W.esc(p.route) + "</span></td><td>" + W.esc(p.category) + "</td><td>" + p.days + "D / " + p.nights + "N</td><td>" + W.fmt(p.price) + "</td><td>" + (p.featured ? "★" : "–") + '</td><td><label class="switch"><input type="checkbox" data-tog="' + W.esc(p.id) + '"' + (p.active !== false ? " checked" : "") + '><span></span></label></td><td class="actions"><button class="mini" data-edit="' + W.esc(p.id) + '">Edit</button><button class="mini no" data-del="' + W.esc(p.id) + '">Delete</button></td></tr>';
      }).join("") : '<tr><td colspan="8" class="empty-cell">No packages.</td></tr>';
    };
    var form = function (p) {
      p = p || { itinerary: [], includes: [], notes: [], destinations: [], active: true };
      var body = W.modal(p.id ? "Edit package" : "Add package",
        '<form id="pf" novalidate>' + field("f-name", "Package name *", '<input id="f-name" value="' + W.esc(p.name || "") + '">') +
        '<div class="form-row">' + field("f-cat", "Category *", '<input id="f-cat" value="' + W.esc(p.category || "") + '" placeholder="Heritage, Beach…">') + field("f-price", "Price per person (₹) *", '<input id="f-price" type="number" min="1000" value="' + (p.price || "") + '">') + "</div>" +
        '<div class="form-row">' + field("f-days", "Days *", '<input id="f-days" type="number" min="1" max="30" value="' + (p.days || "") + '">') + field("f-nights", "Nights *", '<input id="f-nights" type="number" min="0" max="30" value="' + (p.nights == null ? "" : p.nights) + '">') + "</div>" +
        field("f-img", "Image URL *", '<input id="f-img" value="' + W.esc(p.img || "") + '" placeholder="https://…">') + field("f-route", "Route *", '<input id="f-route" value="' + W.esc(p.route || "") + '" placeholder="City → City → City">') +
        field("f-short", "Short description *", '<input id="f-short" value="' + W.esc(p.short || "") + '">') + field("f-about", "About this package", '<textarea id="f-about">' + W.esc(p.about || "") + "</textarea>") +
        field("f-dest", "Linked destination ids (comma separated)", '<input id="f-dest" value="' + W.esc((p.destinations || []).join(", ")) + '" placeholder="goa, jaipur">') +
        field("f-itin", "Itinerary — one day per line, format “Day 1 — Title: details”", "<textarea id=\"f-itin\">" + W.esc((p.itinerary || []).map(function (d) { return d.day + ": " + d.text; }).join("\n")) + "</textarea>") +
        '<div class="form-row">' + field("f-inc", "Includes (one per line)", '<textarea id="f-inc">' + W.esc((p.includes || []).join("\n")) + "</textarea>") + field("f-notes", "Notes (one per line)", '<textarea id="f-notes">' + W.esc((p.notes || []).join("\n")) + "</textarea>") + "</div>" +
        '<div class="form-group"><label class="inline"><input type="checkbox" id="f-feat"' + (p.featured ? " checked" : "") + '> Featured on home page</label><label class="inline"><input type="checkbox" id="f-act"' + (p.active !== false ? " checked" : "") + '> Active (visible to users)</label></div><div class="button-row"><button class="btn" type="submit">' + (p.id ? "Save changes" : "Add package") + "</button></div></form>", true);
      var f = W.$("#pf", body);
      f.onsubmit = function (e) {
        e.preventDefault(); var v = function (i) { return W.$("#" + i, f).value.trim(); };
        if (!W.validate(f, { "f-name": [function (s) { return s.length >= 3; }, "Name is required (3+ characters)."], "f-cat": [W.v.req, "Category is required."], "f-price": [function (s) { return +s >= 1000; }, "Price must be at least ₹1,000."], "f-days": [function (s) { return +s >= 1; }, "Enter number of days."], "f-nights": [function (s) { return s !== "" && +s >= 0; }, "Enter number of nights."], "f-img": [function (s) { return /^https?:\/\//.test(s); }, "Enter a full image URL starting with http(s)://"], "f-route": [W.v.req, "Route is required."], "f-short": [W.v.req, "Short description is required."] })) return;
        var l = W.get("packages"), id = p.id || W.slug(v("f-name"));
        if (!p.id && l.some(function (x) { return x.id === id; })) return W.setErr(W.$("#f-name", f), "A package with this name already exists.");
        var itin = lines(W.$("#f-itin", f).value).map(function (ln, i) { var k = ln.indexOf(":"); return k > -1 ? { day: ln.slice(0, k).trim(), text: ln.slice(k + 1).trim() } : { day: "Day " + (i + 1), text: ln }; });
        var obj = { id: id, name: v("f-name"), category: v("f-cat"), price: +v("f-price"), days: +v("f-days"), nights: +v("f-nights"), img: v("f-img"), route: v("f-route"), short: v("f-short"), about: v("f-about"), destinations: v("f-dest").split(",").map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean), itinerary: itin, includes: lines(W.$("#f-inc", f).value), notes: lines(W.$("#f-notes", f).value), featured: W.$("#f-feat", f).checked, active: W.$("#f-act", f).checked };
        if (p.id) l = l.map(function (x) { return x.id === p.id ? obj : x; }); else l.push(obj);
        W.set("packages", l); W.closeModal(); W.toast(p.id ? "Package updated." : "Package added."); render();
      };
    };
    W.$("#p-add").onclick = function () { form(); };
    W.$("#p-q").addEventListener("input", W.debounce(render, 150));
    tbody.addEventListener("click", function (e) {
      var ed = e.target.closest("[data-edit]"), de = e.target.closest("[data-del]");
      if (ed) form(W.pkg(ed.getAttribute("data-edit")));
      if (de && confirm("Delete this package? Existing bookings keep their saved details.")) { W.set("packages", W.get("packages").filter(function (x) { return x.id !== de.getAttribute("data-del"); })); W.toast("Package deleted."); render(); }
    });
    tbody.addEventListener("change", function (e) {
      var t = e.target.closest("[data-tog]"); if (!t) return; var l = W.get("packages"), p = l.find(function (x) { return x.id === t.getAttribute("data-tog"); }); p.active = t.checked; W.set("packages", l); W.toast(p.name + (p.active ? " is now visible." : " is hidden from users."));
    });
    render();
  }

  /* ================= DESTINATIONS ================= */
  if (page === "admin-destinations") {
    var tb = W.$("#d-body");
    var draw = function () {
      var t = W.$("#d-q").value.trim().toLowerCase(), l = W.get("destinations").filter(function (d) { return !t || (d.name + d.category + d.region).toLowerCase().indexOf(t) > -1; });
      W.$("#d-count").textContent = l.length + " destination" + (l.length === 1 ? "" : "s");
      tb.innerHTML = l.length ? l.map(function (d) {
        return '<tr><td><img class="thumb" src="' + W.esc(d.img) + '" alt=""></td><td><strong>' + W.esc(d.name) + '</strong><br><span class="small">' + W.esc(d.short) + "</span></td><td>" + W.esc(d.category) + "</td><td>" + W.esc(d.region) + "</td><td>" + W.esc(d.days) + "</td><td>" + (d.popular ? "★" : "–") + '</td><td class="actions"><button class="mini" data-edit="' + W.esc(d.id) + '">Edit</button><button class="mini no" data-del="' + W.esc(d.id) + '">Delete</button></td></tr>';
      }).join("") : '<tr><td colspan="7" class="empty-cell">No destinations.</td></tr>';
    };
    var dform = function (d) {
      d = d || { places: [] };
      var body = W.modal(d.id ? "Edit destination" : "Add destination",
        '<form id="df" novalidate>' + field("f-name", "Name *", '<input id="f-name" value="' + W.esc(d.name || "") + '">') +
        '<div class="form-row">' + field("f-cat", "Category *", '<input id="f-cat" value="' + W.esc(d.category || "") + '">') + field("f-region", "Region *", '<select id="f-region">' + ["North", "South", "East", "West", "Central", "North-East"].map(function (r) { return "<option" + (d.region === r ? " selected" : "") + ">" + r + "</option>"; }).join("") + "</select>") + "</div>" +
        '<div class="form-row">' + field("f-min", "Min days *", '<input id="f-min" type="number" min="1" value="' + (d.minDays || "") + '">') + field("f-max", "Max days *", '<input id="f-max" type="number" min="1" value="' + (d.maxDays || "") + '">') + "</div>" +
        field("f-img", "Image URL *", '<input id="f-img" value="' + W.esc(d.img || "") + '">') + field("f-short", "Short description *", '<input id="f-short" value="' + W.esc(d.short || "") + '">') + field("f-about", "About", '<textarea id="f-about">' + W.esc(d.about || "") + "</textarea>") +
        '<div class="form-row">' + field("f-best", "Best for", '<input id="f-best" value="' + W.esc(d.bestFor || "") + '">') + field("f-season", "Best season", '<input id="f-season" value="' + W.esc(d.season || "") + '">') + "</div>" +
        field("f-places", "Places to include (one per line)", '<textarea id="f-places">' + W.esc((d.places || []).join("\n")) + "</textarea>") + field("f-tip", "Local tip", '<textarea id="f-tip">' + W.esc(d.tip || "") + "</textarea>") +
        '<div class="form-group"><label class="inline"><input type="checkbox" id="f-pop"' + (d.popular ? " checked" : "") + '> Show as popular on home page</label></div><div class="button-row"><button class="btn" type="submit">' + (d.id ? "Save changes" : "Add destination") + "</button></div></form>", true);
      var f = W.$("#df", body);
      f.onsubmit = function (e) {
        e.preventDefault(); var v = function (i) { return W.$("#" + i, f).value.trim(); };
        if (!W.validate(f, { "f-name": [function (s) { return s.length >= 2; }, "Name is required."], "f-cat": [W.v.req, "Category is required."], "f-min": [function (s) { return +s >= 1; }, "Enter min days."], "f-max": [function (s) { return +s >= +W.$("#f-min", f).value; }, "Max days must be ≥ min days."], "f-img": [function (s) { return /^https?:\/\//.test(s); }, "Enter a full image URL."], "f-short": [W.v.req, "Short description is required."] })) return;
        var l = W.get("destinations"), id = d.id || W.slug(v("f-name"));
        if (!d.id && l.some(function (x) { return x.id === id; })) return W.setErr(W.$("#f-name", f), "This destination already exists.");
        var o = { id: id, name: v("f-name"), category: v("f-cat"), region: v("f-region"), minDays: +v("f-min"), maxDays: +v("f-max"), days: +v("f-min") === +v("f-max") ? v("f-min") + " days" : v("f-min") + "–" + v("f-max") + " days", img: v("f-img"), short: v("f-short"), about: v("f-about"), bestFor: v("f-best"), style: "Flexible itinerary", season: v("f-season"), places: lines(W.$("#f-places", f).value), tip: v("f-tip"), popular: W.$("#f-pop", f).checked };
        if (d.id) l = l.map(function (x) { return x.id === d.id ? o : x; }); else l.push(o);
        W.set("destinations", l); W.closeModal(); W.toast(d.id ? "Destination updated." : "Destination added."); draw();
      };
    };
    W.$("#d-add").onclick = function () { dform(); }; W.$("#d-q").addEventListener("input", W.debounce(draw, 150));
    tb.addEventListener("click", function (e) {
      var ed = e.target.closest("[data-edit]"), de = e.target.closest("[data-del]");
      if (ed) dform(W.dest(ed.getAttribute("data-edit")));
      if (de && confirm("Delete this destination? It will also disappear from users' favourites lists.")) { var id = de.getAttribute("data-del"); W.set("destinations", W.get("destinations").filter(function (x) { return x.id !== id; })); W.toast("Destination deleted."); draw(); }
    });
    draw();
  }
})();
