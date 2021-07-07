from django.shortcuts import render


def index(request):
    user = request.user
    return render(request, 'aurora_core/index.html', {'user': user})
