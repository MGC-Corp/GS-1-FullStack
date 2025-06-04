document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset erros
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Validação
    let isValid = true;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validação do nome
    if (!name.trim()) {
        document.getElementById('name-error').textContent = 'Por favor, insira seu nome';
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    }
    
    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Por favor, insira um email válido';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }
    
    // Validação da mensagem
    if (!message.trim()) {
        document.getElementById('message-error').textContent = 'Por favor, escreva sua mensagem';
        document.getElementById('message-error').style.display = 'block';
        isValid = false;
    }
    
    // Se tudo válido, envia o formulário
    if (isValid) {
        alert('Formulário enviado com sucesso! Obrigado pelo seu contato.');
        this.reset();
    }
});