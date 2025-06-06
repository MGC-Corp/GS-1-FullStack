Claro\! Aqui está um `README.md` completo e bem formatado, pronto para ser copiado e colado diretamente no seu repositório GitHub. Ele combina as informações que você forneceu em um formato claro e profissional.

-----

# GS-1 FullStack (API)

Este README explica como clonar o repositório e executar a API desenvolvida em **FastAPI** para o projeto GS-1 FullStack.

-----

## Sumário

1.  [Descrição do Projeto](https://www.google.com/search?q=%23descri%C3%A7%C3%A3o-do-projeto)
2.  [Pré-requisitos](https://www.google.com/search?q=%23pr%C3%A9-requisitos)
3.  [Como Rodar a API](https://www.google.com/search?q=%23como-rodar-a-api)
      - [1. Clonar o Repositório](https://www.google.com/search?q=%231-clonar-o-reposit%C3%B3rio)
      - [2. Criar o Ambiente Virtual (venv)](https://www.google.com/search?q=%232-criar-o-ambiente-virtual-venv)
      - [3. Instalar as Dependências](https://www.google.com/search?q=%233-instalar-as-depend%C3%AAncias)
      - [4. Rodar o Servidor FastAPI](https://www.google.com/search?q=%234-rodar-o-servidor-fastapi)
4.  [Verificando a API](https://www.google.com/search?q=%23verificando-a-api)
5.  [CORS (Cross-Origin Resource Sharing)](https://www.google.com/search?q=%23cors-cross-origin-resource-sharing)

-----

## Descrição do Projeto

O **GS-1 FullStack (API)** é o núcleo de backend de um sistema que utiliza **FastAPI**. Ele fornece endpoints RESTful projetados para serem consumidos tanto pelo frontend (desenvolvido com HTML/CSS/JS) quanto por outras aplicações externas.

-----

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

  - **Git**
  - **Python 3.8+** (com `pip` disponível no seu PATH)

Ferramentas opcionais para testes:

  - **cURL** ou **Postman**

-----

## Como Rodar a API

Siga os passos abaixo para configurar e executar o servidor da API em seu ambiente local.

### 1\. Clonar o Repositório

Abra seu terminal (Git Bash, PowerShell, Terminal do Linux/macOS) e execute os seguintes comandos:

```bash
# Clone o repositório do GitHub
git clone https://github.com/MGC-Corp/GS-1-FullStack.git

# Navegue até a pasta do backend
cd "GS-1-FullStack/Back"
```

O comando `git clone` baixa o conteúdo do repositório, e o `cd` o posiciona no diretório correto para iniciar a configuração da API.

### 2\. Criar o Ambiente Virtual (venv)

É uma boa prática usar um ambiente virtual para isolar as dependências do projeto.

  * **Linux/macOS**

    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

  * **Windows (PowerShell)**

    ```powershell
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    ```

  * **Windows (CMD)**

    ```bat
    python -m venv venv
    venv\Scripts\activate.bat
    ```

Após a ativação, você verá `(venv)` no início da linha do seu terminal, indicando que o ambiente virtual está ativo.

### 3\. Instalar as Dependências

Com o ambiente virtual ativado, instale todas as bibliotecas necessárias listadas no arquivo `requirements.txt`.

```bash
# Garanta que o pip está atualizado
pip install --upgrade pip

# Instale as dependências do projeto
pip install -r requirements.txt
```

### 4\. Rodar o Servidor FastAPI

Finalmente, inicie o servidor de desenvolvimento Uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

  - `main:app`: Indica que o Uvicorn deve procurar no arquivo `main.py` a instância da aplicação chamada `app`.
  - `--reload`: Ativa a recarga automática do servidor sempre que uma alteração no código for salva.
  - `--host 0.0.0.0 --port 8000`: Expõe a API na porta `8000`, tornando-a acessível em `http://localhost:8000`.

Você verá uma saída no terminal confirmando que o servidor está em execução:

```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [XXXXX]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

-----

## Verificando a API

Com o servidor rodando, você pode verificar se tudo está funcionando corretamente. Abra seu navegador ou use uma ferramenta como o Postman para acessar os seguintes endereços:

  - **Endpoint Raiz:**

      - [http://localhost:8000/](https://www.google.com/search?q=http://localhost:8000/)

  - **Documentação Interativa (Swagger UI):**

      - [http://localhost:8000/docs](https://www.google.com/search?q=http://localhost:8000/docs)

  - **Documentação Alternativa (ReDoc):**

      - [http://localhost:8000/redoc](https://www.google.com/search?q=http://localhost:8000/redoc)

Se você consegue ver as rotas na documentação e testá-las com sucesso, a API está configurada corretamente.

-----

## CORS (Cross-Origin Resource Sharing)

Esta API vem pré-configurada com um middleware CORS para permitir requisições de qualquer origem (`allow_origins=["*"]`), o que é útil para o desenvolvimento local quando o frontend está rodando em uma porta diferente. Para ambientes de produção, é recomendado restringir a lista de origens permitidas.
