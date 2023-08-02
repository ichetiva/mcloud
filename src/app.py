from fastapi import FastAPI

from apps import auth, users, subscribers

app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(subscribers.router)
