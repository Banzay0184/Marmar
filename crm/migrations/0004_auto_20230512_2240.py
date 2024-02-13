# Generated by Django 3.2.2 on 2023-05-12 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crm', '0003_auto_20230502_1506'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clients',
            name='form',
            field=models.CharField(choices=[('Instagram', 'Instagram'), ('Facebook', 'Facebook')], max_length=120, null=True),
        ),
        migrations.AlterField(
            model_name='orders',
            name='status',
            field=models.CharField(choices=[('Ожидание', 'Ожидание'), ('Оплачено', 'Оплачено'), ('Аванс', 'Аванс')], default='Ожидание', max_length=120),
        ),
    ]