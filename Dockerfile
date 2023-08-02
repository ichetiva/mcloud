FROM python:3.11

WORKDIR /code

RUN pip install -U pipenv
COPY Pipfile* /code/
RUN pipenv install --system --deploy --ignore-pipfile

COPY src /code/
