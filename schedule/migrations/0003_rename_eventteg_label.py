# Generated by Django 3.2.5 on 2021-07-07 16:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0002_rename_eventtitle_eventteg'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='EventTeg',
            new_name='Label',
        ),
    ]
