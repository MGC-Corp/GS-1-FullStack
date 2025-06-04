from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from pydantic import BaseModel, conlist, Field
from bson import ObjectId

print("funfando")

MONGO_URL = 'mongodb+srv://murilo:pudim123@enchentes.gjqu7iq.mongodb.net/?retryWrites=true&w=majority&appName=Enchentes'
client = AsyncIOMotorClient(MONGO_URL)
db = client["Enchentes"]  

users = db["user"]

class User(BaseModel):
    email: str
    senha: str
    locais: list[str] = Field(..., max_length=3)

app = FastAPI()


@app.post("/postUser")
async def add_item(item: User):  
    result = await users.insert_one(item.dict())  
    return {"id": str(result.inserted_id)}


@app.get("/getLocais/{id}")
async def get_locais(id: str):
    obj_id = ObjectId(id)
    result = await users.find_one({"_id": obj_id})
    if not result:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    locais = result["locais"]
    return locais


class Local(BaseModel):
    Local: str


@app.put("/addLocal/{id}")
async def add_local(id: str, data: Local):
    obj_id = ObjectId(id)
    updated_user = await users.find_one_and_update(
        {"_id": obj_id},
        {"$push":{"locais": data.Local}},
        )
    
    if updated_user:
        updated_user["_id"] = str(updated_user["_id"])
        return updated_user
    else:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")



@app.put("/delLocal/{id}")
async def add_local(id: str, data: Local):
    obj_id = ObjectId(id)
    updated_user = await users.find_one_and_update(
        {"_id": obj_id},
        {"$pull":{"locais": data.Local}},
        )
    
    if updated_user:
        updated_user["_id"] = str(updated_user["_id"])
        return updated_user
    else:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
