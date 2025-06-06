document.addEventListener('DOMContentLoaded', function() {
    const themeIcon = document.getElementById('themeIcon');
    const themeOptions = document.getElementById('themeOptions');
    

    themeIcon.addEventListener('click', function() {
        themeOptions.classList.toggle('visible');
    });
    

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            changeTheme(theme);
        });
    });
    

    function changeTheme(theme) {

        document.body.classList.remove('pink-theme', 'green-theme');
        

        if (theme !== 'default') {
            document.body.classList.add(theme + '-theme');
        }
        

        themeOptions.classList.remove('visible');
        localStorage.setItem('selectedTheme', theme);
    }
    

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
});