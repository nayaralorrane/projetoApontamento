import requests

class ValidateGoogle:
    def validToken(self, token):
        url = 'https://www.googleapis.com/oauth2/v3/userinfo'
        params = { "access_token": token }
        
        response = requests.get(url, params)

        return response