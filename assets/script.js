fetch('assets/products.json')
    .then(response => response.json())
    .then(data => {
        const grid = document.getElementById('productGrid');
        const filter = document.getElementById('holidayFilter');
        
        // Define the Intersection Observer once
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("slide-up");
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the card is visible
        });


        function renderProducts(holiday) {
            // 1. Unobserve existing cards before clearing the grid (important for filtering)
            // If we are filtering, we need to stop watching the old cards first.
            document.querySelectorAll(".card").forEach(card => {
                observer.unobserve(card);
            });
            
            // 2. Clear grid and rebuild HTML
            grid.innerHTML = '';
            let htmlContent = '';
            data.filter(p => holiday === 'all' || p.holiday === holiday)
                .forEach(p => {
                    let style = (p.style === 'gildan_64000') ? "$17.98" : "$19.98";
                    // Add the 'hidden' class here, directly in the HTML string
                    htmlContent += `
                        <a href="${p.link}" class="card hidden"> 
                            <img class="card_img" src="${p.image}">
                            <div class="card_content">
                                <h5>${p.name}</h5>
                                <p>${style}</p>
                            </div>
                        </a> `;
                });
            grid.innerHTML = htmlContent;

            // 3. OBSERVER LOGIC RUNS HERE: After cards are in the DOM!
            const newCards = document.querySelectorAll(".card");
            newCards.forEach((card) => {
                // The 'hidden' class is already applied from the HTML string above
                observer.observe(card);
            });
        }

        filter.addEventListener('change', e => renderProducts(e.target.value));
        renderProducts('all');
    });
