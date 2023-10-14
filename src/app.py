from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from apps import auth, users, subscribers, tracks, albums, playlists

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(subscribers.router)
app.include_router(tracks.router)
app.include_router(albums.router)
app.include_router(playlists.router)
