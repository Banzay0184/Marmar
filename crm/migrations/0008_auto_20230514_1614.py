# Generated by Django 3.2.2 on 2023-05-14 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crm', '0007_alter_orders_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clients',
            name='form',
            field=models.CharField(choices=[('Facebook', 'Facebook'), ('Instagram', 'Instagram')], max_length=120, null=True),
        ),
        migrations.AlterField(
            model_name='orders',
            name='status',
            field=models.CharField(choices=[('Оплачено', 'Оплачено'), ('Аванс', 'Аванс'), ('Ожидание', 'Ожидание')], default='Ожидание', max_length=120),
        ),
    ]