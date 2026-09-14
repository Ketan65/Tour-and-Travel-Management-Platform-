/**
 * WanderWave - Tours Catalog & Itinerary Logic
 * Assigned: Member 3 (feature/product)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderToursCatalog();
});

function renderToursCatalog(filtered = null) {
  const container = document.getElementById('toursGrid');
  if (!container || typeof TOURS_DATA === 'undefined') return;

  const data = filtered || TOURS_DATA;
  const countText = document.getElementById('toursCountText');
  if (countText) countText.innerText = `Showing ${data.length} packages`;

  container.innerHTML = data.map(t => `
    <div class="card">
      <div class="card-img-wrapper">
        <img src="${t.image}" alt="${t.title}">
        <span class="badge badge-primary" style="position: absolute; top: 1rem; left: 1rem;">${t.badge}</span>
      </div>
      <div class="card-body">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="text-muted" style="font-size: 0.85rem;">📍 ${t.destination}, ${t.country}</span>
          <span class="rating">⭐ ${t.rating}</span>
        </div>
        <h3 class="card-title" style="font-size: 1.15rem;">${t.title}</h3>
        <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 1.25rem;">${t.durationDays} Days / ${t.durationNights} Nights • ${t.category}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 1rem;">
          <div>
            <span style="font-size: 0.8rem; color: var(--color-muted);">From</span>
            <span style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary);">$${t.price}</span>
          </div>
          <a href="tour-details.html?id=${t.id}" class="btn btn-primary btn-sm">View Details</a>
        </div>
      </div>
    </div>
  `).join('');
}

function filterTours() {
  const search = document.getElementById('tourSearchInput')?.value.toLowerCase() || '';
  const category = document.getElementById('tourCategoryFilter')?.value || 'all';

  const filtered = TOURS_DATA.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search) || t.destination.toLowerCase().includes(search);
    const matchesCategory = category === 'all' || t.category === category;
    return matchesSearch && matchesCategory;
  });

  renderToursCatalog(filtered);
}

function renderTourDetailsPage() {
  const root = document.getElementById('tourDetailsRoot');
  if (!root || typeof TOURS_DATA === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || 'tour-01';
  const tour = TOURS_DATA.find(t => t.id === id) || TOURS_DATA[0];

  root.innerHTML = `
    <div style="margin-bottom: 2rem;">
      <span class="badge badge-primary">${tour.category}</span>
      <h1 style="font-size: 2.2rem; margin: 0.5rem 0;">${tour.title}</h1>
      <p class="text-muted">📍 ${tour.destination}, ${tour.country} • ⭐ ${tour.rating} (${tour.reviewsCount} reviews)</p>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem;">
      <div>
        <img src="${tour.image}" style="width: 100%; height: 380px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem;">
        <h2>Trip Overview</h2>
        <p style="margin: 1rem 0 2rem; color: var(--color-dark-muted);">${tour.overview}</p>

        <h2>Day-by-Day Itinerary</h2>
        <div class="timeline">
          ${tour.itinerary.map(item => `
            <div class="timeline-item">
              <h4>Day ${item.day}: ${item.title}</h4>
              <p class="text-muted" style="font-size: 0.95rem; margin-top: 0.25rem;">${item.description}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <aside>
        <div class="card" style="padding: 1.5rem; position: sticky; top: 90px;">
          <h3 style="font-size: 1.8rem; color: var(--color-primary); margin-bottom: 0.5rem;">$${tour.price} <span style="font-size: 0.9rem; color: var(--color-muted); font-weight: normal;">/ person</span></h3>
          <p class="text-muted" style="margin-bottom: 1.5rem;">Duration: ${tour.durationDays} Days / ${tour.durationNights} Nights</p>
          <button class="btn btn-primary btn-block btn-lg" onclick="bookTour('${tour.id}')">Instant Book Now</button>
        </div>
      </aside>
    </div>
  `;
}

function bookTour(tourId) {
  alert('Tour booked successfully! Added to your dashboard.');
  window.location.href = 'dashboard.html';
}
