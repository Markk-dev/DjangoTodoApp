# Django Todo App

A modern, clean todo application built with Django featuring task descriptions, filtering, and pagination.

## Features

- ✅ Add tasks with optional descriptions
- ✏️ Edit and delete tasks
- ☑️ Mark tasks as complete/incomplete
- 🔍 Filter by All, Pending, or Completed
- 📄 Pagination (5 tasks per page)
- 🗑️ Clear all tasks
- 🎨 Clean, modern UI with Plus Jakarta Sans font

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Markk-dev/DjangoTodoApp.git
cd DjangoTodoApp
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- Mac/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create a superuser (optional, for admin access):
```bash
python manage.py createsuperuser
```

7. Run the development server:
```bash
python manage.py runserver
```

8. Open your browser and go to:
```
http://127.0.0.1:8000/
```

## Admin Panel

Access the admin panel at `http://127.0.0.1:8000/admin/` to manage todos directly.

## Technologies Used

- Django 5.2.11
- Python 3.11
- SQLite (default database)
- Plus Jakarta Sans font
- Vanilla JavaScript

## Project Structure

```
DjangoTodoApp/
├── testApp/              # Main app
│   ├── migrations/       # Database migrations
│   ├── static/          # Static files (CSS)
│   ├── templates/       # HTML templates
│   ├── models.py        # TodoItem model
│   ├── views.py         # View functions
│   └── urls.py          # URL routing
├── testproject/         # Project settings
├── manage.py            # Django management script
└── requirements.txt     # Python dependencies
```

## License

MIT License
