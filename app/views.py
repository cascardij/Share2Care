from django.shortcuts import render 

def index (request):
    return render(request, 'app/index.html')

def index(request):
    return render(request, 'app/sobre.html')

def index (request):
    return render (request, 'app/equipe.html')