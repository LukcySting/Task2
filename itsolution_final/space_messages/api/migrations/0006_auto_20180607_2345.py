# Generated by Django 2.0.6 on 2018-06-07 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_delete_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='date',
            field=models.DateField(),
        ),
    ]