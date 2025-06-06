// Navegação suave
// Menu mobile
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');

if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
        // Apenas abre/fecha o menu ao clicar no ícone
        mainNav.classList.toggle('active');
    });
}


document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');


        if (href.startsWith('#')) {

            e.preventDefault();

            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header
                    behavior: 'smooth'
                });
            }
        }
        

        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
    });
});




mobileToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});




window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.text-block, .image-block').forEach(block => {
    observer.observe(block);
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});
