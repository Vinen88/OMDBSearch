# Generated by Django 4.2.2 on 2023-08-30 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='savedresult',
            name='saved',
            field=models.BooleanField(default=False),
        ),
    ]