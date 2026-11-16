/* admin-users.js — view registered users, add / delete users */
(function () {
  "use strict";
  var W = window.WD, me = W.me(); if (!me || me.role !== "admin") return;
  var tbody = W.$("#u-body");
  function render() {
    var t = W.$("#u-q").value.trim().toLowerCase(), r = W.$("#u-role").value, bk = W.get("bookings");
    var l = W.get("users").filter(function (u) { return (!r || u.role === r) && (!t || (u.name + u.email + u.id + (u.phone || "")).toLowerCase().indexOf(t) > -1); });
    W.$("#u-count").textContent = l.length + " account" + (l.length === 1 ? "" : "s");
    tbody.innerHTML = l.length ? l.map(function (u) {
      var mine = bk.filter(function (b) { return b.userId === u.id; }), spent = mine.filter(function (b) { return b.status === "Approved"; }).reduce(function (s, b) { return s + b.totalAmount; }, 0);
      return "<tr><td>" + W.esc(u.id) + "</td><td><strong>" + W.esc(u.name) + '</strong><br><span class="small">' + W.esc(u.email) + "</span></td><td>" + W.esc(u.phone || "-") + "</td><td>" + W.badge(u.role === "admin" ? "Approved" : "Pending").replace(/>(Approved|Pending)</, ">" + u.role + "<") + "</td><td>" + W.date(u.joined) + "</td><td>" + mine.length + "</td><td>" + W.fmt(spent) + '</td><td class="actions">' + (u.id === me.id ? '<span class="small">You</span>' : '<button class="mini no" data-del="' + u.id + '">Delete</button>') + "</td></tr>";
    }).join("") : '<tr><td colspan="8" class="empty-cell">No users found.</td></tr>';
  }
  tbody.addEventListener("click", function (e) {
    var b = e.target.closest("[data-del]"); if (!b) return; var id = b.getAttribute("data-del"), u = W.user(id);
    if (!confirm("Delete " + u.name + "? Their bookings stay in the system for records.")) return;
    W.set("users", W.get("users").filter(function (x) { return x.id !== id; })); W.toast("User deleted."); render();
  });
  W.$("#u-q").addEventListener("input", W.debounce(render, 150)); W.$("#u-role").addEventListener("change", render);
  W.$("#u-add").onclick = function () {
    var body = W.modal("Add account", '<form id="uf" novalidate><div class="form-group"><label for="n">Full name *</label><input id="n"></div><div class="form-group"><label for="e">Email *</label><input id="e" type="email"></div><div class="form-row"><div class="form-group"><label for="p">Phone *</label><input id="p"></div><div class="form-group"><label for="r">Role</label><select id="r"><option value="user">User</option><option value="admin">Admin</option></select></div></div><div class="form-group"><label for="pw">Password *</label><input id="pw" type="text" placeholder="6+ chars, letter and number"></div><div class="button-row"><button class="btn" type="submit">Create account</button></div></form>');
    var f = W.$("#uf", body);
    f.onsubmit = function (e) {
      e.preventDefault();
      if (!W.validate(f, { n: [W.v.name, "Enter a valid name."], e: [W.v.email, "Enter a valid email."], p: [W.v.phone, "Enter a valid phone."], pw: [W.v.pass, "6+ characters with a letter and a number."] })) return;
      var l = W.get("users"), em = W.$("#e", f).value.trim().toLowerCase();
      if (l.some(function (u) { return u.email.toLowerCase() === em; })) return W.setErr(W.$("#e", f), "Email already registered.");
      var n = l.reduce(function (m, u) { var k = parseInt(String(u.id).replace(/\D/g, ""), 10); return k > m ? k : m; }, 0) + 1, role = W.$("#r", f).value;
      l.push({ id: (role === "admin" ? "ADM" : "USR") + String(n).padStart(3, "0"), name: W.$("#n", f).value.trim(), email: em, phone: W.$("#p", f).value.trim(), city: "", role: role, pass: W.hash(W.$("#pw", f).value), joined: W.today() });
      W.set("users", l); W.closeModal(); W.toast("Account created."); render();
    };
  };
  render();
})();
