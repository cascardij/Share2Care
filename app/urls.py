from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("sobre", views.index, name="sobre"),
    path("equipe", views.index, name="equipe")
]