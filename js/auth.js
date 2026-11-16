///(function () {
  "use strict";
  var W = window.WD, page = document.body.getAttribute("data-page");

  function eyeToggles() {
    W.$$(".pw-toggle").forEach(function (b) {
      b.onclick = function () { var i = W.$("#" + b.getAttribute("data-for")); var show = i.type === "password"; i.type = show ? "text" : "password"; b.textContent = show ? "Hide" : "Show"; };
    });
  }

  /* ---------------- LOGIN ---------------- */
  if (page === "login") {
    var form = W.$("#login-form"), q = W.params();
    if (q.get("denied")) W.toast("Admin access needs an admin account.", "error");
    var already = W.me();
    if (already && !q.get("denied")) { W.$("#already").innerHTML = 'You are signed in as <strong>' + W.esc(already.name) + '</strong>. <a href="' + (already.role === "admin" ? "admin/dashboard.html" : "dashboard.html") + '">Go to your dashboard</a> or <a href="#" id="sw-out">sign out</a>.'; W.$("#already").hidden = false; W.$("#sw-out").onclick = function (e) { e.preventDefault(); W.logout(); }; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!W.validate(form, { email: [W.v.email, "Enter a valid email address."], password: [W.v.req, "Enter your password."] })) return;
      var email = W.$("#email").value.trim().toLowerCase(), pw = W.$("#password").value;
      var u = W.get("users").find(function (x) { return x.email.toLowerCase() === email; });
      var msg = W.$("#login-msg"); msg.hidden = true;
      if (!u || u.pass !== W.hash(pw)) { msg.textContent = "Incorrect email or password."; msg.hidden = false; return; }
      W.login(u, W.$("#remember").checked);
      var next = W.safeNext(q.get("next"));
      location.href = u.role === "admin" ? "admin/dashboard.html" : next || "dashboard.html";
    });
    eyeToggles();
  }

  /* ---------------- REGISTER ---------------- */
  if (page === "register") {
    var rf = W.$("#register-form");
    rf.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = W.validate(rf, {
        name: [W.v.name, "Enter your full name (letters only)."],
        email: [W.v.email, "Enter a valid email address."],
        phone: [W.v.phone, "Enter a valid phone number (10–13 digits)."],
        password: [W.v.pass, "Use 6+ characters with at least one letter and one number."],
        confirm: [function (v) { return v === W.$("#password").value; }, "Passwords do not match."],
        terms: [function (v, el) { return el.checked; }, "Please accept the demo terms."]
      });
      if (!ok) return;
      var users = W.get("users"), email = W.$("#email").value.trim().toLowerCase();
      if (users.some(function (u) { return u.email.toLowerCase() === email; })) { W.setErr(W.$("#email"), "An account with this email already exists."); return; }
      var n = users.reduce(function (m, u) { var k = parseInt(String(u.id).replace(/\D/g, ""), 10); return k > m ? k : m; }, 0) + 1;
      var u = { id: "USR" + String(n).padStart(3, "0"), name: W.$("#name").value.trim(), email: email, phone: W.$("#phone").value.trim(), city: W.$("#city").value.trim(), role: "user", pass: W.hash(W.$("#password").value), joined: W.today() };
      users.push(u); W.set("users", users); W.login(u, false);
      W.toast("Account created. Welcome to Wanderly!");
      setTimeout(function () { location.href = "dashboard.html"; }, 700);
    });
    eyeToggles();
  }

  /* ---------------- USER DASHBOARD ---------------- */
  if (page === "dashboard") {
    var me = W.me(); if (!me) return;
    var mine = W.get("bookings").filter(function (b) { return b.userId === me.id; }).sort(function (a, b) { return b.createdAt < a.createdAt ? -1 : 1; });
    var favs = (W.get("favs")[me.id] || []).map(W.dest).filter(Boolean);
    var enqs = W.get("enquiries").filter(function (x) { return x.userId === me.id || (x.email || "").toLowerCase() === me.email.toLowerCase(); });
    W.$("#d-name").textContent = me.name.split(" ")[0];
    var count = function (s) { return mine.filter(function (b) { return b.status === s; }).length; };
    var stats = [["Total bookings", mine.length], ["Pending", count("Pending")], ["Approved", count("Approved")], ["Saved destinations", favs.length]];
    W.$("#d-stats").innerHTML = stats.map(function (s) { return '<div class="stat"><span class="stat-n">' + s[1] + '</span><span class="stat-l">' + s[0] + "</span></div>"; }).join("");

    W.$("#d-bookings").innerHTML = mine.length ? mine.slice(0, 3).map(function (b) {
      return '<div class="row-item"><div><strong>' + W.esc(b.packageName) + "</strong><br><span class=\"small\">" + W.esc(b.bookingId) + " · " + W.date(b.travelDate) + " · " + b.travellers + ' traveller(s)</span></div><div class="row-end">' + W.badge(b.status) + '<a href="booking-confirmation.html?id=' + W.esc(b.bookingId) + '">View</a></div></div>';
    }).join("") : '<p class="small">No bookings yet. <a href="packages.html">Browse packages</a> to plan your first trip.</p>';

    W.$("#d-favs").innerHTML = favs.length ? favs.map(function (d) { return '<a class="chip" href="destination-details.html#' + W.esc(d.id) + '">' + W.esc(d.name) + "</a>"; }).join("") : '<p class="small">Tap the heart on any destination to save it here.</p>';

    W.$("#d-enq").innerHTML = enqs.length ? enqs.slice(0, 4).map(function (x) {
      return '<div class="row-item"><div><strong>' + W.esc(x.id) + "</strong> · " + W.esc(x.type) + " · " + W.esc(x.destination) + (x.reply ? '<div class="reply-box"><strong>Wanderly replied:</strong> ' + W.esc(x.reply) + "</div>" : "") + '</div><div class="row-end">' + W.badge(x.status === "New" ? "Pending" : x.status) + "</div></div>";
    }).join("") : '<p class="small">No service enquiries yet.</p>';

    /* profile */
    var pf = W.$("#profile-form");
    W.$("#p-name").value = me.name; W.$("#p-email").value = me.email; W.$("#p-phone").value = me.phone || ""; W.$("#p-city").value = me.city || "";
    W.$("#p-since").textContent = W.date(me.joined);
    pf.addEventListener("submit", function (e) {
      e.preventDefault();
      var rules = { "p-name": [W.v.name, "Enter your full name."], "p-phone": [W.v.phone, "Enter a valid phone number."] };
      var np = W.$("#p-newpass").value;
      if (np) { rules["p-newpass"] = [W.v.pass, "Use 6+ characters with a letter and a number."]; rules["p-oldpass"] = [function (v) { return W.hash(v) === me.pass; }, "Current password is incorrect."]; }
      if (!W.validate(pf, rules)) return;
      var users = W.get("users"), u = users.find(function (x) { return x.id === me.id; });
      u.name = W.$("#p-name").value.trim(); u.phone = W.$("#p-phone").value.trim(); u.city = W.$("#p-city").value.trim(); if (np) u.pass = W.hash(np);
      W.set("users", users); W.$("#p-newpass").value = ""; W.$("#p-oldpass").value = "";
      W.toast("Profile updated."); W.$("#d-name").textContent = u.name.split(" ")[0];
    });
  }
})();
