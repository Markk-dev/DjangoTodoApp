from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("add/", views.add_todo, name="add_todo"),
    path("toggle/<int:id>/", views.toggle_todo, name="toggle_todo"),
    path("edit/<int:id>/", views.edit_todo, name="edit_todo"),
    path("delete/<int:id>/", views.delete_todo, name="delete_todo"),
    path("clear/", views.clear_all, name="clear_all"),
    path("get-description/<int:id>/", views.get_description, name="get_description"),
]