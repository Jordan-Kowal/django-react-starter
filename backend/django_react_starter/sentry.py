# Built-in
from typing import Any, Dict


def traces_sampler(sampling_context: Dict[str, Any]) -> float:
    path_info = sampling_context.get("wsgi_environ", {}).get("PATH_INFO")
    # Ignore anything not related to the API
    if not path_info.startswith("/api/v1/"):
        return 0.0
    # Ignore healthchecks
    if path_info.startswith("/api/v1/health/"):
        return 0.0
    # Ignore auth checks
    if path_info.startswith("/api/v1/auth/check/"):
        return 0.0
    # Sample 20% of the requests
    return 0.2
