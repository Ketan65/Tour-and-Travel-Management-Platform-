/**
 * WanderWave - Global App Logic & UI Controller
 * Assigned: Member 4 (feature/frontend)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedTours();
  setupMobileNav();
});

function renderFeaturedTours() {
  const container = document.getElementById('featuredToursContainer');
  if (!container || typeof TOURS_DATA === 'undefined') return;

  const featured = TOURS_DATA.filter(t => t.featured).slice(0, 3);
  container.innerHTML = featured.map(tour => `
    <div class="card">
      <div class="card-img-wrapper">
        <img src="${tour.image}" alt="${tour.title}">
        <span class="badge badge-primary" style="position: absolute; top: 1rem; left: 1rem;">${tour.badge}</span>
      </div>
      <div class="card-body">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="text-muted" style="font-size: 0.85rem;">📍 ${tour.destination}, ${tour.country}</span>
          <span class="rating">⭐ ${tour.rating}</span>
        </div>
        <h3 class="card-title" style="font-size: 1.15rem;">${tour.title}</h3>
        <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 1.25rem;">${tour.durationDays} Days / ${tour.durationNights} Nights • ${tour.category}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 1rem;">
          <div>
            <span style="font-size: 0.8rem; color: var(--color-muted);">From</span>
            <span style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary);">$${tour.price}</span>
          </div>
          <a href="pages/tour-details.html?id=${tour.id}" class="btn btn-primary btn-sm">View Details</a>
        </div>
      </div>
    </div>
  `).join('');
}

function setupMobileNav() {
  const toggle = document.getElementById('menuToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      if (links) links.classList.toggle('active');
    });
  }
}
