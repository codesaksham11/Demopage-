document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageIndicator = document.getElementById('page-indicator');
    let currentPage = 0;
    const totalPages = pages.length;

    // Initial setup
    updatePage();

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updatePage();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updatePage();
        }
    });

    // Swipe functionality (mobile only)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;

        // Horizontal swipe (left/right)
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0 && currentPage < totalPages - 1) {
                currentPage++;
                updatePage();
            } else if (dx > 0 && currentPage > 0) {
                currentPage--;
                updatePage();
            }
        }
        // Vertical swipe (down)
        else if (dy > 50) {
            window.scrollBy({ top: 300, behavior: 'smooth' }); // Scrolls down 300px
        }
    }

    function updatePage() {
        pages.forEach((page, index) => {
            page.style.display = index === currentPage ? 'block' : 'none';
        });
        pageIndicator.textContent = `${currentPage + 1}-${totalPages}`;
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }
});
