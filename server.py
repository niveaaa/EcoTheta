from flask import Flask, request, jsonify, render_template
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

from google.oauth2 import service_account
import gspread

# Initialize Flask app
app = Flask(__name__)

# Google Sheets credentials and setup
SCOPE = ['https://www.googleapis.com/auth/spreadsheets']
CREDS = Credentials.from_service_account_file('credentials.json', scopes=SCOPE)

# Replace with your spreadsheet ID
SPREADSHEET_ID = '1o1vbTgZQFEE-5UYcLKNdn_d7NPRMys9xAjZezETRs8I'

# Route to display the HTML form
@app.route('/')
def form():
    return render_template('form.html')

# Route to handle form submission
@app.route('/submit', methods=['POST'])
def submit():
    item_type = request.form['type']
    weight = request.form['weight']
    price = request.form['price']

    data = [[item_type, weight, price]]

    try:
        # Connect to Google Sheets API
        service = build('sheets', 'v4', credentials=CREDS)
        sheet = service.spreadsheets()

        # Append data to the sheet
        result = sheet.values().append(
            spreadsheetId=SPREADSHEET_ID,
            range='Sheet1',
            valueInputOption='RAW',
            insertDataOption='INSERT_ROWS',
            body={'values': data}
        ).execute()

        return jsonify({'status': 'success', 'result': result})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'status': 'error', 'message': str(e)})

# Ensure Flask app runs only when executed directly
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
