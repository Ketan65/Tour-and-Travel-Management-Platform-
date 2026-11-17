/* admin-bookings.js — view, search, filter, approve / cancel / delete bookings, CSV export */
(function () {
  "use strict";
  var W = window.WD; if (!W.me() || W.me().role !== "admin") return;
  var page = 1, PER = 8, tbody = W.$("#b-body");
  var dests = ["Rajasthan", "Manali", "Kerala", "Goa", "Kashmir", "Rishikesh"];
  function filtered() {
    var t = W.$("#b-q").value.trim().toLowerCase(), st = W.$("#b-status").value, pk = W.$("#b-pkg").value, s = W.$("#b-sort").value;
    var l = W.get("bookings").filter(function (b) { return (!st || b.status === st) && (!pk || b.packageId === pk) && (!t || (b.bookingId + " " + b.userName + " " + b.email + " " + b.packageName).toLowerCase().indexOf(t) > -1); });
    l.sort(function (a, z) { return s === "amount" ? z.totalAmount - a.totalAmount : s === "travel" ? (a.travelDate < z.travelDate ? -1 : 1) : (a.createdAt < z.createdAt ? 1 : -1); });
    return l;
  }
  function render() {
    var l = filtered(), total = l.length, view = l.slice((page - 1) * PER, page * PER);
    if (!view.length && page > 1) { page = 1; return render(); }
    W.$("#b-count").textContent = total + " booking" + (total === 1 ? "" : "s");
    tbody.innerHTML = view.length ? view.map(function (b) {
      return "<tr><td><strong>" + W.esc(b.bookingId) + "</strong></td><td>" + W.esc(b.userName) + '<br><span class="small">' + W.esc(b.email) + "</span></td><td>" + W.esc(b.packageName) + "</td><td>" + W.date(b.travelDate) + "</td><td>" + b.travellers + "</td><td>" + W.fmt(b.totalAmount) + "</td><td>" + W.badge(b.status) + '</td><td class="actions"><button class="mini" data-act="view" data-id="' + b.bookingId + '">View</button>' +
        (b.status !== "Approved" && b.status !== "Cancelled" ? '<button class="mini ok" data-act="Approved" data-id="' + b.bookingId + '">Approve</button>' : "") +
        (b.status !== "Cancelled" ? '<button class="mini no" data-act="Cancelled" data-id="' + b.bookingId + '">Cancel</button>' : '<button class="mini" data-act="Pending" data-id="' + b.bookingId + '">Reopen</button>') +
        '<button class="mini no" data-act="del" data-id="' + b.bookingId + '">Delete</button></td></tr>';
    }).join("") : '<tr><td colspan="8" class="empty-cell">No bookings match your filters.</td></tr>';
    W.pager(W.$("#b-pager"), total, page, PER, function (p) { page = p; render(); });
  }
  tbody.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-act]"); if (!btn) return;
    var id = btn.getAttribute("data-id"), act = btn.getAttribute("data-act"), list = W.get("bookings"), b = list.find(function (x) { return x.bookingId === id; }); if (!b) return;
    if (act === "view") return detail(b);
    if (act === "del") { if (!confirm("Delete booking " + id + " permanently?")) return; W.set("bookings", list.filter(function (x) { return x.bookingId !== id; })); W.toast("Booking deleted."); return render(); }
    if (act === "Cancelled" && !confirm("Cancel booking " + id + "?")) return;
    b.status = act; W.set("bookings", list); W.toast(id + " marked " + act + "."); render();
  });
  function detail(b) {
    var ad = b.addons.length ? b.addons.map(function (a) { var o = W.opt("addons", a); return o ? o.name : a; }).join(", ") : "None", d = b.breakdown;
    W.modal("Booking " + b.bookingId, '<table class="receipt-table">' + [["Status", W.badge(b.status)], ["Customer", W.esc(b.userName) + " (" + W.esc(b.userId) + ")"], ["Contact", W.esc(b.email) + " · " + W.esc(b.phone)], ["Departure city", W.esc(b.city || "-")], ["Package", W.esc(b.packageName)], ["Route", W.esc(b.destination)], ["Travel date", W.date(b.travelDate)], ["Travellers", b.travellers], ["Room / Transport", W.esc(b.room) + " / " + W.esc(b.transport)], ["Add-ons", W.esc(ad)], ["Package", W.fmt(d.package)], ["Stay", W.fmt(d.room)], ["Transport", W.fmt(d.transport)], ["Add-ons total", W.fmt(d.addons)], ["<strong>Total</strong>", "<strong>" + W.fmt(b.totalAmount) + "</strong>"], ["Created", W.date(b.createdAt)]].map(function (r) { return '<tr><td class="label">' + r[0] + '</td><td class="value">' + r[1] + "</td></tr>"; }).join("") + "</table>");
  }
  var pk = W.get("packages"); W.$("#b-pkg").innerHTML = '<option value="">All packages</option>' + pk.map(function (p) { return '<option value="' + W.esc(p.id) + '">' + W.esc(p.name) + "</option>"; }).join("");
  W.$("#b-q").addEventListener("input", W.debounce(function () { page = 1; render(); }, 150));
  ["b-status", "b-pkg", "b-sort"].forEach(function (i) { W.$("#" + i).addEventListener("change", function () { page = 1; render(); }); });
  W.$("#b-csv").onclick = function () {
    var rows = [["Booking ID", "Customer", "Email", "Phone", "Package", "Travel date", "Travellers", "Room", "Transport", "Total (INR)", "Status", "Created"]];
    filtered().forEach(function (b) { rows.push([b.bookingId, b.userName, b.email, b.phone, b.packageName, b.travelDate, b.travellers, b.room, b.transport, b.totalAmount, b.status, b.createdAt]); });
    W.download("wanderly-bookings-" + W.today() + ".csv", W.csv(rows), "text/csv"); W.toast("CSV exported.");
  };
  render();
})();
