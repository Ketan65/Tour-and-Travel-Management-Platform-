/**
 * WanderWave - Auth & Session Logic
 * Assigned: Member 1 (feature/auth)
 */

function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const regForm = document.getElementById('registerForm');
  const loginBtn = document.getElementById('loginTabBtn');
  const regBtn = document.getElementById('registerTabBtn');

  if (tab === 'login') {
    loginForm.style.display = 'block';
    regForm.style.display = 'none';
    loginBtn.classList.add('active');
    regBtn.classList.remove('active');
  } else {
    loginForm.style.display = 'none';
    regForm.style.display = 'block';
    regBtn.classList.add('active');
    loginBtn.classList.remove('active');
  }
}

function handleLogin(e) {
  e.preventDefault();
  showToast('Logged in successfully! Redirecting...', 'success');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const user = { name, email, memberSince: 'Today', tier: 'Explorer' };
  localStorage.setItem('wanderwave_user', JSON.stringify(user));
  showToast('Account created successfully!', 'success');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
}

function showToast(msg, type = 'info') {
  const c = document.getElementById('toastContainer');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast show ${type}`;
  t.innerText = msg;
  c.appendChild(t);
  setTimeout(() => { t.remove(); }, 3000);
}
