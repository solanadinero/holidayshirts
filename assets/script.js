document.addEventListener("DOMContentLoaded", () => {
  const holiday_section = document.querySelectorAll(".holiday_section");
  
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

  holiday_section.forEach((section) => {
    section.classList.add("hidden"); // Initial hidden state
    observer.observe(section);
  });
});
