from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from datetime import datetime
from policybazaar_scraper import PolicyBazaarScraper

app = Flask(__name__)
CORS(app)

# Insurance company data
INSURANCE_COMPANIES = [
    {
        "id": "sgp001",
        "name": "SafeGuard Plus",
        "base_premium_factor": 1.2,
        "claim_settlement_ratio": 98,
        "establishment_year": 1995
    },
    {
        "id": "ape002",
        "name": "AutoProtect Elite",
        "base_premium_factor": 1.1,
        "claim_settlement_ratio": 96,
        "establishment_year": 1998
    },
    {
        "id": "swp003",
        "name": "SecureWheel Pro",
        "base_premium_factor": 1.15,
        "claim_settlement_ratio": 97,
        "establishment_year": 1992
    },
    {
        "id": "dsm004",
        "name": "DriveShield Max",
        "base_premium_factor": 1.25,
        "claim_settlement_ratio": 99,
        "establishment_year": 1990
    },
    {
        "id": "pga005",
        "name": "PrimeGuard Auto",
        "base_premium_factor": 1.18,
        "claim_settlement_ratio": 95,
        "establishment_year": 2000
    }
]

# Available features and add-ons
FEATURES = {
    "basic": [
        "Third-party liability",
        "Own damage protection",
        "Personal accident cover"
    ],
    "premium": [
        "Zero depreciation",
        "Engine protection",
        "24/7 Roadside assistance",
        "NCB protection",
        "Key replacement"
    ],
    "luxury": [
        "Return to invoice",
        "Consumables cover",
        "Passenger cover",
        "Tyre protection",
        "Loss of personal belongings"
    ]
}

pb_scraper = PolicyBazaarScraper()

def calculate_premium(car_number, company_factor):
    """Calculate premium based on car number and company factor"""
    base_premium = random.randint(800, 2000)
    return int(base_premium * company_factor)

def generate_quote(company, car_number):
    base_premium = calculate_premium(car_number, company["base_premium_factor"])

    selected_features = (
        random.sample(FEATURES["basic"], k=len(FEATURES["basic"])) +
        random.sample(FEATURES["premium"], k=random.randint(2, 4)) +
        random.sample(FEATURES["luxury"], k=random.randint(1, 3))
    )
    
    return {
        "company_id": company["id"],
        "company_name": company["name"],
        "premium": base_premium,
        "monthly_premium": round(base_premium / 12),
        "coverage_amount": base_premium * 100,
        "features": selected_features,
        "claim_settlement_ratio": company["claim_settlement_ratio"],
        "establishment_year": company["establishment_year"],
        "rating": round(random.uniform(4.0, 5.0), 1),
        "discount": random.randint(10, 25),
        "add_ons": {
            "personal_accident_cover": True,
            "zero_dep_cover": random.choice([True, False]),
            "engine_protection": random.choice([True, False]),
            "roadside_assistance": True
        },
        "validity": {
            "start_date": datetime.now().strftime("%Y-%m-%d"),
            "duration": "1 year"
        }
    }

@app.route('/api/quotes', methods=['POST'])
def get_insurance_quotes():
    data = request.json
    car_number = data.get('carNumber')
    use_real_data = data.get('useRealData', False)  # New parameter to toggle between mock and real data
    
    if not car_number:
        return jsonify({"error": "Car number is required"}), 400
        
    if not isinstance(car_number, str) or not car_number.isalnum() or len(car_number) != 9:
        return jsonify({
            "error": "Invalid car number format. Please enter a 9-character alphanumeric car number."
        }), 400

    try:
        if use_real_data:
            # Get real quotes from PolicyBazaar
            pb_response = pb_scraper.get_car_insurance_quotes(car_number)
            if pb_response["status"] == "error":
                return jsonify(pb_response), 500
            quotes = pb_response["quotes"]
        else:
            # Use mock data
            quotes = [generate_quote(company, car_number) for company in INSURANCE_COMPANIES]
            
        quotes.sort(key=lambda x: x["premium"])
        
        response = {
            "status": "success",
            "car_number": car_number,
            "quote_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "quotes": quotes,
            "total_quotes": len(quotes),
            "data_source": "policybazaar" if use_real_data else "mock"
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({
            "error": "Failed to generate quotes",
            "message": str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)