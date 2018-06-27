from __future__ import absolute_import

__author__ = 'noescobar'

from django.core.mail import EmailMultiAlternatives
import thread


def send_email(usuario, html_content, tittle):
    """
    :param usuario:
    :param html_content:
    :return: None
    """
    def funcion():
        """
        :return:
        """
        msg = EmailMultiAlternatives(tittle, html_content,
                                     'bolsa.de.empleo.UTP@gmail.com', [usuario.correo])
        msg.attach_alternative(html_content, 'text/html')  # Definimos el contenido como HTML
        msg.send()  # Enviamos el correo
        return "success"
    thread.start_new_thread(funcion, ())