from django.db import migrations, models
from django.conf import settings

def revert_affiliate_seller(apps, schema_editor):
    """
    Revert the `affiliate_seller` field back to referencing the `User` model.
    """
    Sale = apps.get_model('affiliates', 'Sale')
    Affiliate = apps.get_model('affiliates', 'Affiliate')

    for sale in Sale.objects.all():
        if sale.affiliate_seller:  # Check if affiliate_seller is not None
            # Get the User instance from the Affiliate
            user = sale.affiliate_seller.user
            sale.new_affiliate_seller = user
            sale.save()

def reverse_revert_affiliate_seller(apps, schema_editor):
    """
    Reverse the revert operation: Restore the `affiliate_seller` field to reference the `Affiliate` model.
    """
    Sale = apps.get_model('affiliates', 'Sale')
    Affiliate = apps.get_model('affiliates', 'Affiliate')

    for sale in Sale.objects.all():
        if sale.new_affiliate_seller:  # Check if new_affiliate_seller is not None
            # Get the Affiliate instance from the User
            affiliate = Affiliate.objects.get(user=sale.new_affiliate_seller)
            sale.affiliate_seller = affiliate
            sale.save()

class Migration(migrations.Migration):
    dependencies = [
        ("affiliates", "0005_auto_20250315_1332"),  # Replace with the actual previous migration
    ]

    operations = [
        # Step 1: Add a new temporary field to store the User reference
        migrations.AddField(
            model_name='sale',
            name='new_affiliate_seller',
            field=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='temp_sales'),
        ),

        # Step 2: Run the data migration
        migrations.RunPython(revert_affiliate_seller, reverse_revert_affiliate_seller),

        # Step 3: Remove the old affiliate_seller field
        migrations.RemoveField(
            model_name='sale',
            name='affiliate_seller',
        ),

        # Step 4: Rename the new field to affiliate_seller
        migrations.RenameField(
            model_name='sale',
            old_name='new_affiliate_seller',
            new_name='affiliate_seller',
        ),
    ]