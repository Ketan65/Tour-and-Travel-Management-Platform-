/* admin-enquiries.js — service enquiries + support messages: view, reply, change status, delete */
(function () {
  "use strict";
  var W = window.WD; if (!W.me() || W.me().role !== "admin") return;
  var tab = "enq", tbody = W.$("#e-body"), head = W.$("#e-head");
  var cfg = {
    enq: { key: "enquiries", states: ["New", "Replied", "Closed"], cols: ["Ref", "Type", "Customer", "Destination", "Received", "Status", ""] },
    msg: { key: "messages", states: ["Received", "Replied", "Closed"], cols: ["Ticket", "Subject", "Customer", "", "Received", "Status", ""] }
  };
  function draw() {
    var c = cfg[tab], t = W.$("#e-q").value.trim().toLowerCase(), st = W.$("#e-status").value;
    W.$("#e-status").innerHTML = '<option value="">All statuses</option>' + c.states.map(function (s) { return "<option" + (s === st ? " selected" : "") + ">" + s + "</option>"; }).join("");
    st = W.$("#e-status").value;
    head.innerHTML = "<tr>" + c.cols.map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr>";
    var l = W.get(c.key).filter(function (x) { return (!st || x.status === st) && (!t || JSON.stringify(x).toLowerCase().indexOf(t) > -1); }).sort(function (a, z) { return a.createdAt < z.createdAt ? 1 : -1; });
    W.$("#e-count").textContent = l.length + " item" + (l.length === 1 ? "" : "s");
    W.$("#tab-enq-n").textContent = W.get("enquiries").filter(function (x) { return x.status === "New"; }).length;
    W.$("#tab-msg-n").textContent = W.get("messages").filter(function (x) { return x.status === "Received"; }).length;
    tbody.innerHTML = l.length ? l.map(function (x) {
      var open = x.status === "New" || x.status === "Received";
      return "<tr><td><strong>" + W.esc(x.id) + "</strong></td><td>" + (tab === "enq" ? W.esc(x.type) : W.esc(x.subject)) + "</td><td>" + W.esc(x.name) + '<br><span class="small">' + W.esc(x.email) + "</span></td><td>" + (tab === "enq" ? W.esc(x.destination) : "") + "</td><td>" + W.date(x.createdAt) + "</td><td>" + W.badge(open ? "Pending" : x.status === "Replied" ? "Approved" : "Cancelled").replace(/>(Pending|Approved|Cancelled)</, ">" + x.status + "<") + '</td><td class="actions"><button class="mini" data-open="' + W.esc(x.id) + '">' + (open ? "Reply" : "View") + '</button><button class="mini no" data-del="' + W.esc(x.id) + '">Delete</button></td></tr>';
    }).join("") : '<tr><td colspan="7" class="empty-cell">Nothing here.</td></tr>';
  }
  function open(id) {
    var c = cfg[tab], l = W.get(c.key), x = l.find(function (y) { return y.id === id; }); if (!x) return;
    var info = tab === "enq" ? [["Type", x.type], ["Destination", x.destination], ["Travel date", x.date ? W.date(x.date) : "Flexible"], ["Travellers", x.travellers || "-"], ["Budget", x.budget || "-"]] : [["Subject", x.subject]];
    var body = W.modal(x.id, '<table class="receipt-table">' + [["From", W.esc(x.name) + " &lt;" + W.esc(x.email) + "&gt;"]].concat(info.map(function (r) { return [r[0], W.esc(r[1])]; })).concat([["Message", W.esc(x.message)]]).map(function (r) { return '<tr><td class="label">' + r[0] + '</td><td class="value">' + r[1] + "</td></tr>"; }).join("") + '</table><form id="rf" novalidate><div class="form-group"><label for="reply">Reply (shown to the customer on their dashboard)</label><textarea id="reply" placeholder="Type your response…">' + W.esc(x.reply || "") + '</textarea></div><div class="form-group"><label for="st">Status</label><select id="st">' + c.states.map(function (s) { return "<option" + (s === x.status ? " selected" : "") + ">" + s + "</option>"; }).join("") + '</select></div><div class="button-row"><button class="btn" type="submit">Save</button></div></form>');
    var f = W.$("#rf", body);
    f.onsubmit = function (e) {
      e.preventDefault(); var r = W.$("#reply", f).value.trim(), st = W.$("#st", f).value;
      if (st === "Replied" && !r) return W.setErr(W.$("#reply", f), "Write a reply before marking as Replied.");
      x.reply = r; x.status = (r && (st === "New" || st === "Received")) ? "Replied" : st; W.set(c.key, l); W.closeModal(); W.toast("Saved."); draw();
    };
  }
  tbody.addEventListener("click", function (e) {
    var o = e.target.closest("[data-open]"), d = e.target.closest("[data-del]");
    if (o) open(o.getAttribute("data-open"));
    if (d && confirm("Delete this item?")) { var k = cfg[tab].key; W.set(k, W.get(k).filter(function (x) { return x.id !== d.getAttribute("data-del"); })); W.toast("Deleted."); draw(); }
  });
  W.$$("[data-tab]").forEach(function (b) { b.onclick = function () { tab = b.getAttribute("data-tab"); W.$$("[data-tab]").forEach(function (o) { o.classList.toggle("on", o === b); }); W.$("#e-status").value = ""; draw(); }; });
  W.$("#e-q").addEventListener("input", W.debounce(draw, 150)); W.$("#e-status").addEventListener("change", draw);
  draw();
})();
