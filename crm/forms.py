from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import Clients, Orders, Service, User, OrderField, ProjectService


class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-[#EF4D23] transition duration-150 ease-in-out sm:text-sm sm:leading-5"
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-[#EF4D23] transition duration-150 ease-in-out sm:text-sm sm:leading-5"
    }))

    class Meta:
        model = User
        fields = ('username', 'password')


class ClientForm(forms.ModelForm):
    full_name = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'border px-[5px] group-hover:bg-gray-100 transition-colors'
    }))
    phone = forms.CharField(widget=forms.TextInput(attrs={
        'type': 'tel', 'class': 'border px-[5px] group-hover:bg-gray-100 transition-colors'
    }))
    address = forms.CharField(required=False, widget=forms.TextInput(attrs={
        'class': 'border px-[5px] group-hover:bg-gray-100 transition-colors'
    }))
    manager = forms.SelectMultiple()
    status = forms.SelectMultiple()
    form = forms.SelectMultiple()
    birthday = forms.DateField(widget=forms.DateInput(format='d.m.y', attrs={
        'type': 'date', 'placeholder': 'Select Date'
    }))

    class Meta:
        model = Clients
        fields = ('full_name', 'phone', 'address', 'status', 'manager', 'form', 'birthday')


class OrderForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['service'].queryset = Service.objects.filter(parent=None)

    title = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'border px-[5px] group-hover:bg-gray-100 transition-colors'
    }))
    order_number = forms.IntegerField(widget=forms.NumberInput(attrs={
        'class': 'border px-[5px] group-hover:bg-gray-100 transition-colors'
    }))
    numbers = forms.CharField(widget=forms.NumberInput(attrs={
        'type': 'number', 'class': 'border px-[5px] group-hover:bg-gray-100 transition-colors'
    }))
    client = forms.SelectMultiple()
    status = forms.SelectMultiple()
    user = forms.ModelMultipleChoiceField(queryset=User.objects.all(), widget=forms.CheckboxSelectMultiple)
    service = forms.ModelMultipleChoiceField(queryset=Service.objects.filter(parent=None),
                                             widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Orders
        fields = ('title', 'order_number', 'client', 'status', 'service', 'numbers', 'user')


class ServiceForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['parent'].queryset = Service.objects.filter(parent=None)

    name = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'border px-[5px] group-hover:bg-gray-100 transition-colors'
    }))

    class Meta:
        model = Service
        fields = ('name', 'department', 'parent')


class EditOrderForm(forms.ModelForm):
    class Meta:
        model = Orders
        fields = ('title', 'order_number', 'client', 'status', 'numbers', 'user')


class OrderFieldForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'border px-[5px] group-hover:bg-gray-100 transition-colors'
    }))
    field = forms.FileField()

    class Meta:
        model = OrderField
        fields = ('title', 'field')


class ProjectServiceForm(forms.ModelForm):
    parcent = forms.CharField(widget=forms.NumberInput(attrs={
        'class': 'border px-[5px] group-hover:bg-gray-100 transition-colors'
    }))
    max_parcent = forms.IntegerField()

    user = forms.ModelMultipleChoiceField(queryset=User.objects.all(), widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = ProjectService
        fields = ('parcent', 'max_parcent', 'user')