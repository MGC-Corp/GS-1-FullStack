import { userService, locationService } from './apiServices.js';


// listener 
document.addEventListener('DOMContentLoaded', () => {


    const openLoginBtn = document.getElementById('openLoginModalBtn');
    const closeLoginBtn = document.getElementById('closeLoginModalBtn');
    const loginModalOverlay = document.getElementById('loginModalOverlay');

    const openModal = () => {
        if (loginModalOverlay) loginModalOverlay.classList.add('active');
    };
    const closeModal = () => {
        if (loginModalOverlay) loginModalOverlay.classList.remove('active');
    };

    if (openLoginBtn) {
        openLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', closeModal);
    }
    if (loginModalOverlay) {
        loginModalOverlay.addEventListener('click', (e) => {
            if (e.target === loginModalOverlay) closeModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModalOverlay && loginModalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    //Navegação Suave (Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                return;
            }
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    //Menu Mobile
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }


    const loginForm = document.getElementById('loginFormModal');
    if (loginForm) {
        const loginEmailInput = document.getElementById('loginEmailModal');
        const loginSenhaInput = document.getElementById('loginSenhaModal');
        const loginErrorDiv = document.getElementById('loginModalError');
        const loginSuccessDiv = document.getElementById('loginModalSuccess');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginEmailInput.value.trim();
            const senha = loginSenhaInput.value.trim();
            
            loginErrorDiv.style.display = 'none';
            loginSuccessDiv.style.display = 'none';

            try {

                const result = await userService.login(email, senha);
                localStorage.setItem('userId', result.id);

                loginSuccessDiv.textContent = 'Login bem-sucedido! Redirecionando...';
                loginSuccessDiv.style.display = 'block';
                
                setTimeout(() => window.location.reload(), 1500);
            } catch (err) {
                loginErrorDiv.style.display = 'block';
                loginErrorDiv.textContent = err.message || 'Email ou senha inválidos.';
            }
        });
    }

    //FORMULÁRIO DE CADASTRO
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        const cadEmailInput = document.getElementById('cadEmail');
        const cadSenhaInput = document.getElementById('cadSenha');
        const cadLocaisInput = document.getElementById('cadLocais');
        const cadastroErrorDiv = document.getElementById('cadastroError');
        const cadastroSuccessDiv = document.getElementById('cadastroSuccess');

        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            //limpeza
            cadastroErrorDiv.style.display = 'none';
            cadastroSuccessDiv.style.display = 'none';

            const email = cadEmailInput.value.trim();
            const senha = cadSenhaInput.value.trim();
            const locaisRaw = cadLocaisInput.value.trim();
            
            //validação
            if (!email || senha.length < 6 || !locaisRaw) {
                 cadastroErrorDiv.textContent = 'Verifique os campos. A senha deve ter no mínimo 6 caracteres.';
                 cadastroErrorDiv.style.display = 'block';
                 return;
            }
            const locaisArr = locaisRaw.split(',').map(s => s.trim()).filter(s => s.length > 0);
            if (locaisArr.length === 0 || locaisArr.length > 3) {
                 cadastroErrorDiv.textContent = 'Informe de 1 a 3 locais válidos.';
                 cadastroErrorDiv.style.display = 'block';
                 return;
            }

            try {
                const result = await userService.register(email, senha, locaisArr);
                localStorage.setItem('userId', result.id);
                cadastroSuccessDiv.style.display = 'block';
                
                cadastroForm.reset();
                setTimeout(() => window.location.reload(), 2000);
            } catch (err) {
                cadastroErrorDiv.style.display = 'block';
                cadastroErrorDiv.textContent = err.message || 'Erro ao cadastrar. O email pode já estar em uso.';
            }
        });
    }

});