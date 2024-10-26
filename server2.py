from google.oauth2 import service_account
import gspread

# Define your Google Sheets credentials JSON file path
credentials_file = 'science.json'  # Replace with the path to your service account JSON file

# Define the scope of Google Sheets API you need to access
scope = ['https://www.googleapis.com/auth/spreadsheets']

# Authenticate using service account credentials
credentials = service_account.Credentials.from_service_account_file(
    credentials_file, scopes=scope)

# Open Google Sheets client
gc = gspread.authorize(credentials)

# Open the specific Google Spreadsheet (replace with your spreadsheet ID)
spreadsheet_id = '1VDhmvE0dUElPv05FZKqXK43hMF7TkRIaRSLwAIc65aQ'
sheet = gc.open_by_key(spreadsheet_id).sheet1  # Adjust sheet index if needed

