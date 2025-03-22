# Generated by Django 5.1.7 on 2025-03-22 12:35

import cloudinary.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("courses", "0002_courserequest_affiliate_commission_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="lesson",
            name="video_url",
        ),
        migrations.AddField(
            model_name="lesson",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name="lesson",
            name="description",
            field=models.TextField(default=""),
        ),
        migrations.AddField(
            model_name="lesson",
            name="video",
            field=cloudinary.models.CloudinaryField(default="", max_length=255),
            preserve_default=False,
        ),
    ]
