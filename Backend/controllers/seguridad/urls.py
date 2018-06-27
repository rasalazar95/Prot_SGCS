__author__ = 'noescobar'

from django.conf.urls import patterns, url
from views import LoginView, RegisterView, OlvidarView, TerminosCondicionesView, CambiarClaveView#, PerfilesView

urlpatterns = patterns('Backend.apps.seguridad.views',
                       url(r'^login/?$', LoginView.as_view(), name='vista_login'),
                       url(r'^register/?$', RegisterView.as_view(), name='vista_register'),
                       # url(r'^perfiles/?$', PerfilesView.as_view(), name='vista_perfil'),
                       url(r'^olvide_password/(?P<codigo>(.)*)/?$', OlvidarView.as_view(), name='olvide_password'),
                       url(r'^terminos_y_condiciones/?$', TerminosCondicionesView.as_view(),
                           name='terminos_y_condiciones'),
                       url(r'^cambiar_clave/(?P<codigo>(.)*)/?$', CambiarClaveView.as_view(), name='cambiar_clave'),
                       )
