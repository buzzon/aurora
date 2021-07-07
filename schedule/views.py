from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return HttpResponse("Hello, world.")


# from django.contrib.auth import logout
#
# def logout_view(request):
#     logout(request)
#     # Redirect to a success page.
