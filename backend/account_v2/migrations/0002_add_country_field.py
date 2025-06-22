# Generated manually for adding country field to User model

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_v2', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='country',
            field=models.CharField(blank=True, help_text='Country of nationality', max_length=100, null=True),
        ),
    ] 