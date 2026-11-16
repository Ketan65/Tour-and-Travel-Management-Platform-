/* services.js — hotels, transport, service enquiry, contact/support (+ confirmations) */
(function () {
  "use strict";
  var W = window.WD, page = document.body.getAttribute("data-page"), S = window.WD_SEED;
  function nextRef(prefix, list, key) { var max = 0; list.forEach(function (x) { var n = parseInt(String(x[key]).split("-").pop(), 10); if (n > max) max = n; }); return prefix + (max ? max + 1 : 1000 + Math.floor(Math.random() * 8000)); }
  function prefill(form) { var u = W.me(); if (u) { var n = W.$("#name", form), e = W.$("#email", form); if (n && !n.value) n.value = u.name; if (e && !e.value) e.value = u.email; } }

  /* ---------- hotels ---------- */
  if (page === "hotels") {
    var hotels = S.hotels, grid = W.$("#hotel-grid");
    var cities = hotels.map(function (h) { return h.city; }).filter(function (c, i, a) { return a.indexOf(c) === i; }).sort();
    W.$("#h-city").innerHTML = '<option value="">All cities</option>' + cities.map(function (c) { return "<option>" + c + "</option>"; }).join("");
    function ah() {
      var t = W.$("#h-q").value.trim().toLowerCase(), c = W.$("#h-city").value, p = +W.$("#h-price").value, s = W.$("#h-sort").value;
      var out = hotels.filter(function (h) { return (!c || h.city === c) && (!p || h.price <= p) && (!t || (h.name + h.city + h.type + h.amenities.join(" ")).toLowerCase().indexOf(t) > -1); });
      out.sort(function (a, b) { return s === "low" ? a.price - b.price : s === "high" ? b.price - a.price : b.rating - a.rating; });
      W.$("#h-count").textContent = out.length + " of " + hotels.length + " stays";
      grid.innerHTML = out.length ? out.map(function (h) {
        return '<div class="card"><img src="' + W.esc(h.img) + '" alt="' + W.esc(h.name) + '" loading="lazy"><div class="card-body"><h3>' + W.esc(h.name) + '</h3><div class="meta"><span>' + W.esc(h.city) + "</span><span>" + W.esc(h.type) + "</span><span>&#9733; " + h.rating + "</span></div><p>" + W.esc(h.short) + '</p><p class="small">' + h.amenities.map(W.esc).join(" · ") + '</p><div class="price">From ' + W.fmt(h.price) + '/night</div><div class="button-row"><a class="btn" href="enquiry.html?service=hotel&destination=' + encodeURIComponent(h.city) + "&hotel=" + encodeURIComponent(h.name) + '#hotel">Enquire</a><a class="btn btn-secondary" href="booking.html">Book a Trip</a></div></div></div>';
      }).join("") : '<div class="empty"><h3>No stays match</h3><p>Try another city or a higher budget.</p></div>';
    }
    if (W.params().get("q")) W.$("#h-q").value = W.params().get("q");
    W.$("#h-q").addEventListener("input", W.debounce(ah, 150)); ["h-city", "h-price", "h-sort"].forEach(function (i) { W.$("#" + i).addEventListener("change", ah) }); ah();
  }

  /* ---------- transport: fare estimator ---------- */
  if (page === "transport") {
    var tf = W.$("#fare-form");
    W.$("#fare-mode").innerHTML = S.transports.map(function (t) { return "<option>" + t.id + "</option>"; }).join("");
    function fare() {
      var km = +W.$("#fare-km").value, n = Math.max(1, +W.$("#fare-n").value || 1), mode = W.$("#fare-mode").value, t = W.opt("transports", mode), out = W.$("#fare-out");
      if (!km || km < 10) { out.innerHTML = '<span class="small">Enter a distance of at least 10 km to see an estimate.</span>'; return; }
      var total = mode === "Private Cab" ? Math.ceil(n / 4) * Math.round(km * t.rate) : Math.round(km * t.rate * n);
      out.innerHTML = "Estimated fare: <strong>" + W.fmt(total) + "</strong> for " + n + " traveller(s) by " + W.esc(mode) + (mode === "Private Cab" ? " (" + Math.ceil(n / 4) + " cab(s), 4 seats each)" : "") + '. <span class="small">Indicative only — exact fares are confirmed by our team.</span>';
    }
    tf.addEventListener("input", fare); tf.addEventListener("submit", function (e) { e.preventDefault(); fare(); }); fare();
    W.$$("[data-mode]").forEach(function (a) { a.href = "enquiry.html?service=transport&mode=" + encodeURIComponent(a.getAttribute("data-mode")) + "#transport"; });
  }

  /* ---------- enquiry ---------- */
  if (page === "enquiry") {
    var ef = W.$("#enquiry-form"), q = W.params();
    prefill(ef); W.$("#date").min = W.today();
    if (q.get("service")) W.$("#service").value = q.get("service");
    if (q.get("destination")) W.$("#destination").value = q.get("destination");
    var pre = []; if (q.get("hotel")) pre.push("Interested in " + q.get("hotel") + "."); if (q.get("mode")) pre.push("Interested in " + q.get("mode") + " options.");
    if (pre.length) W.$("#message").value = pre.join(" ") + " ";
    ef.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!W.validate(ef, {
        service: [W.v.req, "Choose an enquiry type."], destination: [function (v) { return v.length >= 2; }, "Enter a destination."],
        date: [function (v) { return !v || v >= W.today(); }, "Travel date cannot be in the past."],
        travellers: [function (v) { return !v || (+v >= 1 && +v <= 50); }, "Travellers must be between 1 and 50."],
        name: [W.v.name, "Enter your full name."], email: [W.v.email, "Enter a valid email address."],
        message: [function (v) { return v.length >= 10; }, "Please describe your requirement (at least 10 characters)."]
      })) return;
      var list = W.get("enquiries"), u = W.me();
      var x = { id: nextRef("WD-ENQ-", list, "id"), userId: u ? u.id : null, type: W.$("#service").value, destination: W.$("#destination").value.trim(), date: W.$("#date").value, travellers: W.$("#travellers").value, budget: W.$("#budget").value.trim(), name: W.$("#name").value.trim(), email: W.$("#email").value.trim(), message: W.$("#message").value.trim(), status: "New", reply: "", createdAt: new Date().toISOString() };
      list.push(x); if (W.set("enquiries", list)) location.href = "enquiry-confirmation.html?id=" + x.id;
    });
  }
  if (page === "enquiry-confirmation") {
    var x2 = W.get("enquiries").find(function (e) { return e.id === W.params().get("id"); }), h2 = W.$("#confirm-host");
    var labels = { hotel: "Hotel / Stay", transport: "Transportation", custom: "Custom Trip Plan", general: "General Travel Question" };
    if (!x2) h2.innerHTML = '<div class="confirm"><div class="confirm-body"><h2>Enquiry not found</h2><div class="button-row"><a class="btn" href="enquiry.html">New Enquiry</a></div></div></div>';
    else {
      var r = function (a) { return a.map(function (p) { return '<tr><td class="label">' + p[0] + '</td><td class="value">' + p[1] + "</td></tr>"; }).join(""); };
      h2.innerHTML = '<div class="confirm"><div class="confirm-top"><div class="mark">&#10003;</div><h1 style="color:#fff;margin-bottom:6px">Service Request Received</h1><p style="color:#dbe6ee;margin-bottom:0">Reference ID: ' + W.esc(x2.id) + '</p></div><div class="confirm-body"><p><span class="status-badge">Status: ' + (x2.status === "New" ? "Under Review" : W.esc(x2.status)) + '</span></p><h3>Enquiry Summary</h3><table class="receipt-table">' +
        r([["Enquiry Type", labels[x2.type] || W.esc(x2.type)], ["Destination", W.esc(x2.destination)], ["Travel Date", x2.date ? W.date(x2.date) : "Flexible"], ["Travellers", W.esc(x2.travellers || "-")], ["Approx. Budget", W.esc(x2.budget || "-")]]) + '</table><h3>Contact Details</h3><table class="receipt-table">' + r([["Full Name", W.esc(x2.name)], ["Email", W.esc(x2.email)], ["Requirement", W.esc(x2.message)]]) +
        '</table><p class="small">A Wanderly travel agent will follow up by email with availability and pricing shortly. Logged-in users can see replies on their dashboard.</p><div class="button-row"><a class="btn" href="enquiry.html">Back to Service Enquiry</a><a class="btn btn-secondary" href="index.html">Return Home</a></div></div></div>';
    }
  }

  /* ---------- contact ---------- */
  if (page === "contact") {
    var cf = W.$("#contact-form"); prefill(cf);
    cf.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!W.validate(cf, { name: [W.v.name, "Enter your full name."], email: [W.v.email, "Enter a valid email address."], subject: [function (v) { return v.length >= 4; }, "Add a short subject (4+ characters)."], message: [function (v) { return v.length >= 10; }, "Message must be at least 10 characters."] })) return;
      var list = W.get("messages"), u = W.me();
      var m = { id: nextRef("WD-SUP-", list, "id"), userId: u ? u.id : null, name: W.$("#name").value.trim(), email: W.$("#email").value.trim(), subject: W.$("#subject").value.trim(), message: W.$("#message").value.trim(), status: "Received", reply: "", createdAt: new Date().toISOString() };
      list.push(m); if (W.set("messages", list)) location.href = "contact-confirmation.html?id=" + m.id;
    });
  }
  if (page === "contact-confirmation") {
    var m2 = W.get("messages").find(function (e) { return e.id === W.params().get("id"); }), h3 = W.$("#confirm-host");
    if (!m2) h3.innerHTML = '<div class="confirm"><div class="confirm-body"><h2>Message not found</h2><div class="button-row"><a class="btn" href="contact.html">Contact Support</a></div></div></div>';
    else h3.innerHTML = '<div class="confirm"><div class="confirm-top"><div class="mark">&#10003;</div><h1 style="color:#fff;margin-bottom:6px">Message Sent</h1><p style="color:#dbe6ee;margin-bottom:0">Ticket ID: ' + W.esc(m2.id) + '</p></div><div class="confirm-body"><p><span class="status-badge">Status: ' + W.esc(m2.status) + '</span></p><h3>Your Message</h3><table class="receipt-table"><tr><td class="label">Full Name</td><td class="value">' + W.esc(m2.name) + '</td></tr><tr><td class="label">Email</td><td class="value">' + W.esc(m2.email) + '</td></tr><tr><td class="label">Subject</td><td class="value">' + W.esc(m2.subject) + '</td></tr><tr><td class="label">Message</td><td class="value">' + W.esc(m2.message) + '</td></tr></table><p class="small">Our support team typically replies to the email address above within one business day.</p><div class="button-row"><a class="btn" href="contact.html">Send Another Message</a><a class="btn btn-secondary" href="index.html">Return Home</a></div></div></div>';
  }
})();
