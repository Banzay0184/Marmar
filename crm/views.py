from django.contrib.auth import login, logout
from django.dispatch import receiver
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.
from .forms import *
from .models import Clients, Orders, Service, Department, ProjectService, OrderField, ClientsStatus, FROM, User, \
    STATUS_PAY


def login_user(request):
    form = LoginForm()
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            print(user)
            login(request, user)
            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            return redirect('home')
    return render(request, 'sign_in.html', {'form': form})


@login_required(login_url='/login_user')
def index(request):
    return render(request, 'index.html')


@login_required(login_url='/login_user')
def clients(request):
    clients = Clients.objects.all()
    statuses = ClientsStatus.objects.all()
    form = ClientForm(request.POST)
    users = User.objects.all()
    print(request.POST)
    if form.is_valid() and request.method == 'POST':
        form.save()
        return redirect('clients')
    if request.POST.get("id", None):
        client = clients.filter(id=request.POST.get('id'))
        client.update(
            full_name=request.POST.get('full_name'),
            phone=request.POST.get('phone'),
            address=request.POST.get('address'),
            form=request.POST.get('form'),
            birthday=request.POST.get('birthday'),
            status=request.POST.get('status'),
        )
        # return redirect('clients')

    return render(request, 'clients.html',
                  {'clients': clients,
                   'statuses': statuses,
                   "form": form,
                   'klients_count': Clients.objects.count(),
                   'users': users,
                   })


def clients_delete(request, pk):
    clients_delete = Clients.objects.get(pk=pk)
    clients_delete.delete()
    return redirect('clients')


def offic(request):
    services = Service.objects.filter(Q(parent__isnull=False))
    orders = Orders.objects.filter(user=request.user)
    departments = Department.objects.all()
    form = OrderForm(request.POST)

    if form.is_valid() and request.method == 'POST':
        instance = form.save(commit=False)
        instance.save()
        form.save_m2m()

        for i in request.POST.getlist('service'):
            services = Service.objects.filter(parent=i)

            for service in services:
                project_service = ProjectService()
                project_service.service = service
                project_service.parcent = 0
                project_service.max_parcent = 0
                project_service.save()
        return redirect('offic')

    service_edit = Service.objects.filter(Q(parent__isnull=True))
    client_edit = Clients.objects.all()
    user_edit = User.objects.all()
    status_edit = STATUS_PAY
    print(request.POST)
    client, order_id, user, service, numbers, title, order_number = (
        request.POST.get('client'),
        request.POST.get('order_id'),
        request.POST.getlist('username'),
        request.POST.getlist('service'),
        request.POST.get('numbers'),
        request.POST.get('title'),
        request.POST.get('order_number'),
    )
    if client and request.method == 'POST':
        pp = Orders.objects.filter(id=order_id)
        pp.update(
            client=client,
            numbers=numbers,
            title=title,
            order_number=order_number
        )
        pp = pp.first()

        for uu in pp.user.all():
            if str(uu.id) not in user:
                pp.user.remove(str(uu.id))

        for u in user:
            pp.user.add(u)

        for ss in pp.service.all():
            if str(ss.id) not in service:
                pp.service.remove(str(ss.id))

        for i in service:
            services = Service.objects.filter(parent=i)
            for service in services:
                pp.service.add(service.id)

        return redirect('offic')
    return render(request, 'ofis.html',
                  {'orders': orders,
                   'departments': departments,
                   'form': form,
                   'order_count': Orders.objects.filter(is_archive=False).count(),
                   'services': services,
                   'service_edit': service_edit,
                   'client_edit': client_edit,
                   'user_edit': user_edit,
                   'status_edit': status_edit
                   })


def archive(request):
    order_archive = Orders.objects.filter(is_archive=True)
    return render(request, 'archive.html', {
        'orders': order_archive,
        'order_count': Orders.objects.filter(is_archive=True).count(),
    })


def oreders_archived(request, pk):
    order_archived = Orders.objects.filter(pk=pk)
    if order_archived.first().is_archive:
        order_archived.update(is_archive=False)
        return redirect('archive')
    else:
        order_archived.update(is_archive=True)
    return redirect('offic')


# def edit_offic(request, pk):
#     print('***********************')
#     order = Orders.objects.get(id=pk)
#     form = EditOrderForm(request.POST or None, instance=order)
#     if form.is_valid() and request.method == 'POST':
#         form.save()
#         return redirect('offic')
#     return render(request, 'edit_offic.html',
#                   {'order': order,
#                    'formEdit': form})


def service(request):
    services = Service.objects.all()
    form = ServiceForm(request.POST)
    if form.is_valid() and request.method == 'POST':
        instance = form.save(commit=False)
        instance.type = request.POST.get('parent')
        instance.save()
        return redirect('service')
    return render(request, 'spravitcik.html',
                  {'form': form,
                   'services': services})


def settings(request):
    return render(request, 'settings.html')


def department(request, pk):
    orders = Orders.objects.get(pk=pk, user=request.user)
    order_fields = OrderField.objects.filter(order_filed_id=orders)
    form = OrderFieldForm(request.POST or None, request.FILES or None)
    percent, max_percent, user, project_serves_id = (
        request.POST.get('percent'),
        request.POST.get('max_parcent'),
        request.POST.getlist('username'),
        request.POST.get('project_serves_id'),
    )

    if request.method == "POST" and form.is_valid():
        instance = form.save(commit=False)
        instance.order_filed = orders
        instance.save()
        return redirect('department', pk=pk)

    if percent and max_percent and request.method == 'POST':
        pp = ProjectService.objects.filter(id=project_serves_id)
        pp.update(
            parcent=percent,
            max_parcent=max_percent,
        )
        pp = pp.first()

        for uu in pp.user.all():
            if str(uu.id) not in user:
                pp.user.remove(str(uu.id))

        for u in user:
            pp.user.add(u)

        return redirect('department', pk=pk)

    projectservices = ProjectService.objects.filter(order=orders, service__parent__isnull=False)
    result_parcent = 0
    reuslt_sum = 0
    sum_percent = 0
    max_percent_sum = 0
    for item in projectservices:
        result_parcent += item.parcent
        reuslt_sum += item.total_prince()
        max_percent_sum += item.max_parcent
        sum_percent += (item.parcent * item.max_parcent) / 100
    return render(request, 'department.html',
                  {'orders': orders,
                   'projectservices': projectservices,
                   'order_fields': order_fields,
                   'form': form,
                   'result_parcent': result_parcent,
                   'reuslt_sum': reuslt_sum,
                   'sum_percent': sum_percent,
                   'max_percent_sum': 0 if result_parcent == 0 else int((sum_percent / result_parcent) * 100),
                   'result': reuslt_sum * max_percent_sum / 100
                   })


def sign_out(request):
    logout(request)
    return redirect('login_user')


def edit_percent(request, pk):
    project_service = {'id': pk, **request.POST}
    update = ProjectService.objects.edit(project_service)
    return JsonResponse([update.order.pk], safe=False)
