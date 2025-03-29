document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageIndicator = document.getElementById('page-indicator');
    let currentPage = 0;
    const totalPages = pages.length;

    updatePage();

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

    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    // Note: The problematic 'touchmove' listener that interfered with
    // vertical scrolling has been removed. Native scrolling is now used.

    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;

        // Horizontal swipe detection
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0 && currentPage < totalPages - 1) {
                currentPage++;
                updatePage();
            } else if (dx > 0 && currentPage > 0) {
                currentPage--;
                updatePage();
            }
        }

        // Reset values
        touchStartX = 0;
        touchStartY = 0;
    });

    function updatePage() {
        pages.forEach((page, index) => {
            page.style.display = index === currentPage ? 'block' : 'none';
        });
        pageIndicator.textContent = `${currentPage + 1}-${totalPages}`;
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        window.scrollTo(0, 0); // Scroll to top on page change
    }
});
