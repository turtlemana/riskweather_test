from django.urls import path
from . import views

urlpatterns = [
    path('', views.Overview, name='Overview'),
    path('CryptoTop3/', views.CryptoTop3, name='CryptoTop3'),
    path('Crypto5min/', views.Crypto5min, name='Crypto5min'),
    path('AllAssets/', views.AllAssets, name = 'AllAssets'),
    path('MiniChart/', views.MiniChart, name = 'MiniChart'),
    path('Exchange/', views.Exchange, name='Exchange'),
    path('Detail/', views.Detail, name='Detail'),
    path('DetailRisk/', views.DetailRisk, name='DetailRisk'),
    path('DetailPrice/', views.DetailPrice, name='DetailPrice'),
    path('DetailCorr/', views.DetailCorr, name='DetailCorr'),
    path('DetailForecast/', views.DetailForecast, name='DetailForecast'),
    path('DetailIndex/', views.DetailIndex, name='DetailIndex'),
    path('OnlyEmail/', views.OnlyEmail, name='OnlyEmail'),
    path('Contact/', views.Contact, name='Contact')
]