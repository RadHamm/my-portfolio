function toggleDetails(detailsId) {
    const detailsElement = document.getElementById(detailsId); // gets element from ID
    const isVisible = detailsElement.style.display === 'block'; // checks if element is visible
    detailsElement.style.display = isVisible ? 'none' : 'block'; // toggle between hidden or not
}