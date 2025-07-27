import requests

response = requests.post(
    "http://localhost:8000/entries",
    json={
        "title": "First Log",
        "body": "It works!",
        "lat": 59.3293,
        "lon": 18.0686
        }
)
print(response.status_code)
print(response.json())
