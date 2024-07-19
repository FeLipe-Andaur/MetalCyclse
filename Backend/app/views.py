from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .models import Cliente
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from administrador.models import Producto


# Create your views here.


def registro_cliente(request):
    usuarios = Cliente.objects.all()
    repetido = False
    if request.method != "POST":
        return render(request, "app/Formulario.html")
    else:
        nombre = request.POST["name"]
        fecha_nacimiento = request.POST["fecha_nacimiento"]
        telefono = request.POST["telefono"]
        direccion = request.POST["direccion"]
        email = request.POST["email"]
        contraseña = request.POST["contraseña"]

        for user in usuarios:
            if user.email == email:
                repetido = True

        if repetido:
            repetido = False
            mensaje = "Registro ya existe."
            context = {"mensaje": mensaje}
            return render(request, "app/formulario.html", context)

        elif (
            nombre
            and fecha_nacimiento
            and telefono
            and direccion
            and email
            and contraseña
        ):
            usuario = Cliente(
                nombre=nombre,
                fecha_nacimiento=fecha_nacimiento,
                telefono=telefono,
                direccion=direccion,
                email=email,
                contraseña=contraseña,
            )
            usuario.save()
            mensaje = "Registro exitoso"
            context = {"mensaje": mensaje}
            return render(request, "app/formulario.html", context)
        else:
            mensaje = "Usuario o contraseña incorrecta"
            context = {"mensaje": mensaje}
            return render(request, "app/formulario.html", context)


@csrf_protect
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


@csrf_protect
def logout_view(request):
    logout(request)
    return redirect("home")


@csrf_protect
def logout(request):
    del request.session["usuario"]
    return redirect("home")


@csrf_protect
def home(request):
    if request.method == "POST":
        if "action_logout" in request.POST:
            del request.session["usuario"]
            return render(request, "app/home.html")
        else:
            usuarios = Cliente.objects.all()
            email = request.POST["email"]
            contraseña = request.POST["contraseña"]

            for usuario in usuarios:
                if usuario.email == email and usuario.contraseña == contraseña:
                    mensaje = "Usuario logueado correctamente"
                    request.session["usuario"] = usuario.nombre
                    context = {"mensaje": mensaje, "user": usuario.nombre}
                    return render(request, "app/home.html", context)
            mensaje = "Correo o password incorrecto"
            context = {"mensaje": mensaje}
            return render(request, "app/home.html", context)
    else:
        context = {}
        if "usuario" in request.session:
            user = request.session["usuario"]
            context = {"user": user}
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
