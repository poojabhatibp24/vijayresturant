/**
 * Vijay Restaurant Jodhpur - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set default reservation date to today
  const resDateField = document.getElementById('resDate');
  if (resDateField) {
    const today = new Date().toISOString().split('T')[0];
    resDateField.value = today;
    resDateField.min = today;
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Navbar scroll behavior (subtle shadow increase)
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }
  });

  // Category Filtering for Traveler Menu
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.classList.remove('bg-royal-950', 'text-gold-300');
        b.classList.add('bg-white', 'text-royal-900');
      });

      // Add active to current
      btn.classList.add('active');
      btn.classList.remove('bg-white', 'text-royal-900');
      btn.classList.add('bg-royal-950', 'text-gold-300');

      const selectedCategory = btn.getAttribute('data-category');

      menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // FAQ Accordion Toggle
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('[data-lucide="chevron-down"]') || btn.querySelector('svg');

      const isHidden = content.classList.contains('hidden');

      // Close other accordions
      document.querySelectorAll('#faqAccordion > div > div').forEach(c => {
        c.classList.add('hidden');
      });
      document.querySelectorAll('#faqAccordion svg').forEach(svg => {
        svg.style.transform = 'rotate(0deg)';
      });

      if (isHidden) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  });

  // Close reservation modal on Escape key or outside click
  const reservationModal = document.getElementById('reservationModal');
  if (reservationModal) {
    reservationModal.addEventListener('click', (e) => {
      if (e.target === reservationModal) {
        closeReservationModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !reservationModal.classList.contains('hidden')) {
        closeReservationModal();
      }
    });
  }
});

// Modal Controls
function openReservationModal() {
  const modal = document.getElementById('reservationModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
  }
}

function closeReservationModal() {
  const modal = document.getElementById('reservationModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

// Reservation Form Submission -> Instant WhatsApp Chat with restaurant
function handleReservationSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('resName').value.trim();
  const outlet = document.getElementById('resOutlet').value;
  const guests = document.getElementById('resGuests').value;
  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const notes = document.getElementById('resNotes').value.trim() || 'None';

  // Construct courteous traveler reservation message
  const message = `*Table / Order Reservation Request - Vijay Restaurant Jodhpur* 🍛✨%0A%0A` +
    `👤 *Guest Name:* ${encodeURIComponent(name)}%0A` +
    `📍 *Outlet Chosen:* ${encodeURIComponent(outlet)}%0A` +
    `👥 *Party Size:* ${encodeURIComponent(guests)}%0A` +
    `📅 *Date:* ${encodeURIComponent(date)}%0A` +
    `⏰ *Time:* ${encodeURIComponent(time)}%0A` +
    `📝 *Notes / Dietary / Special Sweets (Malai Roti / Mewa Cream):* ${encodeURIComponent(notes)}%0A%0A` +
    `_Hello Vijay Restaurant team, please confirm availability. Thank you!_`;

  // Vijay Restaurant WhatsApp number (Sardarpura / Jodhpur)
  const phoneNumber = '919828660899';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');

  // Close modal and show notification
  closeReservationModal();
  alert(`Thank you, ${name}! We are opening WhatsApp to connect you directly with our manager at Vijay Restaurant Jodhpur.`);
}
