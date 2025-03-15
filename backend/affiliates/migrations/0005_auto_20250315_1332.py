from django.db import migrations, models

def migrate_affiliate_seller(apps, schema_editor):
    """
    Migrate data from the old `affiliate_seller` (User) to the new `affiliate_seller` (Affiliate).
    """
    Sale = apps.get_model('affiliates', 'Sale')
    Affiliate = apps.get_model('affiliates', 'Affiliate')

    for sale in Sale.objects.all():
        if sale.affiliate_seller:  # Check if affiliate_seller is not None
            # Find the corresponding Affiliate instance for the User
            affiliate = Affiliate.objects.get(user=sale.affiliate_seller)
            sale.new_affiliate_seller = affiliate
            sale.save()

def reverse_migrate_affiliate_seller(apps, schema_editor):
    """
    Reverse the migration: Revert the new `affiliate_seller` (Affiliate) back to the old `affiliate_seller` (User).
    """
    Sale = apps.get_model('affiliates', 'Sale')
    Affiliate = apps.get_model('affiliates', 'Affiliate')

    for sale in Sale.objects.all():
        if sale.new_affiliate_seller:  # Check if new_affiliate_seller is not None
            # Revert to the original User instance
            sale.affiliate_seller = sale.new_affiliate_seller.user
            sale.save()

class Migration(migrations.Migration):
    dependencies = [
        ("affiliates", "0004_sale_affiliate_seller"),  # Replace with the actual previous migration
    ]

    operations = [
        # Step 1: Add a new temporary field to store the Affiliate reference
        migrations.AddField(
            model_name='sale',
            name='new_affiliate_seller',
            field=models.ForeignKey('affiliates.Affiliate', on_delete=models.SET_NULL, null=True, blank=True, related_name='temp_sales'),
        ),

        # Step 2: Run the data migration
        migrations.RunPython(migrate_affiliate_seller, reverse_migrate_affiliate_seller),

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