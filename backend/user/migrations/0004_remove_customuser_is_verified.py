# Generated by Django 5.1.1 on 2025-03-11 13:45

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0003_customuser_affiliate_id_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="customuser",
            name="is_verified",
        ),
    ]
