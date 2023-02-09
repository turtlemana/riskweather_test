# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models




class IntradayPrice5Min(models.Model):
    obsdatetime = models.DateTimeField(db_column='ObsDateTime', blank=True, null=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=False, primary_key=True)  # Field name made lowercase.
    price = models.FloatField(db_column='Price', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Intraday_Price5min'


class IntradayTaRisk(models.Model):
    obsdatetime = models.DateTimeField(db_column='ObsDateTime', blank=True, null=True)  # Field name made lowercase.
    cat = models.CharField(db_column='Cat', max_length=100, blank=True, null=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=False, primary_key=True)  # Field name made lowercase.
    step = models.FloatField(db_column='Step', blank=True, null=True)  # Field name made lowercase.
    cl = models.FloatField(db_column='Cl', blank=True, null=True)  # Field name made lowercase.
    vargauss = models.FloatField(db_column='VaRGauss', blank=True, null=True)  # Field name made lowercase.
    varstdt = models.FloatField(db_column='VaRstdt', blank=True, null=True)  # Field name made lowercase.
    varnts = models.FloatField(db_column='VaRNTS', blank=True, null=True)  # Field name made lowercase.
    cvargauss = models.FloatField(db_column='CVaRGauss', blank=True, null=True)  # Field name made lowercase.
    cvarstdt = models.FloatField(db_column='CVaRstdt', blank=True, null=True)  # Field name made lowercase.
    cvarnts = models.FloatField(db_column='CVaRNTS', blank=True, null=True)  # Field name made lowercase.
    tailrisk = models.FloatField(db_column='TailRisk', blank=True, null=True)  # Field name made lowercase.
    ntstailrisk = models.FloatField(db_column='NTSTailRisk', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Intraday_TA_Risk'


class PriceData(models.Model):
    date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=False, primary_key=True)  # Field name made lowercase.
    adjclose = models.FloatField(db_column='AdjClose', blank=True, null=True)  # Field name made lowercase.
    cat = models.CharField(db_column='Cat', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Price_Data'


class Risk5Min(models.Model):
    obsdatetime = models.DateTimeField(db_column='ObsDateTime', blank=True, null=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=False, primary_key=True)  # Field name made lowercase.
    tailrisk = models.FloatField(db_column='TailRisk', blank=True, null=True)  # Field name made lowercase.
    tailriskchg = models.FloatField(db_column='TailRiskChg', blank=True, null=True)  # Field name made lowercase.
    price = models.FloatField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    pricechg = models.FloatField(db_column='PriceChg', blank=True, null=True)  # Field name made lowercase.
    weather = models.CharField(db_column='Weather', max_length=100, blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Risk_5min'


class RiskDay(models.Model):
    date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    cat = models.TextField(db_column='Cat', blank=True, null=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=False, primary_key=True)  # Field name made lowercase.
    tailrisk = models.FloatField(db_column='TailRisk', blank=True, null=True)  # Field name made lowercase.
    tailriskchg = models.FloatField(db_column='TailRiskChg', blank=True, null=True)  # Field name made lowercase.
    price = models.FloatField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    pricechg = models.FloatField(db_column='PriceChg', blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100, blank=True, null=True)  # Field name made lowercase.
    weather = models.CharField(db_column='Weather', max_length=100, blank=True, null=True)  # Field name made lowercase.
    weather_1 = models.CharField(db_column='Weather_1', max_length=100, blank=True, null=True)  # Field name made lowercase.
    weather_2 = models.CharField(db_column='Weather_2', max_length=100, blank=True, null=True)  # Field name made lowercase.
    weather_3 = models.CharField(db_column='Weather_3', max_length=100, blank=True, null=True)  # Field name made lowercase.
    weather_4 = models.CharField(db_column='Weather_4', max_length=100, blank=True, null=True)  # Field name made lowercase.
    weather_5 = models.CharField(db_column='Weather_5', max_length=100, blank=True, null=True)  # Field name made lowercase.
    weather_6 = models.CharField(db_column='Weather_6', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Risk_Day'


class RiskExchange(models.Model):
    date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    exchange = models.TextField(db_column='Exchange', blank=True, null=False, primary_key=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=True)  # Field name made lowercase.
    tailrisk = models.FloatField(db_column='TailRisk', blank=True, null=True)  # Field name made lowercase.
    tailriskchg = models.FloatField(db_column='TailRiskChg', blank=True, null=True)  # Field name made lowercase.
    weather = models.CharField(db_column='Weather', max_length=100, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Risk_Exchange'


class TaRisk(models.Model):
    date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    cat = models.CharField(db_column='Cat', max_length=50, blank=True, null=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=False, primary_key=True)  # Field name made lowercase.
    step = models.IntegerField(db_column='Step', blank=True, null=True)  # Field name made lowercase.
    cl = models.FloatField(db_column='Cl', blank=True, null=True)  # Field name made lowercase.
    vargauss = models.FloatField(db_column='VaRGauss', blank=True, null=True)  # Field name made lowercase.
    varstdt = models.FloatField(db_column='VaRstdt', blank=True, null=True)  # Field name made lowercase.
    varnts = models.FloatField(db_column='VaRNTS', blank=True, null=True)  # Field name made lowercase.
    cvargauss = models.FloatField(db_column='CVaRGauss', blank=True, null=True)  # Field name made lowercase.
    cvarstdt = models.FloatField(db_column='CVaRstdt', blank=True, null=True)  # Field name made lowercase.
    cvarnts = models.FloatField(db_column='CVaRNTS', blank=True, null=True)  # Field name made lowercase.
    tailrisk = models.FloatField(db_column='TailRisk', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TA_Risk'


class TaRiskExchange(models.Model):
    date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    exchange = models.TextField(db_column='Exchange', blank=True, null=False, primary_key=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=True)  # Field name made lowercase.
    vargauss = models.FloatField(db_column='VaRGauss', blank=True, null=True)  # Field name made lowercase.
    varstdt = models.FloatField(db_column='VaRstdt', blank=True, null=True)  # Field name made lowercase.
    varnts = models.FloatField(db_column='VaRNTS', blank=True, null=True)  # Field name made lowercase.
    cvargauss = models.FloatField(db_column='CVaRGauss', blank=True, null=True)  # Field name made lowercase.
    cvarstdt = models.FloatField(db_column='CVaRstdt', blank=True, null=True)  # Field name made lowercase.
    cvarnts = models.FloatField(db_column='CVaRNTS', blank=True, null=True)  # Field name made lowercase.
    tailrisk = models.FloatField(db_column='TailRisk', blank=True, null=True)  # Field name made lowercase.
    weatherscore30 = models.DecimalField(db_column='WeatherScore30', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    weatherscore90 = models.DecimalField(db_column='WeatherScore90', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    weatherscore180 = models.DecimalField(db_column='WeatherScore180', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    weatherscore365 = models.DecimalField(db_column='WeatherScore365', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    weatherscore730 = models.DecimalField(db_column='WeatherScore730', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TA_Risk_Exchange'


class WeatherScore(models.Model):
    date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    cat = models.TextField(db_column='Cat', blank=True, null=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=False, primary_key=True)  # Field name made lowercase.
    step = models.IntegerField(db_column='Step', blank=True, null=True)  # Field name made lowercase.
    weatherscore30 = models.DecimalField(db_column='WeatherScore30', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    weatherscore90 = models.DecimalField(db_column='WeatherScore90', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    weatherscore180 = models.DecimalField(db_column='WeatherScore180', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    weatherscore365 = models.DecimalField(db_column='WeatherScore365', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    weatherscore730 = models.DecimalField(db_column='WeatherScore730', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Weather_Score'


class TARiskCorr(models.Model):
    ticker = models.CharField(db_column='Ticker', max_length=50, blank=True, null=False, primary_key=True)  # Field name made lowercase.
    rank_1 = models.CharField(db_column='rank_1', max_length=50, blank=True, null=True)  # Field name made lowercase.
    rank_2 = models.CharField(db_column='rank_2', max_length=50, blank=True, null=True)  # Field name made lowercase.
    rank_3 = models.CharField(db_column='rank_3', max_length=50, blank=True, null=True)  # Field name made lowercase.
    rank_4 = models.CharField(db_column='rank_4', max_length=50, blank=True, null=True)  # Field name made lowercase.
    rank_5 = models.CharField(db_column='rank_5', max_length=50, blank=True, null=True)  # Field name made lowercase.
    rank_6 = models.CharField(db_column='rank_6', max_length=50, blank=True, null=True)  # Field name made lowercase.
    rank_7 = models.CharField(db_column='rank_7', max_length=50, blank=True, null=True)  # Field name made lowercase.
    rank_8 = models.CharField(db_column='rank_8', max_length=50, blank=True, null=True)  # Field name made lowercase.
    rank_9 = models.CharField(db_column='rank_9', max_length=50, blank=True, null=True)  # Field name made lowercase.
    rank_10 = models.CharField(db_column='rank_10', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'TA_Risk_Corr'


class Contact(models.Model):
    request_id = models.AutoField(db_column='request_id', null=False, primary_key=True)  # Field name made lowercase.
    datetime = models.DateTimeField(db_column='datetime', blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='name', max_length=30, blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(db_column='email', max_length=50, blank=True, null=True) # Field name made lowercase.
    country = models.CharField(db_column='country', max_length=30, blank=True, null=True)  # Field name made lowercase.
    mobile = models.CharField(db_column='mobile', max_length=30, blank=True, null=True) # Field name made lowercase.
    company = models.CharField(db_column='company', max_length=30, blank=True, null=True)  # Field name made lowercase.
    jobtitle = models.CharField(db_column='jobtitle', max_length=30, blank=True, null=True)  # Field name made lowercase.
    product = models.CharField(db_column='product', max_length=100, blank=True, null=True)  # Field name made lowercase.
    inquiry = models.CharField(db_column='inquiry', max_length=200, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Contact'


# class CorrmxGAg(models.Model):
#     date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
#     ticker = models.TextField(db_column='Ticker', blank=True, null=True)  # Field name made lowercase.
#     value = models.TextField(db_column='Value', blank=True, null=True)  # Field name made lowercase.
#
#     class Meta:
#         managed = False
#         db_table = 'CorrMx_g_ag'
#
#
# class CorrmxNtsAg(models.Model):
#     date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
#     ticker = models.TextField(db_column='Ticker', blank=True, null=True)  # Field name made lowercase.
#     value = models.TextField(db_column='Value', blank=True, null=True)  # Field name made lowercase.
#
#     class Meta:
#         managed = False
#         db_table = 'CorrMx_nts_ag'
#
#
# class CorrmxStdntsRho(models.Model):
#     date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
#     ticker = models.TextField(db_column='Ticker', blank=True, null=True)  # Field name made lowercase.
#     value = models.TextField(db_column='Value', blank=True, null=True)  # Field name made lowercase.
#
#     class Meta:
#         managed = False
#         db_table = 'CorrMx_stdnts_rho'
#
#
# class IntradayParamGAg(models.Model):
#     obsdatetime = models.DateTimeField(db_column='ObsDateTime', blank=True, null=True)  # Field name made lowercase.
#     cat = models.CharField(db_column='Cat', max_length=100, blank=True, null=True)  # Field name made lowercase.
#     ticker = models.CharField(db_column='Ticker', max_length=100, blank=True, null=True)  # Field name made lowercase.
#     ucmean = models.FloatField(db_column='Ucmean', blank=True, null=True)  # Field name made lowercase.
#     ar1 = models.FloatField(db_column='Ar1', blank=True, null=True)  # Field name made lowercase.
#     ma1 = models.FloatField(db_column='Ma1', blank=True, null=True)  # Field name made lowercase.
#     omega = models.FloatField(db_column='Omega', blank=True, null=True)  # Field name made lowercase.
#     arch1 = models.FloatField(db_column='Arch1', blank=True, null=True)  # Field name made lowercase.
#     garch1 = models.FloatField(db_column='Garch1', blank=True, null=True)  # Field name made lowercase.
#     forcmean = models.FloatField(db_column='ForcMean', blank=True, null=True)  # Field name made lowercase.
#     forcstdev = models.FloatField(db_column='ForcStdev', blank=True, null=True)  # Field name made lowercase.
#
#     class Meta:
#         managed = False
#         db_table = 'Intraday_Param_g_ag'
#
#
# class IntradayParamNtsAg(models.Model):
#     obsdatetime = models.DateTimeField(db_column='ObsDateTime', blank=True, null=True)  # Field name made lowercase.
#     cat = models.CharField(db_column='Cat', max_length=100, blank=True, null=True)  # Field name made lowercase.
#     ticker = models.CharField(db_column='Ticker', max_length=100, blank=True, null=True)  # Field name made lowercase.
#     ucmean = models.FloatField(db_column='Ucmean', blank=True, null=True)  # Field name made lowercase.
#     ar1 = models.FloatField(db_column='Ar1', blank=True, null=True)  # Field name made lowercase.
#     ma1 = models.FloatField(db_column='Ma1', blank=True, null=True)  # Field name made lowercase.
#     omega = models.FloatField(db_column='Omega', blank=True, null=True)  # Field name made lowercase.
#     arch1 = models.FloatField(db_column='Arch1', blank=True, null=True)  # Field name made lowercase.
#     garch1 = models.FloatField(db_column='Garch1', blank=True, null=True)  # Field name made lowercase.
#     df = models.FloatField(db_column='Df', blank=True, null=True)  # Field name made lowercase.
#     forcmean = models.FloatField(db_column='ForcMean', blank=True, null=True)  # Field name made lowercase.
#     forcstdev = models.FloatField(db_column='ForcStdev', blank=True, null=True)  # Field name made lowercase.
#     alpha = models.FloatField(db_column='Alpha', blank=True, null=True)  # Field name made lowercase.
#     theta = models.FloatField(db_column='Theta', blank=True, null=True)  # Field name made lowercase.
#     beta = models.FloatField(db_column='Beta', blank=True, null=True)  # Field name made lowercase.
#
#     class Meta:
#         managed = False
#         db_table = 'Intraday_Param_nts_ag'
#
#
# class ParamGAg(models.Model):
#     date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
#     cat = models.CharField(db_column='Cat', max_length=10, blank=True, null=True)  # Field name made lowercase.
#     ticker = models.CharField(db_column='Ticker', max_length=20, blank=True, null=True)  # Field name made lowercase.
#     ucmean = models.FloatField(db_column='Ucmean', blank=True, null=True)  # Field name made lowercase.
#     ar1 = models.FloatField(db_column='Ar1', blank=True, null=True)  # Field name made lowercase.
#     ma1 = models.FloatField(db_column='Ma1', blank=True, null=True)  # Field name made lowercase.
#     omega = models.FloatField(db_column='Omega', blank=True, null=True)  # Field name made lowercase.
#     arch1 = models.FloatField(db_column='Arch1', blank=True, null=True)  # Field name made lowercase.
#     garch1 = models.FloatField(db_column='Garch1', blank=True, null=True)  # Field name made lowercase.
#     forcmean = models.FloatField(db_column='ForcMean', blank=True, null=True)  # Field name made lowercase.
#     forcstdev = models.FloatField(db_column='ForcStdev', blank=True, null=True)  # Field name made lowercase.
#
#     class Meta:
#         managed = False
#         db_table = 'Param_g_ag'
#
#
# class ParamNtsAg(models.Model):
#     date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
#     cat = models.CharField(db_column='Cat', max_length=10, blank=True, null=True)  # Field name made lowercase.
#     ticker = models.CharField(db_column='Ticker', max_length=20, blank=True, null=True)  # Field name made lowercase.
#     ucmean = models.FloatField(db_column='Ucmean', blank=True, null=True)  # Field name made lowercase.
#     ar1 = models.FloatField(db_column='Ar1', blank=True, null=True)  # Field name made lowercase.
#     ma1 = models.FloatField(db_column='Ma1', blank=True, null=True)  # Field name made lowercase.
#     omega = models.FloatField(db_column='Omega', blank=True, null=True)  # Field name made lowercase.
#     arch1 = models.FloatField(db_column='Arch1', blank=True, null=True)  # Field name made lowercase.
#     garch1 = models.FloatField(db_column='Garch1', blank=True, null=True)  # Field name made lowercase.
#     df = models.FloatField(db_column='Df', blank=True, null=True)  # Field name made lowercase.
#     forcmean = models.FloatField(db_column='ForcMean', blank=True, null=True)  # Field name made lowercase.
#     forcstdev = models.FloatField(db_column='ForcStdev', blank=True, null=True)  # Field name made lowercase.
#     alpha = models.FloatField(db_column='Alpha', blank=True, null=True)  # Field name made lowercase.
#     theta = models.FloatField(db_column='Theta', blank=True, null=True)  # Field name made lowercase.
#     beta = models.FloatField(db_column='Beta', blank=True, null=True)  # Field name made lowercase.
#
#     class Meta:
#         managed = False
#         db_table = 'Param_nts_ag'
#
#
# class ParamStdntsAth(models.Model):
#     date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
#     cat = models.CharField(db_column='Cat', max_length=10, blank=True, null=True)  # Field name made lowercase.
#     alpha = models.FloatField(db_column='Alpha', blank=True, null=True)  # Field name made lowercase.
#     theta = models.FloatField(db_column='Theta', blank=True, null=True)  # Field name made lowercase.
#
#     class Meta:
#         managed = False
#         db_table = 'Param_stdnts_ath'
#
#
# class ParamStdntsBeta(models.Model):
#     date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
#     cat = models.CharField(db_column='Cat', max_length=10, blank=True, null=True)  # Field name made lowercase.
#     ticker = models.CharField(db_column='Ticker', max_length=20, blank=True, null=True)  # Field name made lowercase.
#     beta = models.FloatField(db_column='Beta', blank=True, null=True)  # Field name made lowercase.
#
#     class Meta:
#         managed = False
#         db_table = 'Param_stdnts_beta'
#
#
# class AuthGroup(models.Model):
#     name = models.CharField(unique=True, max_length=150)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_group'
#
#
# class AuthGroupPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
#     permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_group_permissions'
#         unique_together = (('group', 'permission'),)
#
#
# class AuthPermission(models.Model):
#     name = models.CharField(max_length=255)
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
#     codename = models.CharField(max_length=100)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_permission'
#         unique_together = (('content_type', 'codename'),)
#
#
# class AuthUser(models.Model):
#     password = models.CharField(max_length=128)
#     last_login = models.DateTimeField(blank=True, null=True)
#     is_superuser = models.IntegerField()
#     username = models.CharField(unique=True, max_length=150)
#     first_name = models.CharField(max_length=150)
#     last_name = models.CharField(max_length=150)
#     email = models.CharField(max_length=254)
#     is_staff = models.IntegerField()
#     is_active = models.IntegerField()
#     date_joined = models.DateTimeField()
#
#     class Meta:
#         managed = False
#         db_table = 'auth_user'
#
#
# class AuthUserGroups(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_user_groups'
#         unique_together = (('user', 'group'),)
#
#
# class AuthUserUserPermissions(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_user_user_permissions'
#         unique_together = (('user', 'permission'),)
#
#
# class DjangoAdminLog(models.Model):
#     action_time = models.DateTimeField()
#     object_id = models.TextField(blank=True, null=True)
#     object_repr = models.CharField(max_length=200)
#     action_flag = models.PositiveSmallIntegerField()
#     change_message = models.TextField()
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'django_admin_log'
#
#
# class DjangoContentType(models.Model):
#     app_label = models.CharField(max_length=100)
#     model = models.CharField(max_length=100)
#
#     class Meta:
#         managed = False
#         db_table = 'django_content_type'
#         unique_together = (('app_label', 'model'),)
#
#
# class DjangoMigrations(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     app = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     applied = models.DateTimeField()
#
#     class Meta:
#         managed = False
#         db_table = 'django_migrations'
#
#
# class DjangoSession(models.Model):
#     session_key = models.CharField(primary_key=True, max_length=40)
#     session_data = models.TextField()
#     expire_date = models.DateTimeField()
#
#     class Meta:
#         managed = False
#         db_table = 'django_session'
