var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-\.]+$/;
var exprRut = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
const soloTexto = /^[a-zA-Z\s]+$/;

function validarPassword(contraseña) {
    return decimal.test(contraseña);
}

$(document).ready(function () {
    $("#benviar").click(function () {

        var nombre = $("#nombre").val();
        var rut = $("#rut").val();
        var email = $("#email").val();
        var telefono = $("#telefono").val();
        var direccion = $("#direccion").val();
        var contraseña = $("#contraseña").val();

        $(".error").fadeOut();

        if (nombre == "" || !soloTexto.test(nombre)) {
            $("#mensaje1").fadeIn();
            return false;
        } else {
            $("#mensaje1").fadeOut();
            if (rut == "" || !exprRut.test(rut)) {
                $("#mensaje2").fadeIn();
                return false;
            } else {
                $("#mensaje2").fadeOut();
                if (email == "" || !expr.test(email)) {
                    $("#mensaje3").fadeIn();
                    return false;
                } else {
                    $("#mensaje3").fadeOut();
                    if (telefono == "" || telefono.length != 9) {
                        $("#mensaje4").fadeIn();
                        return false;
                    } else {
                        $("#mensaje4").fadeOut();
                    } if (direccion == "") {
                        $("#mensaje5").fadeIn();
                        return false;
                    } else {
                        $("#mensaje5").fadeOut();
                    } if (contraseña == "" || !validarPassword(contraseña)) {
                        $("#mensaje6").fadeIn();
                        return false;
                    }

                }

            }
        }

    });

});

