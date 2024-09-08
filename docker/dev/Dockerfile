FROM python:3.12.3-slim

# Python environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV UV_PROJECT_ENVIRONMENT="/usr/local/"

# Update OS
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    supervisor \
    nano \
    gdal-bin \
    && rm -rf /var/lib/apt/lists/*

# Create dir and user
RUN mkdir -p /home/app/backend && mkdir -p /home/app/logs
RUN addgroup --system app && adduser --system --group app
WORKDIR /home/app

# Install dependencies with UV
COPY ./backend/pyproject.toml ./backend/uv.lock ./
RUN pip install --upgrade pip \
    && pip install uv \
    && uv sync --frozen \
    && rm -rf uv.lock pyproject.toml

# Copy backend and change ownership
COPY ./backend ./backend
RUN chown -R app:app /home/app
USER app

# Run the app
EXPOSE 8000
CMD supervisord -c ./backend/supervisord.conf
