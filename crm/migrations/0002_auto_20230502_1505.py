# Generated by Django 3.2.2 on 2023-05-02 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crm', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clients',
            name='birthday',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='clients',
            name='form',
            field=models.CharField(choices=[('Instagram', 'Instagram'), ('Facebook', 'Facebook')], max_length=120, null=True),
        ),
        migrations.AlterField(
            model_name='orders',
            name='status',
            field=models.CharField(choices=[('Аванс', 'Аванс'), ('Ожидание', 'Ожидание'), ('Оплачено', 'Оплачено')], default='Ожидание', max_length=120),
        ),
    ]
