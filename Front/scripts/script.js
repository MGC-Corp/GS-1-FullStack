//Deixar a rolagem melhor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const elementTop = targetElement.offsetTop;
            const elementHeight = targetElement.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollPosition = elementTop - (windowHeight / 2) + (elementHeight / 2) + 100;

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
});

