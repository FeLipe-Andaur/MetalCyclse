# Generated by Django 5.0.6 on 2024-07-07 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('administrador', '0002_modelomoto_cilindraje_modelomoto_peso_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modelomoto',
            name='peso',
            field=models.CharField(default='N/A', max_length=20),
        ),
    ]