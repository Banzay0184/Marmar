# Generated by Django 3.2.2 on 2023-05-02 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crm', '0002_auto_20230502_1505'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clients',
            name='birthday',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clients',
            name='creat_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
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