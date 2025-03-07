import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.conf import settings

class Util:
    @staticmethod
    def send_email(email, subject, body, is_html=False):
        '''
        Function to send an email to a user's email.
        Parameters:
        * subject - Subject of the email
        * body - The content the email should contain (can be plain text or HTML)
        * email - The recipient's email address (can be a single address or a list)
        * is_html - Boolean indicating whether the email body is HTML (default is False for plain text)
        '''

        EMAIL_HOST = settings.EMAIL_HOST
        EMAIL_HOST_USER = settings.EMAIL_HOST_USER
        EMAIL_HOST_PASSWORD = settings.EMAIL_HOST_PASSWORD
        EMAIL_PORT = settings.EMAIL_PORT
        EMAIL_USE_SSL = settings.EMAIL_USE_SSL
        EMAIL_USE_TLS = settings.EMAIL_USE_TLS

        # Create the email message object
        msg = MIMEMultipart()
        msg['From'] = EMAIL_HOST_USER
        msg['Subject'] = subject

        # Attach the body as HTML or plain text based on is_html flag
        if is_html:
            msg.attach(MIMEText(body, 'html', 'utf-8'))
        else:
            msg.attach(MIMEText(body, 'plain', 'utf-8'))

        # Logic for SSL and TLS based on environment
        if EMAIL_USE_SSL:
            with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as conn:
                conn.login(user=EMAIL_HOST_USER, password=EMAIL_HOST_PASSWORD)
                Util._send_email_logic(conn, email, msg, EMAIL_HOST_USER)

        elif EMAIL_USE_TLS:
            with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as conn:
                conn.starttls()
                conn.login(user=EMAIL_HOST_USER, password=EMAIL_HOST_PASSWORD)
                Util._send_email_logic(conn, email, msg, EMAIL_HOST_USER)

        else:
            with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as conn:
                conn.login(user=EMAIL_HOST_USER, password=EMAIL_HOST_PASSWORD)
                Util._send_email_logic(conn, email, msg, EMAIL_HOST_USER)

    @staticmethod
    def _send_email_logic(conn, email, msg, from_addr):
        if isinstance(email, (list, tuple)):
            for recipient in email:
                msg['To'] = recipient
                conn.sendmail(from_addr=from_addr, to_addrs=recipient, msg=msg.as_string())
        else:
            msg['To'] = email
            conn.sendmail(from_addr=from_addr, to_addrs=email, msg=msg.as_string())
