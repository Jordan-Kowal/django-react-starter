# Built-in
import sys
import time

# Django
from django.db import connections
from django.db.utils import OperationalError


def main() -> None:
    """Wait for database to be available"""
    source = sys.argv[1]
    db_conn = connections["default"]
    up = False
    while not up:
        try:
            db_conn.cursor()
            break
        except OperationalError as e:
            print(e)
            print(f"[{source}] Database unavailable, waiting...")
            time.sleep(2)


if __name__ == "__main__":
    main()
