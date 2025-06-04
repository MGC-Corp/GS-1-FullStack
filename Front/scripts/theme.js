document.addEventListener('DOMContentLoaded', function() {
    const themeIcon = document.getElementById('themeIcon');
    const themeOptions = document.getElementById('themeOptions');
    
    // Toggle theme options
    themeIcon.addEventListener('click', function() {
        themeOptions.style.display = themeOptions.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Apply theme
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            changeTheme(theme);
        });
    });
    
    // Change theme function
    function changeTheme(theme) {
        document.body.className = '';
        if (theme !== 'default') {
            document.body.classList.add(theme + '-theme');
        }
        themeOptions.style.display = 'none';
        localStorage.setItem('selectedTheme', theme);
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
});