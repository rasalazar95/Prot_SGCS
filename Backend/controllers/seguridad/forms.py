# -*- encoding : utf-8 -*-
# -*- coding: utf-8 -*-
__author__ = 'angelica'
from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(label="Usuario", widget=forms.TextInput())
    password = forms.CharField(label="Contraseña", widget=forms.PasswordInput(render_value=False))

TIPO_ID = (
    (1, 'Cedula de ciudadania'),
    (2, 'NIT'),
    (3, 'Cedula de extranjeria'),
    (4, 'Tarjeta de identidad'),
)


class RegisterForm(forms.Form):
    tipo_identificacion = forms.ChoiceField(widget=forms.Select(), choices=TIPO_ID, required=True)
    numero_identificacion = forms.CharField(widget=forms.NumberInput(),required=True)
    nombre_completo = forms.CharField(widget=forms.TextInput(),required=True)
    fecha_nacimiento = forms.DateField(required=False, input_formats=['%d/%m/%Y',       # '25/10/2006'
                                                                      '%m/%d/%Y',       # '10/25/2006'
                                                                      '%m/%d/%y'])
    correo = forms.CharField(label="Correo electronico", widget=forms.EmailInput(), required=True)
    password = forms.CharField(label='Contraseña', widget=forms.PasswordInput(),required=True)
    password_re = forms.CharField(label='Ingrese nuevamente su contraseña', widget=forms.PasswordInput(), required=True)
    terminos = forms.BooleanField(label='Acepto terminos y condiciones',required=True)


class OlvidarForm(forms.Form):
    correo = forms.CharField(label="correo", widget=forms.EmailInput(), required=True)


class CambiarForm(forms.Form):
    password = forms.CharField(label='Contraseña', widget=forms.PasswordInput(), required=True)
    password_re = forms.CharField(label='Ingrese nuevamente su contraseña', widget=forms.PasswordInput(), required=True)
