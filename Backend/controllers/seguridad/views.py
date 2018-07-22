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
from django.views.decorators.csrf import csrf_protect


class IndexView(base.View):
    def get(self, request, *args, **kwargs):
        """
        :param request:
        :param args:
        :param kwargs:
        :return: Redirecciona por aca o por register view.
        """
        csrf_protect(request)
        user = "externo"
        print user, "GET"
        return render(request, 'index.html', {'user': user})

    def post(self, request, *args, **kwargs):
        csrf_protect(request)
        if(request.POST.get("interno") != None):
            user = "interno"
        else:
            user = "externo"
        print user, "POST"
        return render(request, 'index.html', {'user': user})



class PreindexView(base.View):
    def get(self, request, *args, **kwargs):
        """
        :param request:
        :param args:
        :param kwargs:
        :return: Redirecciona por aca o por register view.
        """
        return render(request, 'preindex.html', {'dir': BASE_DIR})


class AdminView(base.View):

    def get(self, request, *args, **kwargs):
        """
        :param request:
        :param args:
        :param kwargs:
        :return: Redirecciona por aca o por register view.
        """
        return render(request, 'admin.html', {'dir': BASE_DIR})

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

