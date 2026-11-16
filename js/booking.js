///(function () {
  "use strict";
  var W = window.WD, page = document.body.getAttribute("data-page"), S = window.WD_SEED;

  /* ---------------- booking.html ---------------- */
  if (page === "booking") {
    var form = W.$("#booking-form"), pkgs = W.get("packages").filter(function (p) { return p.active !== false; }), me = W.me();
    var card = function (type, name, id, val, title, meta, price, extra, checked) {
      return '<div class="option-card"><input type="' + type + '" name="' + name + '" value="' + W.esc(val) + '" id="' + id + '"' + (extra || "") + (checked ? " checked" : "") + '><label for="' + id + '"><span class="option-title">' + W.esc(title) + '</span><span class="option-meta">' + meta + '</span><span class="option-price">' + price + "</span></label></div>";
    };
    var want = location.hash.slice(1);
    W.$("#opt-pkg").innerHTML = pkgs.map(function (p, i) {
      return card("radio", "package", "pkg-" + p.id, p.id, p.name, p.days + " Days / " + p.nights + " Nights &middot; " + W.esc(p.route), W.fmt(p.price) + " per person", "", want ? p.id === want : i === 0);
    }).join("");
    if (!W.$('input[name="package"]:checked') && pkgs[0]) W.$('input[name="package"]').checked = true;
    W.$("#opt-room").innerHTML = S.rooms.map(function (r, i) { return card("radio", "room", "room-" + i, r.id, r.id, W.esc(r.meta), W.fmt(r.price) + " / night", "", i === 0); }).join("");
    W.$("#opt-transport").innerHTML = S.transports.map(function (t, i) { return card("radio", "transport", "tr-" + i, t.id, t.id, W.esc(t.meta), "from " + W.fmt(t.price), "", i === 0); }).join("");
    W.$("#opt-addons").innerHTML = S.addons.map(function (a) { return card("checkbox", "addon", "addon-" + a.id, a.id, a.name, W.esc(a.meta), W.fmt(a.price), "", false); }).join("");

    W.$("#date").min = W.today();
    if (me) { W.$("#name").value = me.name; W.$("#email").value = me.email; W.$("#phone").value = me.phone || ""; W.$("#city").value = me.city || ""; }
    else W.$("#login-note").hidden = false;

    function sel() {
      var p = pkgs.find(function (x) { return x.id === (W.$('input[name="package"]:checked') || {}).value; });
      var t = Math.max(1, parseInt(W.$("#travellers").value, 10) || 1);
      return { p: p, t: t, room: W.$('input[name="room"]:checked').value, tr: W.$('input[name="transport"]:checked').value, addons: W.$$('input[name="addon"]:checked').map(function (c) { return c.value; }) };
    }
    function estimate() {
      var s = sel(); if (!s.p) return;
      var b = W.price(s.p, s.t, s.room, s.tr, s.addons);
      W.$("#est-travellers-label").textContent = s.t; W.$("#est-nights-label").textContent = s.p.nights;
      W.$("#est-package").textContent = W.fmt(b.package); W.$("#est-room").textContent = W.fmt(b.room); W.$("#est-transport").textContent = W.fmt(b.transport); W.$("#est-addons").textContent = W.fmt(b.addons);
      W.$("#est-total").innerHTML = "<strong>" + W.fmt(b.total) + "</strong>"; W.$("#est-pkg-name").textContent = s.p.name;
    }
    form.addEventListener("change", estimate); form.addEventListener("input", estimate);
    window.addEventListener("hashchange", function () { var r = W.$("#pkg-" + location.hash.slice(1)); if (r) { r.checked = true; estimate(); } });
    estimate();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!W.me()) { W.toast("Please log in to complete your booking.", "error"); setTimeout(function () { location.href = "login.html?next=booking.html"; }, 900); return; }
      var ok = W.validate(form, {
        date: [function (v) { return v && v >= W.today(); }, "Choose a travel date that is today or later."],
        travellers: [function (v) { var n = +v; return n >= 1 && n <= 20 && Math.floor(n) === n; }, "Travellers must be a whole number from 1 to 20."],
        name: [W.v.name, "Enter your full name."], email: [W.v.email, "Enter a valid email address."], phone: [W.v.phone, "Enter a valid phone number (10–13 digits)."]
      });
      var s = sel();
      if (!s.p) { W.toast("Please choose a package.", "error"); ok = false; }
      if (s.room === "Family Room" && s.t < 3 && ok && !confirm("The Family Room is designed for 3 or more travellers. Continue anyway?")) ok = false;
      if (!ok) return;
      var u = W.me(), bookings = W.get("bookings");
      var b = W.buildBooking({ userId: u.id, userName: W.$("#name").value.trim(), email: W.$("#email").value.trim(), phone: W.$("#phone").value.trim(), city: W.$("#city").value.trim(), packageId: s.p.id, travelDate: W.$("#date").value, travellers: s.t, room: s.room, transport: s.tr, addons: s.addons, status: "Pending" });
      bookings.push(b); if (!W.set("bookings", bookings)) return;
      location.href = "booking-confirmation.html?id=" + b.bookingId;
    });
  }

  /* ---------------- booking-confirmation.html ---------------- */
  if (page === "booking-confirmation") {
    var id = W.params().get("id"), me2 = W.me(), b2 = W.get("bookings").find(function (x) { return x.bookingId === id; }), host = W.$("#confirm-host");
    if (!b2 || !me2 || (b2.userId !== me2.id && me2.role !== "admin")) {
      host.innerHTML = '<div class="confirm"><div class="confirm-body"><h2>Booking not found</h2><p>' + (me2 ? "We couldn’t find that booking on your account." : "Please log in to view your booking.") + '</p><div class="button-row"><a class="btn" href="' + (me2 ? "my-bookings.html" : "login.html?next=my-bookings.html") + '">' + (me2 ? "My Bookings" : "Log in") + '</a><a class="btn btn-secondary" href="index.html">Return Home</a></div></div></div>';
    } else {
      var rows = function (a) { return a.map(function (r) { return '<tr><td class="label">' + r[0] + '</td><td class="value">' + r[1] + "</td></tr>"; }).join(""); };
      var addonNames = b2.addons.length ? b2.addons.map(function (a) { var o = W.opt("addons", a); return o ? o.name : a; }).join(", ") : "None";
      var statusTxt = { Pending: "Booking Request Received", Approved: "Booking Confirmed", Cancelled: "Booking Cancelled" }[b2.status] || "Booking";
      var bd = b2.breakdown;
      host.innerHTML = '<div class="confirm"><div class="confirm-top"><div class="mark">' + (b2.status === "Cancelled" ? "&times;" : "&#10003;") + '</div><h1 style="color:#fff;margin-bottom:6px">' + statusTxt + '</h1><p style="color:#dbe6ee;margin-bottom:0">Booking ID: ' + W.esc(b2.bookingId) + '</p></div><div class="confirm-body"><p>' + W.badge(b2.status) + ' <span class="small">&nbsp;Booked on ' + W.date(b2.createdAt) + '</span></p><h3>Trip Summary</h3><table class="receipt-table">' +
        rows([["Tour Package", W.esc(b2.packageName) + " (" + (b2.nights + 1) + " Days / " + b2.nights + " Nights)"], ["Route", W.esc(b2.destination)], ["Travel Date", W.date(b2.travelDate)], ["Travellers", b2.travellers + " Traveller" + (b2.travellers > 1 ? "s" : "")], ["Accommodation", W.esc(b2.room)], ["Transport", W.esc(b2.transport)], ["Add-ons", W.esc(addonNames)]]) +
        '</table><h3>Traveller Details</h3><table class="receipt-table">' + rows([["Full Name", W.esc(b2.userName)], ["Email", W.esc(b2.email)], ["Phone", W.esc(b2.phone)], ["Departure City", W.esc(b2.city || "-")]]) +
        '</table><h3>Payment Summary</h3><table class="receipt-table">' + rows([["Package Price (per person x " + b2.travellers + ")", W.fmt(bd.package)], [W.esc(b2.room) + " (" + b2.nights + " nights)", W.fmt(bd.room)], [W.esc(b2.transport) + " (x " + b2.travellers + ")", W.fmt(bd.transport)], ["Add-ons", W.fmt(bd.addons)], ["<strong>Total Amount</strong>", "<strong>" + W.fmt(b2.totalAmount) + "</strong>"]]) +
        '</table><p class="small">Status is updated by the Wanderly team — check <strong>My Bookings</strong> to see when your request is approved. Final availability and payment are confirmed separately.</p><div class="button-row"><a class="btn" href="my-bookings.html">My Bookings</a><button class="btn btn-secondary" type="button" onclick="window.print()">Print</button><a class="btn btn-secondary" href="booking.html">Make Another Booking</a></div></div></div>';
    }
  }

  /* ---------------- my-bookings.html ---------------- */
  if (page === "my-bookings") {
    var me3 = W.me(); if (!me3) return;
    var box = W.$("#mb-list");
    function render() {
      var all = W.get("bookings").filter(function (b) { return b.userId === me3.id; }).sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1; });
      var t = W.$("#mb-q").value.trim().toLowerCase(), st = W.$("#mb-status").value;
      var out = all.filter(function (b) { return (!st || b.status === st) && (!t || (b.bookingId + " " + b.packageName + " " + b.destination).toLowerCase().indexOf(t) > -1); });
      W.$("#mb-count").textContent = out.length + " of " + all.length + " bookings";
      box.innerHTML = out.length ? out.map(function (b) {
        return '<div class="booking-card"><div class="bc-main"><div class="bc-top"><h3>' + W.esc(b.packageName) + "</h3>" + W.badge(b.status) + '</div><p class="small">' + W.esc(b.destination) + '</p><div class="meta"><span>' + W.esc(b.bookingId) + "</span><span>" + W.date(b.travelDate) + "</span><span>" + b.travellers + " traveller(s)</span><span>" + W.esc(b.room) + "</span><span>" + W.esc(b.transport) + '</span></div></div><div class="bc-side"><div class="price">' + W.fmt(b.totalAmount) + '</div><a class="btn btn-secondary" href="booking-confirmation.html?id=' + W.esc(b.bookingId) + '">View</a>' + (b.status === "Pending" ? '<button class="btn btn-danger" data-cancel="' + W.esc(b.bookingId) + '" type="button">Cancel</button>' : "") + "</div></div>";
      }).join("") : '<div class="empty"><h3>' + (all.length ? "No bookings match" : "No bookings yet") + "</h3><p>" + (all.length ? "Try clearing the search or status filter." : "Choose a package and send your first booking request.") + '</p><a class="btn" href="packages.html">Browse Packages</a></div>';
      W.$$("[data-cancel]", box).forEach(function (btn) {
        btn.onclick = function () {
          if (!confirm("Cancel booking " + btn.getAttribute("data-cancel") + "? This cannot be undone.")) return;
          var l = W.get("bookings"), x = l.find(function (y) { return y.bookingId === btn.getAttribute("data-cancel"); }); if (x) { x.status = "Cancelled"; W.set("bookings", l); W.toast("Booking cancelled."); render(); }
        };
      });
    }
    W.$("#mb-q").addEventListener("input", W.debounce(render, 150)); W.$("#mb-status").addEventListener("change", render); render();
  }
})();
