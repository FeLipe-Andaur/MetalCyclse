from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from administrador.models import Producto
from .forms import RegistroClienteForm


# Create your views here.


def registro_cliente(request):
    if request.method == "POST":
        form = RegistroClienteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("home")
    else:
        form = RegistroClienteForm()
    return render(request, "app/Formulario.html", {"form": form})


def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        contraseña = request.POST.get("contraseña")

        user = authenticate(request, username=email, password=contraseña)

        if user is not None:
            login(request, user)
            return JsonResponse({"success": True, "username": user.username})
        else:
            return JsonResponse({"success": False, "error": "Credenciales inválidas"})

    return JsonResponse({"success": False, "error": "Método no permitido"})


def logout_view(request):
    logout(request)
    return redirect("home")


def home(request):
    context = {}
    return render(request, "app/home.html", context)


def MotoAdventure(request):
    productos = Producto.objects.filter(modelo__tipo__nombre="Moto Adventure")
    return render(request, "app/MotoAdventure.html", {"productos": productos})


def MotoCompeticion(request):
    productos = Producto.objects.filter(modelo__tipo__nombre="Moto Competición")
    return render(request, "app/MotoCompeticion.html", {"productos": productos})


def MotoDeportiva(request):
    productos = Producto.objects.filter(modelo__tipo__nombre="Moto Deportiva")
    return render(request, "app/MotoDeportiva.html", {"productos": productos})


def MotoScooter(request):
    productos = Producto.objects.filter(modelo__tipo__nombre="Moto Scooter")
    return render(request, "app/MotoScooter.html", {"productos": productos})


def MotoTouring(request):
    productos = Producto.objects.filter(modelo__tipo__nombre="Moto Touring")
    return render(request, "app/MotoTouring.html", {"productos": productos})


def MotoUrbana(request):
    productos = Producto.objects.filter(modelo__tipo__nombre="Moto Urbana")
    return render(request, "app/MotoUrbana.html", {"productos": productos})
