# Generated by Django 2.2.6 on 2019-10-30 21:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20191029_2211'),
    ]

    operations = [
        migrations.RenameField(
            model_name='errors',
            old_name='date',
            new_name='created',
        ),
    ]