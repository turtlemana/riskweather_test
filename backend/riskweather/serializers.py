from rest_framework import serializers
from .models import RiskDay, Risk5Min, TaRisk, RiskExchange, PriceData, TARiskCorr, Contact


class CryptoTop3Serializer(serializers.ModelSerializer):

    class Meta:
        model = RiskDay
        fields = ['ticker', 'name', 'tailriskchg', 'weather']

class RiskDaySerializer(serializers.ModelSerializer):

    class Meta:
        model = RiskDay
        fields = ['date', 'cat', 'ticker', 'name', 'tailrisk', 'tailriskchg', 'price', 'pricechg', 'weather']

class Risk5MinSerializer(serializers.ModelSerializer):

    class Meta:
        model = Risk5Min
        fields = ['obsdatetime', 'ticker', 'name', 'tailrisk', 'tailriskchg', 'price', 'pricechg', 'weather']

class MinichartSerializer(serializers.ModelSerializer):
    x = serializers.DateField(source="date")
    y = serializers.FloatField(source="tailrisk")

    class Meta:
        model = TaRisk
        fields = ['ticker', 'x', 'y']

class ExchangeSerializer(serializers.ModelSerializer):

    class Meta:
        model = RiskExchange
        fields = ['exchange', 'ticker', 'tailrisk', 'tailriskchg', 'weather']

class DetailRiskSerializer(serializers.ModelSerializer):
    x = serializers.DateField(source="date")
    y = serializers.FloatField(source="tailrisk")

    class Meta:
        model = TaRisk
        fields = ['ticker', 'x', 'y']

class DetailPriceSerializer(serializers.ModelSerializer):
    x = serializers.DateField(source="date")
    y = serializers.FloatField(source="adjclose")

    class Meta:
        model = PriceData
        fields = ['ticker', 'x', 'y']


class CorrSerializer(serializers.ModelSerializer):

    class Meta:
        model = TARiskCorr
        fields = '__all__'

class ForecastSerializer(serializers.ModelSerializer):

    class Meta:
        model = RiskDay
        fields = ['date', 'ticker', 'weather','weather_1','weather_2','weather_3','weather_4','weather_5','weather_6']

class DetailIndexSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaRisk
        fields = ['ticker', 'tailrisk', 'vargauss', 'cvarnts']

class OnlyEmailSerializer(serializers.ModelSerializer):
    datetime = serializers.DateTimeField(required=False)
    name = serializers.CharField(required=False)
    country = serializers.CharField(required=False)
    mobile = serializers.CharField(required=False)
    company = serializers.CharField(required=False)
    jobtitle = serializers.CharField(required=False)
    product = serializers.CharField(required=False)
    inquiry = serializers.CharField(required=False)

    class Meta:
        model = Contact
        fields = ['datetime', 'name', 'email', 'country', 'mobile', 'company', 'jobtitle', 'product', 'inquiry']

    def get_validation_exclusions(self):
        exclusions = super(OnlyEmailSerializer, self).get_validation_exclusions()
        return exclusions + ['datetime', 'name', 'email', 'country', 'mobile', 'company', 'jobtitle', 'product', 'inquiry']

class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ['datetime', 'name', 'email', 'country', 'mobile', 'company', 'jobtitle', 'product', 'inquiry']

    def get_validation_exclusions(self):
        exclusions = super(ContactSerializer, self).get_validation_exclusions()
        return exclusions + ['datetime', 'name', 'email', 'country', 'mobile', 'company', 'jobtitle', 'product', 'inquiry']
