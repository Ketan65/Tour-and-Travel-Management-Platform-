/**
 * WanderWave - User Profile & Bookings Controller
 * Assigned: Member 2 (feature/user)
 */

document.addEventListener('DOMContentLoaded', () => {
  loadUserProfile();
  loadBookings();
});

function loadUserProfile() {
  const user = JSON.parse(localStorage.getItem('wanderwave_user')) || DEFAULT_USER;
  if (document.getElementById('profileName')) document.getElementById('profileName').innerText = user.name;
  if (document.getElementById('profileEmail')) document.getElementById('profileEmail').innerText = user.email;
  if (document.getElementById('profileTier')) document.getElementById('profileTier').innerText = user.tier || 'Explorer';
}

function loadBookings() {
  const list = document.getElementById('bookingsList');
  if (!list) return;

  const bookings = JSON.parse(localStorage.getItem('wanderwave_bookings')) || DEFAULT_BOOKINGS;
  list.innerHTML = bookings.map(b => `
    <div class="booking-card">
      <div>
        <span class="badge badge-accent" style="margin-bottom: 0.4rem;">${b.bookingId}</span>
        <h3 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${b.tourTitle}</h3>
        <p class="text-muted" style="font-size: 0.85rem;">🗓 Travel Date: ${b.travelDate} • ${b.travelers} Traveler(s)</p>
        <p style="font-weight: 700; color: var(--color-primary); margin-top: 0.4rem;">Total Paid: $${b.totalAmount}</p>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <span class="badge ${b.status === 'Confirmed' ? 'badge-success' : 'badge-secondary'}">${b.status}</span>
        <button class="btn btn-outline btn-sm" onclick="alert('Printing Digital Ticket for ' + '${b.bookingId}')">Download Ticket</button>
      </div>
    </div>
  `).join('');
}
