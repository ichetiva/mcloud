import hashlib
from pathlib import PosixPath
from datetime import datetime
from typing import Literal

import aiofiles
from fastapi import UploadFile

import config


class FileService:
    def __init__(self) -> None:
        pass

    def get_path(
        self,
        base: PosixPath,
        user_id: int,
        title: str,
        extension: str,
    ) -> str:
        """Returns filename like: 1_5d41402abc4b2a76b9719d911017c592_5_8_2023.jpg"""

        hashed_title = hashlib.md5(title.encode()).hexdigest()
        now = datetime.now()
        return base / (
            f"{user_id}_{hashed_title}_{now.day}_"
            f"{now.month}_{now.year}_{now.hour}_"
            f"{now.minute}_{now.second}.{extension}"
        )

    async def save(
        self,
        type_: Literal["poster", "track"],
        file: UploadFile,
        user_id: str,
        title: str,
    ) -> str:
        if type_ == "poster":
            base_dir = config.POSTERS_DIR
        else:
            base_dir = config.TRACKS_DIR
        path = self.get_path(base_dir, user_id, title, file.filename.split(".")[-1])
        async with aiofiles.open(path, "x") as fp:
            while chunk := await file.read(config.DEFAULT_CHUCK_SIZE):
                await fp.write(chunk)
        return path
