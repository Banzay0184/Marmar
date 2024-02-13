# Generated by Django 3.2.2 on 2023-05-14 11:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='название')),
            ],
        ),
        migrations.RemoveField(
            model_name='projects',
            name='img',
        ),
        migrations.CreateModel(
            name='ProjectImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to='uploads/')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_image', to='website.projects')),
            ],
        ),
        migrations.AddField(
            model_name='projects',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='website.projectcategory', verbose_name='категория'),
            preserve_default=False,
        ),
    ]