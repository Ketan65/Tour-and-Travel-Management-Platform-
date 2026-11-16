///(function () {
  "use strict";
  var W = (window.WD = {});
  var K = (W.KEYS = {
    users: "wd_users", bookings: "wd_bookings", packages: "wd_packages", destinations: "wd_destinations",
    enquiries: "wd_enquiries", messages: "wd_messages", favs: "wd_favourites", session: "wd_session", seeded: "wd_seeded_v1"
  });
  W.root = document.body.getAttribute("data-root") || "";

  /* ---------- storage ---------- */
  W.read = function (k, fb) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } };
  W.write = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { W.toast("Browser storage is blocked or full.", "error"); return false; } };
  W.get = function (name) { return W.read(K[name], name === "favs" ? {} : []); };
  W.set = function (name, v) { return W.write(K[name], v); };

  /* demo-only hash (NOT real security) */
  W.hash = function (s) { var h = 5381; s = "wd$" + s; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return "h" + (h >>> 0).toString(36); };

  /* ---------- formatting ---------- */
  W.fmt = function (n) { return "\u20B9" + Number(n || 0).toLocaleString("en-IN"); };
  W.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  W.date = function (d) { if (!d) return "-"; var x = new Date(d.length === 10 ? d + "T00:00:00" : d); return isNaN(x) ? d : x.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }); };
  W.today = function () { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  W.params = function () { return new URLSearchParams(location.search); };
  W.slug = function (s) { return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); };
  W.$ = function (s, r) { return (r || document).querySelector(s); };
  W.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  W.debounce = function (fn, ms) { var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms || 200); }; };
  W.badge = function (s) { return '<span class="badge badge-' + W.esc(String(s).toLowerCase()) + '">' + W.esc(s) + "</span>"; };

  /* ---------- lookups ---------- */
  W.pkg = function (id) { return W.get("packages").find(function (p) { return p.id === id; }); };
  W.dest = function (id) { return W.get("destinations").find(function (d) { return d.id === id; }); };
  W.user = function (id) { return W.get("users").find(function (u) { return u.id === id; }); };
  W.opt = function (list, id) { return window.WD_SEED[list].find(function (o) { return o.id === id; }); };

  /* ---------- booking builder (shared by booking page, seed and admin) ---------- */
  W.price = function (pkg, travellers, room, transport, addons) {
    var r = W.opt("rooms", room), t = W.opt("transports", transport);
    var a = (addons || []).reduce(function (s, id) { var o = W.opt("addons", id); return s + (o ? o.price : 0); }, 0);
    var b = { package: pkg.price * travellers, room: (r ? r.price : 0) * pkg.nights, transport: (t ? t.price : 0) * travellers, addons: a };
    b.total = b.package + b.room + b.transport + b.addons;
    return b;
  };
  W.nextBookingId = function () {
    var max = 1023;
    W.get("bookings").forEach(function (b) { var n = parseInt(String(b.bookingId).replace(/\D/g, ""), 10); if (n > max) max = n; });
    return "WDR" + (max + 1);
  };
  W.buildBooking = function (s) {
    var pkg = W.pkg(s.packageId) || { name: "Custom package", price: 0, nights: 0, route: "" };
    var u = W.user(s.userId) || {};
    var br = W.price(pkg, s.travellers, s.room, s.transport, s.addons);
    return {
      bookingId: s.bookingId || W.nextBookingId(), userId: s.userId,
      userName: s.userName || u.name || "", email: s.email || u.email || "", phone: s.phone || u.phone || "", city: s.city || u.city || "",
      packageId: s.packageId, packageName: pkg.name, destination: pkg.route, nights: pkg.nights,
      travelDate: s.travelDate, travellers: s.travellers, room: s.room, transport: s.transport, addons: s.addons || [],
      breakdown: br, totalAmount: br.total, status: s.status || "Pending", createdAt: s.createdAt || new Date().toISOString()
    };
  };

  /* ---------- seed (first visit only) ---------- */
  W.seed = function (force) {
    if (!force && localStorage.getItem(K.seeded)) return;
    var S = window.WD_SEED; if (!S) return;
    W.write(K.destinations, S.destinations);
    W.write(K.packages, S.packages);
    W.write(K.users, S.users.map(function (u) { var x = Object.assign({}, u); x.pass = W.hash(u.password); delete x.password; return x; }));
    W.write(K.bookings, S.bookings.map(W.buildBooking));
    W.write(K.enquiries, S.enquiries); W.write(K.messages, S.messages); W.write(K.favs, S.favourites);
    localStorage.setItem(K.seeded, "1");
  };
  W.seed();

  /* ---------- session ---------- */
  W.session = function () { try { var s = sessionStorage.getItem(K.session) || localStorage.getItem(K.session); return s ? JSON.parse(s) : null; } catch (e) { return null; } };
  W.me = function () { var s = W.session(); return s ? W.user(s.id) || null : null; };
  W.login = function (u, remember) {
    var s = JSON.stringify({ id: u.id, role: u.role, at: Date.now() });
    sessionStorage.removeItem(K.session); localStorage.removeItem(K.session);
    (remember ? localStorage : sessionStorage).setItem(K.session, s);
  };
  W.logout = function () { sessionStorage.removeItem(K.session); localStorage.removeItem(K.session); location.href = W.root + "index.html"; };
  W.safeNext = function (n) { return n && /^[\w\-\/]+\.html(\?[\w=&%.\-]*)?(#[\w-]*)?$/.test(n) ? n : ""; };
  W.requireRole = function (role) {
    var u = W.me();
    if (!u) { location.replace(W.root + "login.html?next=" + encodeURIComponent(location.pathname.split("/").pop() + location.search + location.hash)); return null; }
    if (role === "admin" && u.role !== "admin") { location.replace(W.root + "login.html?role=admin&denied=1"); return null; }
    return u;
  };
  var guard = document.body.getAttribute("data-auth");
  if (guard) W.requireRole(guard);

  /* ---------- toast / modal ---------- */
  W.toast = function (msg, type) {
    var box = W.$("#toasts"); if (!box) { box = document.createElement("div"); box.id = "toasts"; document.body.appendChild(box); }
    var t = document.createElement("div"); t.className = "toast " + (type || "ok"); t.textContent = msg; box.appendChild(t);
    setTimeout(function () { t.classList.add("hide"); setTimeout(function () { t.remove(); }, 300); }, 3200);
  };
  W.modal = function (title, html, wide) {
    W.closeModal();
    var m = document.createElement("div"); m.className = "modal-back"; m.id = "wd-modal";
    m.innerHTML = '<div class="modal' + (wide ? " modal-wide" : "") + '" role="dialog" aria-modal="true"><div class="modal-head"><h2>' + W.esc(title) + '</h2><button class="modal-x" aria-label="Close">&times;</button></div><div class="modal-body">' + html + "</div></div>";
    document.body.appendChild(m);
    m.addEventListener("click", function (e) { if (e.target === m || e.target.classList.contains("modal-x")) W.closeModal(); });
    return m.querySelector(".modal-body");
  };
  W.closeModal = function () { var m = W.$("#wd-modal"); if (m) m.remove(); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") W.closeModal(); });

  /* ---------- form validation ---------- */
  W.v = {
    email: function (s) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s); },
    phone: function (s) { return /^\+?\d{10,13}$/.test(s.replace(/[\s-]/g, "")); },
    name: function (s) { return /^[A-Za-z][A-Za-z .'-]{1,59}$/.test(s); },
    pass: function (s) { return s.length >= 6 && /[A-Za-z]/.test(s) && /\d/.test(s); },
    req: function (s) { return s.length > 0; }
  };
  W.clearErrs = function (f) { W.$$(".field-error", f).forEach(function (e) { e.remove(); }); W.$$(".invalid", f).forEach(function (e) { e.classList.remove("invalid"); }); };
  W.setErr = function (el, msg) { el.classList.add("invalid"); var g = el.closest(".form-group") || el.parentNode; var d = document.createElement("div"); d.className = "field-error"; d.textContent = msg; g.appendChild(d); };
  /* rules: { fieldId: [fn(value, el) -> bool, "message"] } */
  W.validate = function (form, rules) {
    W.clearErrs(form); var first = null;
    Object.keys(rules).forEach(function (id) {
      var el = form.querySelector("#" + id); if (!el) return;
      if (!rules[id][0](el.value.trim(), el)) { W.setErr(el, rules[id][1]); first = first || el; }
    });
    if (first) first.focus();
    return !first;
  };
  document.addEventListener("input", function (e) {
    var el = e.target; if (el.classList && el.classList.contains("invalid")) { el.classList.remove("invalid"); var g = el.closest(".form-group"); if (g) { var x = g.querySelector(".field-error"); if (x) x.remove(); } }
  });

  /* ---------- pager / files ---------- */
  W.pager = function (box, total, page, per, go) {
    var pages = Math.max(1, Math.ceil(total / per)); if (!box) return;
    if (pages <= 1) { box.innerHTML = ""; return; }
    var h = '<button class="pg" data-p="' + Math.max(1, page - 1) + '"' + (page === 1 ? " disabled" : "") + ">&laquo; Prev</button>";
    for (var i = 1; i <= pages; i++) h += '<button class="pg' + (i === page ? " on" : "") + '" data-p="' + i + '">' + i + "</button>";
    h += '<button class="pg" data-p="' + Math.min(pages, page + 1) + '"' + (page === pages ? " disabled" : "") + ">Next &raquo;</button>";
    box.innerHTML = h;
    W.$$(".pg", box).forEach(function (b) { b.onclick = function () { go(parseInt(b.getAttribute("data-p"), 10)); }; });
  };
  W.download = function (name, text, mime) {
    var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: mime || "application/json" })); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };
  W.csv = function (rows) { return rows.map(function (r) { return r.map(function (c) { return '"' + String(c == null ? "" : c).replace(/"/g, '""') + '"'; }).join(","); }).join("\n"); };
  W.exportAll = function () {
    var o = { app: "Wanderly", exportedAt: new Date().toISOString() };
    ["users", "bookings", "packages", "destinations", "enquiries", "messages", "favs"].forEach(function (n) { o[n] = W.get(n); });
    W.download("wanderly-data-" + W.today() + ".json", JSON.stringify(o, null, 2));
  };
  W.importAll = function (file, done) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var o = JSON.parse(r.result);
        if (o.app !== "Wanderly" || !Array.isArray(o.users) || !Array.isArray(o.bookings)) throw new Error("bad");
        ["users", "bookings", "packages", "destinations", "enquiries", "messages", "favs"].forEach(function (n) { if (o[n]) W.set(n, o[n]); });
        W.toast("Data imported successfully."); done && done();
      } catch (e) { W.toast("That file is not a valid Wanderly export.", "error"); }
    };
    r.readAsText(file);
  };
  W.resetAll = function () { Object.keys(K).forEach(function (k) { if (k !== "session") localStorage.removeItem(K[k]); }); W.seed(true); };

  /* ---------- reusable cards ---------- */
  W.cards = {
    package: function (p) {
      return '<div class="card"><img src="' + W.esc(p.img) + '" alt="' + W.esc(p.name) + '" loading="lazy"><div class="card-body"><h3>' + W.esc(p.name) + '</h3><div class="meta"><span>' + p.days + " Days / " + p.nights + " Nights</span><span>" + W.esc(p.category) + "</span></div><p>" + W.esc(p.short) + "</p><p><strong>" + W.esc(p.route) + '</strong></p><div class="price">' + W.fmt(p.price) + '</div><div class="button-row"><a class="btn" href="package-details.html#' + W.esc(p.id) + '">Full Details</a><a class="btn btn-secondary" href="booking.html#' + W.esc(p.id) + '">Book This</a></div></div></div>';
    },
    destination: function (d) {
      return '<div class="card"><div class="card-media"><img src="' + W.esc(d.img) + '" alt="' + W.esc(d.name) + ' travel view" loading="lazy"><button type="button" class="fav-btn" data-fav="' + W.esc(d.id) + '" aria-label="Save ' + W.esc(d.name) + ' to favourites" title="Save to favourites">&#9825;</button></div><div class="card-body"><h3>' + W.esc(d.name) + '</h3><div class="meta"><span>' + W.esc(d.category) + "</span><span>" + W.esc(d.days) + "</span></div><p>" + W.esc(d.short) + '</p><a class="btn" href="destination-details.html#' + W.esc(d.id) + '">Open Destination Guide</a></div></div>';
    }
  };

  /* ---------- page enhancements ---------- */
  var PLACE = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0e4c46"/><stop offset="1" stop-color="#ffb547"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><text x="400" y="265" font-family="Arial" font-size="54" fill="#fff" text-anchor="middle">Wanderly</text></svg>');
  document.addEventListener("error", function (e) { var i = e.target; if (i && i.tagName === "IMG" && !i.getAttribute("data-fb")) { i.setAttribute("data-fb", "1"); i.src = PLACE; } }, true);

  function nav() {
    var header = W.$(".site-header .container"), n = W.$(".main-nav", header); if (!n) return;
    if (!W.$(".nav-toggle", header)) {
      var b = document.createElement("button"); b.className = "nav-toggle"; b.setAttribute("aria-label", "Toggle menu"); b.setAttribute("aria-expanded", "false"); b.innerHTML = "&#9776;";
      header.insertBefore(b, n);
      b.onclick = function () { var o = n.classList.toggle("open"); b.setAttribute("aria-expanded", o); b.innerHTML = o ? "&times;" : "&#9776;"; };
    }
    var ul = W.$("ul", n), login = W.$('a[href$="login.html"]', n), u = W.me();
    if (u && login) {
      var li = login.parentNode, first = u.name.split(" ")[0];
      li.innerHTML = '<a href="' + W.root + (u.role === "admin" ? "admin/dashboard.html" : "dashboard.html") + '">' + (u.role === "admin" ? "Admin Panel" : "Hi, " + W.esc(first)) + "</a>";
      var lo = document.createElement("li"); lo.innerHTML = '<a href="#" id="nav-logout">Logout</a>'; ul.appendChild(lo);
      W.$("#nav-logout").onclick = function (e) { e.preventDefault(); W.logout(); };
    }
  }
  function backTop() {
    var b = document.createElement("button"); b.id = "to-top"; b.setAttribute("aria-label", "Back to top"); b.innerHTML = "&uarr;"; document.body.appendChild(b);
    window.addEventListener("scroll", function () { b.classList.toggle("show", window.scrollY > 400); });
    b.onclick = function () { window.scrollTo({ top: 0, behavior: "smooth" }); };
  }
  W.faq = function () {
    W.$$(".faq-item").forEach(function (it) { var q = W.$(".faq-q", it); q.onclick = function () { var o = it.classList.toggle("open"); q.setAttribute("aria-expanded", o); }; });
  };
  function sweepImgs() { W.$$("img").forEach(function (i) { if (i.complete && i.naturalWidth === 0 && !i.getAttribute("data-fb")) { i.setAttribute("data-fb", "1"); i.src = PLACE; } }); }
  window.addEventListener("load", sweepImgs);
  var started = false;
  function init() { if (started) return; started = true; nav(); backTop(); W.faq(); var al = W.$("#admin-logout"); if (al) al.onclick = function (e) { e.preventDefault(); W.logout(); }; }
  document.addEventListener("DOMContentLoaded", init);
  if (document.readyState !== "loading") init();
})();
