-----

# GS-1 FullStack (API e Front-end)

Este README explica como clonar o repositório e executar as partes de front-end e back-end (API em **FastAPI**) do projeto GS-1 FullStack.

-----

## 🚀 Visão Geral da Execução

Este projeto foi estruturado para atender a diferentes disciplinas. Siga a instrução correspondente ao seu objetivo:

  * **Para a disciplina de Front-End:**
    Todos os requisitos são atendidos com a **página estática**. Basta abrir os arquivos `.html` diretamente no navegador. A interatividade e o design são totalmente funcionais sem a necessidade de um servidor.

  * **Para a disciplina de Web-Dev :**
    Todos os requisitos estão sendo atentidos, para que as funcionalidades de integração funcionem é necessário rodar o front-end com um servidor local, como a extensão **Live Server** do VS Code. Isso permite que a página faça requisições.

  * **Para a Aplicação Completa (Front + Back):**
    Para usufruir de **todas as funcionalidades**, como o envio e o salvamento de dados, é **essencial** executar o **back-end (API FastAPI)** e o **front-end (com Live Server)** simultaneamente.

-----

## Sumário

1.  [Como Rodar a Aplicação](https://www.google.com/search?q=%23como-rodar-a-aplica%C3%A7%C3%A3o)
      - [Rodando o Front-end (Live Server)](https://www.google.com/search?q=%23rodando-o-front-end-live-server)
      - [Rodando o Back-end (API FastAPI)](https://www.google.com/search?q=%23rodando-o-back-end-api-fastapi)
2.  [Pré-requisitos do Back-end](https://www.google.com/search?q=%23pr%C3%A9-requisitos-do-back-end)
3.  [Verificando a API](https://www.google.com/search?q=%23verificando-a-api)
4.  [CORS (Cross-Origin Resource Sharing)](https://www.google.com/search?q=%23cors-cross-origin-resource-sharing)

-----

## Como Rodar a Aplicação

### Rodando o Front-end (Live Server)

1.  **Instale a extensão `Live Server`** no Visual Studio Code.
2.  Abra a pasta do projeto (`GS-1-FullStack`) no VS Code.
3.  Navegue até a pasta `Front-end`.
4.  Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.

Isso iniciará um servidor local (geralmente em `http://127.0.0.1:5500`) e abrirá a página no seu navegador.

### Rodando o Back-end (API FastAPI)

Siga os passos abaixo para configurar e executar o servidor da API.

#### 1\. Clonar o Repositório

Se ainda não o fez, abra seu terminal e execute:

```bash
# Clone o repositório do GitHub
git clone https://github.com/MGC-Corp/GS-1-FullStack.git

# Navegue até a pasta do backend
cd "GS-1-FullStack/Back"
```

#### 2\. Criar o Ambiente Virtual (venv)

É uma boa prática usar um ambiente virtual para isolar as dependências.

  * **Linux/macOS**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
  * **Windows (PowerShell/CMD)**
    ```powershell
    # PowerShell
    python -m venv venv
    .\venv\Scripts\Activate.ps1

    # CMD
    python -m venv venv
    venv\Scripts\activate.bat
    ```

Após a ativação, você verá `(venv)` no início da linha do seu terminal.

#### 3\. Instalar as Dependências

Com o ambiente virtual ativo, instale as bibliotecas necessárias:

```bash
# Garanta que o pip está atualizado
pip install --upgrade pip

# Instale as dependências do projeto
pip install -r requirements.txt
```

#### 4\. Rodar o Servidor FastAPI

Finalmente, inicie o servidor de desenvolvimento Uvicorn:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

O terminal confirmará que o servidor está rodando em `http://localhost:8000`.

-----

## Pré-requisitos do Back-end

  - **Git**
  - **Python 3.8+** (com `pip` disponível no PATH)

-----

## Verificando a API

Com o servidor rodando, você pode acessar os seguintes endereços para verificar seu funcionamento e ver a documentação das rotas:

  - **Documentação Interativa (Swagger UI):**
      - [http://localhost:8000/docs](http://localhost:8000/docs)
  - **Documentação Alternativa (ReDoc):**
      - [http://localhost:8000/redoc](http://localhost:8000/redoc)

-----

## CORS (Cross-Origin Resource Sharing)

Esta API vem pré-configurada para permitir requisições de qualquer origem (`*`), facilitando a comunicação com o front-end rodando via Live Server. Em produção, é recomendado restringir essa configuração para domínios específicos.
