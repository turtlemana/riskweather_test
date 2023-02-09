"""
WSGI config for rw_backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os, sys

# add the hellodjango project path into the sys.path
sys.path.append('/home/deploy/Riskweather_v2/backend')

# add the virtualenv site-packages path to the sys.path
# sys.path.append('/home/deploy/Riskweather_v2/backend/venv/lib/site-packages')
sys.path.append('/usr/local/lib/python3.10/dist-packages')
sys.path.append('/home/ubuntu/.local/lib/python3.10/site-packages')
sys.path.append('/usr/lib/python3/dist-packages')
# poiting to the project settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rw_backend.settings")

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
