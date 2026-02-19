from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from django.core.paginator import Paginator
from django.http import JsonResponse
from .models import TodoItem

def home(request):
    todos_list = TodoItem.objects.all().order_by('-id')
    paginator = Paginator(todos_list, 5)
    page_number = request.GET.get('page', 1)
    todos = paginator.get_page(page_number)
    return render(request, "home.html", {"todos": todos})

def get_description(request, id):
    todo = get_object_or_404(TodoItem, id=id)
    return JsonResponse({'description': todo.description})

@require_POST
def add_todo(request):
    title = request.POST.get('title')
    description = request.POST.get('description', '')
    TodoItem.objects.create(title=title, description=description)
    return redirect('home')

@require_POST
def toggle_todo(request, id):
    todo = get_object_or_404(TodoItem, id=id)
    todo.completed = not todo.completed
    todo.save()
    return redirect('home')

@require_POST
def edit_todo(request, id):
    todo = get_object_or_404(TodoItem, id=id)
    todo.title = request.POST.get('title')
    todo.description = request.POST.get('description', '')
    todo.save()
    return redirect('home')

@require_POST
def delete_todo(request, id):
    todo = get_object_or_404(TodoItem, id=id)
    todo.delete()
    return redirect('home')

@require_POST
def clear_all(request):
    TodoItem.objects.all().delete()
    return redirect('home')