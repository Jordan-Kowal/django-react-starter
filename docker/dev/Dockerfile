FROM python:3.12.2-slim

# Python environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Update OS
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    supervisor \
    nano \
    gdal-bin \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY ./backend/requirements.txt ./backend/requirements-dev.txt /tmp/
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r /tmp/requirements.txt -r /tmp/requirements-dev.txt \
    && rm -rf /tmp/requirments.txt /tmp/requirments-dev.txt

# Create dir and user
RUN mkdir -p /home/app/backend && mkdir -p /home/app/logs
RUN addgroup --system app && adduser --system --group app
WORKDIR /home/app

# Copy backend
COPY ./backend ./backend

# Change ownership
RUN chown -R app:app /home/app
USER app

# Run the app
EXPOSE 8000
CMD supervisord -c ./backend/supervisord.conf
