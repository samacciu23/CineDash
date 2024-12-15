# Generated by Django 5.1.1 on 2024-10-04 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0004_alter_movie_releasedate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='releaseDate',
            field=models.DateField(blank=True, default='2000-01-01'),
        ),
        migrations.AddConstraint(
            model_name='movie',
            constraint=models.CheckConstraint(condition=models.Q(models.Q(('watching', True), _negated=True), models.Q(('watched', True), _negated=True), _connector='OR'), name='cannot_watch_and_have_watched'),
        ),
    ]