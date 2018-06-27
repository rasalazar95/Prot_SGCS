# -*- coding: UTF-8 -*-
from django.shortcuts import render
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseServerError
from django.views.generic import base
from forms import RegisterForm, OlvidarForm
from models import *
from tasks import send_email
import json
from utilities.settings import BASE_DIR

class IndexView(base.View):

    def get(self, request, *args, **kwargs):
        """
        :param request:
        :param args:
        :param kwargs:
        :return: Redirecciona por aca o por register view.
        """
        # if usuario.is_authenticated():
        #     if cuenta.is_administrador():
        #         return HttpResponseRedirect("/administrador/")
        #     elif cuenta.have_perfil():
        #         return render(request, 'perfiles/modulos.html', {'cuenta': cuenta})
        #     else:
        #         # print("el usuario")
        #         return render(request, 'perfiles/modulos.html', {})
        # else:
        return render(request, 'index.html', {'dir': BASE_DIR})


class LoginView(base.View):

    def get(self, request, *args, **kwargs):
        """
        :param request:
        :param args:
        :param kwargs:
        :return:retorna el temaplate con la informacion del usuario logueado o retorna el template  de logueo
        """
        return render(request, 'pagina/desktop/index.html', ctx)

    def post(self, request, *args, **kwargs):
        """
        :param request: username y un password
        :param args:
        :param kwargs:
        :return: retorna el template del index de un usuario logueado o retorna un template de error de logueo
        """
        user = json.loads(request.body)  # Se debe decodificar haciendo uso de la clase json, ya que  es informacion
        # suministrada  por un javascript.
        mensaje = "formulario invalido"

        return HttpResponseServerError(mensaje)

    def delete(self, request, *args, **kwargs):
        logout(request)
        return HttpResponse('sucess')
        # return render(request, 'pagina/desktop/index.html', {}, context_instance=RequestContext(request))


class TerminosCondicionesView(base.View):

    def get(self, request, *args, **kwargs):
        term_y_cond = TerminoCondicion.objects.filter(activo=True)
        return render(request, 'terminos_y_condiciones/terminoCondicion.html',
                      {
                          "term_y_cond": term_y_cond
                      })


class AcercaDeNosotrosView(base.View):

    def get(self, request, *args, **kwargs):
        return render(request, 'pagina/desktop/acerca_de_nosotros.html', {})
