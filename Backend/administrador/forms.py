from django import forms
from administrador.models import (
    Producto,
)  # Importación absoluta desde administrador.models


class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = "__all__"
