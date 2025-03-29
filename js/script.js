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
    let touchMoveX = 0;
    let touchMoveY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchmove', (e) => {
        touchMoveX = e.changedTouches[0].screenX;
        touchMoveY = e.changedTouches[0].screenY;

        const dx = touchMoveX - touchStartX;
        const dy = touchMoveY - touchStartY;

        // Vertical scrolling
        if (Math.abs(dy) > Math.abs(dx)) {
            e.preventDefault(); // Prevent pull-to-refresh or other defaults
            window.scrollBy({ top: -dy / 2, behavior: 'auto' }); // Smooth scrolling based on finger movement
        }
    });

    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;

        // Horizontal swipe (left/right) for page navigation
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0 && currentPage < totalPages - 1) {
                currentPage++;
                updatePage();
            } else if (dx > 0 && currentPage > 0) {
                currentPage--;
                updatePage();
            }
        }
    });

    function updatePage() {
        pages.forEach((page, index) => {
            page.style.display = index === currentPage ? 'block' : 'none';
        });
        pageIndicator.textContent = `${currentPage + 1}-${totalPages}`;
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }
});
