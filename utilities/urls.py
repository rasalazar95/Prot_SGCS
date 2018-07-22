"""utilities URL Configuration

The `urlpatterns` list routes URLs to templates. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function templates
    1. Add an import:  from my_app import templates
    2. Add a URL to urlpatterns:  path('', templates.home, name='home')
Class-based templates
    1. Add an import:  from other_app.templates import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from utilities.settings import FRONTEND_URL
from Backend.controllers.seguridad.views import IndexView, PreindexView, AdminView
import settings

urlpatterns = [
                       # Examples:
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^/?$', IndexView.as_view(), name='Inicio'),
                       url(r'^Test/?', PreindexView.as_view(), name='Inicio'),
                       url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),]
                       #url(r'^seguridad/', include('Backend.apps.seguridad.urls')),
                       #url(r'^ciudadano/', include('Backend.apps.ciudadano.urls')),
                       #url(r'^empresa/', include('Backend.apps.empresa.urls')),
                       #] #+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
                         #+ static('/Frontend/', document_root=FRONTEND_URL)
