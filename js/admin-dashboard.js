///(function () {
  "use strict";
  var W = window.WD; if (!W.me() || W.me().role !== "admin") return;
  function draw() {
    var b = W.get("bookings"), users = W.get("users").filter(function (u) { return u.role === "user"; }), pk = W.get("packages"), enq = W.get("enquiries"), msg = W.get("messages");
    var c = function (s) { return b.filter(function (x) { return x.status === s; }).length; };
    var rev = b.filter(function (x) { return x.status === "Approved"; }).reduce(function (s, x) { return s + x.totalAmount; }, 0);
    var cards = [["Total bookings", b.length, ""], ["Pending", c("Pending"), "warn"], ["Approved", c("Approved"), "good"], ["Cancelled", c("Cancelled"), "bad"], ["Registered users", users.length, ""], ["Packages", pk.length, ""], ["Open enquiries", enq.filter(function (x) { return x.status === "New"; }).length + msg.filter(function (x) { return x.status === "Received"; }).length, "warn"], ["Approved revenue", W.fmt(rev), "good"]];
    W.$("#a-stats").innerHTML = cards.map(function (x) { return '<div class="stat ' + x[2] + '"><span class="stat-n">' + x[1] + '</span><span class="stat-l">' + x[0] + "</span></div>"; }).join("");

    var total = Math.max(1, b.length);
    W.$("#chart-status").innerHTML = ["Pending", "Approved", "Cancelled"].map(function (s) { var n = c(s); return '<div class="bar-row"><span class="bar-l">' + s + '</span><div class="bar-track"><div class="bar-fill bar-' + s.toLowerCase() + '" style="width:' + Math.round(n / total * 100) + '%"></div></div><span class="bar-v">' + n + "</span></div>"; }).join("");

    var by = {}; b.filter(function (x) { return x.status !== "Cancelled"; }).forEach(function (x) { by[x.packageName] = (by[x.packageName] || 0) + x.totalAmount; });
    var arr = Object.keys(by).map(function (k) { return [k, by[k]]; }).sort(function (a, z) { return z[1] - a[1]; }), mx = arr.length ? arr[0][1] : 1;
    W.$("#chart-rev").innerHTML = arr.length ? arr.map(function (r) { return '<div class="bar-row"><span class="bar-l">' + W.esc(r[0]) + '</span><div class="bar-track"><div class="bar-fill" style="width:' + Math.round(r[1] / mx * 100) + '%"></div></div><span class="bar-v">' + W.fmt(r[1]) + "</span></div>"; }).join("") : '<p class="small">No booking revenue yet.</p>';

    var recent = b.slice().sort(function (a, z) { return a.createdAt < z.createdAt ? 1 : -1; }).slice(0, 5);
    W.$("#a-recent").innerHTML = recent.length ? recent.map(function (x) { return "<tr><td>" + W.esc(x.bookingId) + "</td><td>" + W.esc(x.userName) + "</td><td>" + W.esc(x.packageName) + "</td><td>" + W.fmt(x.totalAmount) + "</td><td>" + W.badge(x.status) + "</td></tr>"; }).join("") : '<tr><td colspan="5">No bookings yet.</td></tr>';
  }
  draw();
  W.$("#btn-export").onclick = W.exportAll;
  W.$("#file-import").onchange = function (e) { if (e.target.files[0]) W.importAll(e.target.files[0], draw); e.target.value = ""; };
  W.$("#btn-reset").onclick = function () { if (confirm("Reset ALL Wanderly data (users, bookings, packages…) back to the demo data? You will be logged out.")) { W.resetAll(); sessionStorage.clear(); localStorage.removeItem(W.KEYS.session); location.href = "../login.html"; } };
})();
