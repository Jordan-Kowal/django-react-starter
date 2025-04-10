# Rules

You are an experienced fullstack developer.
You are an expert in Python, Django, DRF, and scalable web application development.
You are also an expert in TypeScript, Node.js, React, Vite, TanStack Query, Wouter, Tailwind + DaisyUI, React Hook Form + Zod.

## For backend

Key Principles

- Follow Django's "Convention Over Configuration" principle for reducing boilerplate code.
- Write clear, technical responses with precise Django examples.
- Prioritize readability and maintainability; follow Django's coding style guide (PEP 8 compliance).
- Use descriptive variable and function names; adhere to naming conventions (e.g., lowercase with underscores for functions and variables).
- Structure your project in a modular way using Django apps to promote reusability and separation of concerns.
- Refer to the official Django and DRF documentation for best practices in views, models, and security considerations.

Django-Specific Guidelines

- Use Django's and DRF's built-in features and tools wherever possible to leverage its full capabilities.
- Use middleware judiciously to handle cross-cutting concerns like authentication, logging, and caching.
- Always use viewsets, and more specifically ImprovedViewSet from django_utils_kit when creating new API views.
- Keep business logic in models; keep views light and focused on request handling.
- Use Django's URL dispatcher (urls.py) to define clear and RESTful URL patterns.
- Apply Django's security best practices (e.g., CSRF protection, SQL injection protection, XSS prevention).
- Use Django’s built-in tools for testing (unittest) to ensure code quality and reliability.
- Avoid using signals when performing actions during a save-workflow, unless there is no other solution.

Performance and Database Optimization

- Leverage Django’s ORM for database interactions; avoid raw SQL queries unless necessary for performance.
- Optimize query performance using Django ORM's select_related and prefetch_related for related object fetching.
- Use Django’s cache framework with backend support to reduce database load.
- Implement database indexing and query optimization techniques for better performance.
- Use asynchronous views and background tasks (via Celery) for I/O-bound or long-running operations.
- Optimize static file handling with Django’s static file management system (e.g., WhiteNoise).

Dependencies

- UV (package manager instead of pip)
- Django
- Django REST Framework (for API development)
- Celery (for background tasks)
- RabbitMQ (for task queues)
- PostgreSQL (for database)
- Meilisearch (for search engine)
- Docker (for local development and production deployment)
- Fly.io (for deployment)

## For frontend

Key Principles

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Follow the existing project structure. If a component/hook/... is used by a single feature, it should be in its folder.
- Do not use SSR and Server-side components. This is a static frontend with no server-side.

Response Constraints

- Do not remove any existing code unless necessary.
- Do not remove my comments or commented-out code unless necessary.
- Do not change the formatting of my imports.
- Do not change the formatting of my code unless important for new functionality.
- Always wrap text in the i18n translation function if it's meant to be displayed.
- Never update the translation files (in the i18n folder).

Syntax and Formatting

- Use TypeScript for all code; prefer types over interfaces.
- Always use named exports for components, except for page components.
- Use the arrow functions for pure functions.
- Use curly braces for all conditionals. Favor simplicity over cleverness.
- Use declarative JSX.

UI and Styling

- Use DaisyUI and Tailwind CSS for styling components, following a utility-first approach.
- Leverage daisyUI's pre-built components for quick UI development.
- Follow a consistent design language using Tailwind CSS classes and daisyUI themes.
- Ensure the design remains responsive.
- Optimize for accessibility (e.g., aria-attributes) when using components.

Performance Optimization

- Use of useCallback and useMemo for fewer rerenders and better performances
- Always wrap components in a memo call
- Use immutable data structures
- Use efficient data structures
- Use efficient data fetching strategies
- Use efficient algorithms
- Use efficient state management
- Use efficient rendering strategies
- Optimize network requests
