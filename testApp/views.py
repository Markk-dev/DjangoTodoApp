from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from django.core.paginator import Paginator
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TodoItem
from .serializers import TodoItemSerializer

def home(request):
    todos_list = TodoItem.objects.all().order_by('-id')
    paginator = Paginator(todos_list, 5)
    page_number = request.GET.get('page', 1)
    todos = paginator.get_page(page_number)
    return render(request, "home.html", {"todos": todos})

def get_description(request, id):
    todo = get_object_or_404(TodoItem, id=id)
    return JsonResponse({'description': todo.description})

@api_view(['GET'])
def todo_list_api(request):
    todos = TodoItem.objects.all().order_by('-id')
    serializer = TodoItemSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def todo_detail_api(request, id):
    todo = get_object_or_404(TodoItem, id=id)
    serializer = TodoItemSerializer(todo)
    return Response(serializer.data)

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