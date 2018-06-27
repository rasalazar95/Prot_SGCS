from django.contrib import admin
from models import *

# Register your models here.


class CuentaLineAdmin(admin.TabularInline):
    model = Cuenta

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id','nombre_completo',)
    ordering = ('nombre_completo',)
    search_fields = ('primer_nombre',)
    list_per_page = 50
    inlines = (CuentaLineAdmin,)


class CuentaAdmin(admin.ModelAdmin):
    list_display = ('id','username',)
    ordering = ('username',)
    search_fields = ('clausula',)
    list_display_links = ('id','username',)

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Cuenta, CuentaAdmin)