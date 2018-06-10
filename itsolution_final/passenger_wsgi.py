import os, sys
sys.path.insert(0, '/home/w/workrork/itsolution_final/space_messages')
sys.path.insert(1, '/home/w/workrork/.local/lib/python3.6/site-packages')
os.environ['DJANGO_SETTINGS_MODULE'] = 'space_messages.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()