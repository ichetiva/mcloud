from fastapi import FastAPI

from apps import auth, users

app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)
