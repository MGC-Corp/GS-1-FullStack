// scripts/handlers.js
import { userService } from './apiServices.js';

// -----------------------------
//   HANDLER DO LOGIN NA NAVBAR
// -----------------------------
const loginBtn = document.getElementById('loginBtn');
const loginEmailInput = document.getElementById('loginEmail');
const loginSenhaInput = document.getElementById('loginSenha');
const loginErrorDiv = document.getElementById('loginError');

loginBtn.addEventListener('click', async () => {
  const email = loginEmailInput.value.trim();
  const senha = loginSenhaInput.value.trim();
  loginErrorDiv.style.display = 'none';
  loginErrorDiv.textContent = '';

  if (!email || !senha) {
    loginErrorDiv.style.display = 'block';
    loginErrorDiv.textContent = 'Preencha email e senha.';
    return;
  }
  try {
    const result = await userService.login(email, senha);
    // Salva o ObjectID retornado no localStorage
    localStorage.setItem('userId', result.id);
    // Você pode redirecionar ou apenas recarregar a página
    window.location.reload();
  } catch (err) {
    loginErrorDiv.style.display = 'block';
    loginErrorDiv.textContent = 'Email ou senha inválidos.';
  }
});


// -----------------------------
//   HANDLER DO FORMULÁRIO DE CADASTRO
// -----------------------------
const cadastroForm = document.getElementById('cadastroForm');
const cadEmailInput     = document.getElementById('cadEmail');
const cadSenhaInput     = document.getElementById('cadSenha');
const cadLocaisInput    = document.getElementById('cadLocais');
const cadEmailErrorDiv  = document.getElementById('cadEmailError');
const cadSenhaErrorDiv  = document.getElementById('cadSenhaError');
const cadLocaisErrorDiv = document.getElementById('cadLocaisError');
const cadastroErrorDiv  = document.getElementById('cadastroError');
const cadastroSuccessDiv= document.getElementById('cadastroSuccess');

cadastroForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Limpa mensagens de erro
  cadEmailErrorDiv.textContent  = '';
  cadSenhaErrorDiv.textContent  = '';
  cadLocaisErrorDiv.textContent = '';
  cadastroErrorDiv.style.display = 'none';
  cadastroErrorDiv.textContent = '';
  cadastroSuccessDiv.style.display = 'none';

  const email      = cadEmailInput.value.trim();
  const senha      = cadSenhaInput.value.trim();
  const locaisRaw  = cadLocaisInput.value.trim();

  let valid = true;
  if (!email) {
    cadEmailErrorDiv.textContent = 'Email obrigatório.';
    valid = false;
  }
  if (!senha) {
    cadSenhaErrorDiv.textContent = 'Senha obrigatória.';
    valid = false;
  }
  if (!locaisRaw) {
    cadLocaisErrorDiv.textContent = 'Informe ao menos um local.';
    valid = false;
  }

  // Transforma a string de "Rua A, Praça B" em array ["Rua A","Praça B"]
  const locaisArr = locaisRaw
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (locaisArr.length === 0) {
    cadLocaisErrorDiv.textContent = 'Informe ao menos um local válido.';
    valid = false;
  }
  if (locaisArr.length > 3) {
    cadLocaisErrorDiv.textContent = 'No máximo 3 locais.';
    valid = false;
  }
  if (!valid) return;

  try {
    const result = await userService.register(email, senha, locaisArr);
    // Ao cadastrar, salvo o _id no localStorage
    localStorage.setItem('userId', result.id);
    cadastroSuccessDiv.style.display = 'block';
    // Limpa formulário
    cadEmailInput.value   = '';
    cadSenhaInput.value   = '';
    cadLocaisInput.value  = '';
  } catch (err) {
    cadastroErrorDiv.style.display = 'block';
    cadastroErrorDiv.textContent = err.message || 'Erro ao cadastrar.';
  }
});
