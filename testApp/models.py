from django.db import models


class TodoItem(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def mark_as_completed(self):
        self.completed = True
        self.save()
    
    def __str__(self):
        return self.title