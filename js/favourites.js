(function () {
  "use strict";
  var W = window.WD;
  var F = (W.favs = {
    list: function () { var u = W.me(); return u ? W.get("favs")[u.id] || [] : []; },
    has: function (id) { return F.list().indexOf(id) > -1; },
    toggle: function (id) {
      var u = W.me();
      if (!u) { W.toast("Please log in to save favourites.", "error"); setTimeout(function () { location.href = W.root + "login.html?next=" + encodeURIComponent(location.pathname.split("/").pop() + location.hash); }, 900); return false; }
      var all = W.get("favs"), l = all[u.id] || [], i = l.indexOf(id);
      if (i > -1) l.splice(i, 1); else l.push(id);
      all[u.id] = l; W.set("favs", all);
      W.toast(i > -1 ? "Removed from favourites." : "Saved to favourites.");
      return true;
    },
    refresh: function () {
      var l = F.list();
      W.$$(".fav-btn").forEach(function (b) { var on = l.indexOf(b.getAttribute("data-fav")) > -1; b.classList.toggle("active", on); b.innerHTML = on ? "&#9829;" : "&#9825;"; b.setAttribute("aria-pressed", on); });
    }
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".fav-btn"); if (!b) return;
    e.preventDefault();
    if (F.toggle(b.getAttribute("data-fav"))) { F.refresh(); if (document.body.getAttribute("data-page") === "favourites") renderPage(); }
  });
  function renderPage() {
    var box = W.$("#fav-grid"), ids = F.list(), items = ids.map(W.dest).filter(Boolean);
    W.$("#fav-count").textContent = items.length + " saved destination" + (items.length === 1 ? "" : "s");
    box.innerHTML = items.length ? items.map(W.cards.destination).join("") : '<div class="empty"><h3>No favourites yet</h3><p>Browse destinations and tap the heart to save the ones you like.</p><a class="btn" href="destinations.html">Explore Destinations</a></div>';
    F.refresh();
  }
  if (document.body.getAttribute("data-page") === "favourites") renderPage();
  F.refresh();
})();
