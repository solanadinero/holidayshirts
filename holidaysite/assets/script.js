document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-up");
        observer.unobserve(entry.target); // Optional: stop observing once visible
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the card is visible
  });

  cards.forEach((holiday_section) => {
    card.classList.add("hidden"); // Initial hidden state
    observer.observe(card);
  });
});