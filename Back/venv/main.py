# -*- coding: utf-8 -*-

# Importações necessárias
from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from pydantic import BaseModel
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware

# --- Conexão com o Banco de Dados ---
MONGO_URL = 'mongodb+srv://murilo:pudim123@enchentes.gjqu7iq.mongodb.net/?retryWrites=true&w=majority&appName=Enchentes'
client = AsyncIOMotorClient(MONGO_URL)
db = client["Enchentes"]
users_collection = db["user"]

# Instância do FastAPI
app = FastAPI()

# --- Configuração de CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Modelos de Dados (Pydantic) ---

class User(BaseModel):
    """Modelo para validação dos dados de um novo usuário."""
    email: str
    # CORRIGIDO: Revertido para 'senha' para garantir compatibilidade com o front-end
    senha: str
    # CORRIGIDO: Sintaxe ajustada para a versão 1.x do Pydantic
    # A restrição 'max_items' é passada diretamente para a função conlist.
    locais: List

class LoginRequest(BaseModel):
    """Modelo para a requisição de login."""
    email: str
    # CORRIGIDO: Revertido para 'senha'
    senha: str

class LocalUpdateRequest(BaseModel):
    """Modelo para adicionar ou remover um local."""
    Local: str


# --- Endpoints da API ---

@app.post("/postUser", status_code=201)
async def create_user(user_data: User):
    """Cria um novo usuário no banco de dados após validar a duplicidade de e-mail."""
    # Verifica se um usuário com o mesmo e-mail já existe
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Este e-mail já está cadastrado.")

    # Insere o novo usuário no banco de dados
    result = await users_collection.insert_one(user_data.dict())
    return {"id": str(result.inserted_id)}


@app.post("/login")
async def login(request: LoginRequest):
    """Autentica um usuário e retorna seu ID em caso de sucesso."""
    usuario_db = await users_collection.find_one({"email": request.email})

    # CORRIGIDO: Validação usando o campo 'senha'
    if not usuario_db or usuario_db["senha"] != request.senha:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")

    return {"id": str(usuario_db["_id"])}


@app.get("/getLocais/{user_id}")
async def get_user_locations(user_id: str):
    """Busca e retorna a lista de locais de um usuário."""
    try:
        obj_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de usuário inválido.")

    result = await users_collection.find_one({"_id": obj_id})
    if not result:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    return result.get("locais", [])


@app.put("/addLocal/{user_id}")
async def add_location_to_user(user_id: str, data: LocalUpdateRequest):
    """Adiciona um novo local à lista de um usuário, evitando duplicatas e respeitando o limite de 3."""
    try:
        obj_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de usuário inválido.")

    user = await users_collection.find_one({"_id": obj_id})
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    if len(user.get("locais", [])) >= 3:
        raise HTTPException(status_code=400, detail="Limite de 3 locais salvos atingido.")

    # $addToSet: Adiciona o item apenas se ele não existir na lista
    await users_collection.find_one_and_update(
        {"_id": obj_id},
        {"$addToSet": {"locais": data.Local}}
    )
    
    return {"status": "sucesso", "detail": "Local adicionado."}


@app.put("/delLocal/{user_id}")
async def delete_location_from_user(user_id: str, data: LocalUpdateRequest):
    """Remove um local da lista de um usuário."""
    try:
        obj_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="ID de usuário inválido.")

    # $pull: Remove todas as ocorrências do item da lista
    result = await users_collection.find_one_and_update(
        {"_id": obj_id},
        {"$pull": {"locais": data.Local}},
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    return {"status": "sucesso", "detail": "Local removido."}