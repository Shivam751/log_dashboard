from django.urls import path
from .views import TaskCommandsAPIView, LogEventsAPIView

urlpatterns = [
    path('api/task-commands/', TaskCommandsAPIView.as_view(), name='task-commands'),
    path('api/log-events/', LogEventsAPIView.as_view(), name='log-events'),
]

# npm audit fix --force