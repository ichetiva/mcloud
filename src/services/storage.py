import hashlib
from datetime import datetime

import boto3
from fastapi import UploadFile
from asgiref.sync import sync_to_async

import config


class StorageService:
    def __init__(self) -> None:
        self.session = boto3.Session(
            YOS_access_key_id=config.YOS_ACCESS_KEY_ID,
            YOS_secret_access_key=config.YOS_SECRET_ACCESS_KEY,
            region_name=config.YOS_REGION_NAME,
        )
        self.s3 = self.session.client(
            service_name="s3",
            endpoint_url=config.YOS_ENDPOINT_URL,
        )

    def _get_obj_name(self, user_id: int, title: str, extension: str) -> str:
        hashed_title = hashlib.md5(title.encode()).hexdigest()
        now = datetime.now()
        return (
            hashlib.md5(
                (
                    f"{user_id}_{hashed_title}_{now.day}_"
                    f"{now.month}_{now.year}_{now.hour}_"
                    f"{now.minute}_{now.second}"
                ).encode()
            ).hexdigest()
            + "."
            + extension
        )

    @sync_to_async
    def save_poster(self, file: UploadFile, user_id: int, title: str):
        obj_name = self._get_obj_name(user_id, title, file.filename.split(".")[-1])
        self.s3.upload_fileobj(file.file, config.YOS_POSTERS_BUCKET_NAME, obj_name)
        return f"{config.YOS_ENDPOINT_URL}/{config.YOS_POSTERS_BUCKET_NAME}/{obj_name}"

    @sync_to_async
    def save_track(self, file: UploadFile, user_id: int, title: str):
        obj_name = self._get_obj_name(user_id, title, file.filename.split(".")[-1])
        self.s3.upload_fileobj(file.file, config.YOS_TRACKS_BUCKET_NAME, obj_name)
        return f"{config.YOS_ENDPOINT_URL}/{config.YOS_TRACKS_BUCKET_NAME}/{obj_name}"
