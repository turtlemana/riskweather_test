from django.shortcuts import render
import datetime
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework_csv.renderers import CSVRenderer

from .models import RiskDay, Risk5Min, TaRisk, RiskExchange, PriceData, TARiskCorr
from .serializers import CryptoTop3Serializer, RiskDaySerializer, Risk5MinSerializer, MinichartSerializer, ExchangeSerializer, DetailRiskSerializer, DetailPriceSerializer, CorrSerializer, ForecastSerializer, DetailIndexSerializer, OnlyEmailSerializer, ContactSerializer

@api_view(['GET'])
def Overview(request):
    api_urls = {
        'CryptoTop3' : '/CryptoTop3/',
        'Crypto5min': '/Crypto5min/',
        'AllAssets': '/AllAssets/',
        'MiniChart': '/MiniChart/',
        'Exchange': '/Exchange/',
        'Detail': '/Detail/?asset=',
        'DetailRisk': '/DetailRisk/?asset=',
        'DetailPrice': '/DetailPrice/?asset=',
        'DetailCorr': '/DetailCorr/?asset=',
        'DetailForecast': '/DetailForecast/?asset=',
        'DetailIndex': '/DetailIndex/?asset=',
        'OnlyEmail' : '/OnlyEmail/',
        'Contact' : '/Contact/',
    }

    return Response(api_urls)

@api_view(['GET'])
def CryptoTop3(request):
    if request.method == 'GET':
        date = RiskDay.objects.all().order_by('-date')[:1].values('date')
        queryset = RiskDay.objects.filter(ticker__in = ['BTC-USD', 'ETH-USD', 'XRP-USD'], date = date)
        serializer = CryptoTop3Serializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def Crypto5min(request):
    if request.method == 'GET':
        time = Risk5Min.objects.all().order_by('-obsdatetime')[:1].values('obsdatetime')
        queryset = Risk5Min.objects.filter(obsdatetime = time)
        serializer = Risk5MinSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def AllAssets(request):
    if request.method == 'GET':
        date = RiskDay.objects.all().order_by('-date')[:1].values('date')
        queryset = RiskDay.objects.filter(date = date).distinct()
        serializer = RiskDaySerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def MiniChart(request):
    if request.method == 'GET':
        enddate = TaRisk.objects.all().order_by('-date').distinct()[:1].values('date')
        end_date = list(enddate[0].values())[0]
        days = []
        for i in range(7):
            days.append(end_date - datetime.timedelta(days=i))
        queryset = TaRisk.objects.filter(date__in = days, step = 1, cl__gt = 0.98).order_by('ticker', 'date')
        serializer = MinichartSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def Exchange(request):
    if request.method == 'GET':
        date = RiskExchange.objects.all().order_by('-date')[:1].values('date')
        queryset = RiskExchange.objects.filter(date = date).order_by('ticker')
        serializer = ExchangeSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def Detail(request):
    if request.method == 'GET':
        id = request.GET.get('asset')
        crypto = ["BTC-USD", "BCH-USD", "ETH-USD", "LTC-USD", "ADA-USD", "XRP-USD", "DASH-USD","BNB-USD"]
        if id in crypto:
            time = Risk5Min.objects.all().order_by('-obsdatetime')[:1].values('obsdatetime')
            queryset = Risk5Min.objects.filter(ticker = id, obsdatetime = time)
            serializer = Risk5MinSerializer(queryset, many=True)
        else:
            date = RiskDay.objects.all().order_by('-date')[:1].values('date')
            queryset = RiskDay.objects.filter(ticker = id, date = date)
            serializer = RiskDaySerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def DetailRisk(request):
    if request.method == 'GET':
        id = request.GET.get('asset')
        queryset = TaRisk.objects.filter(ticker = id, step = 1, cl__gt = 0.98).order_by('date').distinct()
        serializer = DetailRiskSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def DetailPrice(request):
    if request.method == 'GET':
        id = request.GET.get('asset')
        date = TaRisk.objects.all().order_by('-date').distinct().values('date').distinct()
        queryset = PriceData.objects.filter(date__in = date, ticker = id).order_by('date').distinct()
        serializer = DetailPriceSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def DetailCorr(request):
    if request.method == 'GET':
        id = request.GET.get('asset')
        queryset = TARiskCorr.objects.filter(ticker = id)
        serializer = CorrSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def DetailForecast(request):
    if request.method == 'GET':
        id = request.GET.get('asset')
        date = RiskDay.objects.all().order_by('-date')[:1].values('date')
        queryset = RiskDay.objects.filter(ticker = id, date = date).distinct()
        serializer = ForecastSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def DetailIndex(request):
    if request.method == 'GET':
        id = request.GET.get('asset')
        date = TaRisk.objects.all().order_by('-date')[:1].values('date')
        queryset = TaRisk.objects.filter(ticker = id, step = 1, date = date, cl__gt = 0.98).order_by('date').distinct()
        serializer = DetailIndexSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def OnlyEmail(request):
    if request.method == 'POST':
        serializer = OnlyEmailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def Contact(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class CSVRenderer (CSVRenderer):
#     header = ['date', 'tailrisk']
#
# @api_view(['GET'])
# @renderer_classes((CSVRenderer,))
# def DownloadCSV(request):
#     if request.method == 'GET':
#         id = request.GET.get('asset')
#         queryset = TaRisk.objects.filter(ticker=id, step=1, cl__gt=0.98).order_by('date').distinct()
#         content = [{'date': queryset.date,
#                     'tailrisk': queryset.tailrisk}
#                    for queryset in queryset]
#         return Response(content)