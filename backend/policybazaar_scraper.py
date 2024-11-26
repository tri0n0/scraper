from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import json
from datetime import datetime

class PolicyBazaarScraper:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run in headless mode
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        
        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )

    def __del__(self):
        if hasattr(self, 'driver'):
            self.driver.quit()

    def get_car_insurance_quotes(self, car_number):
        try:
            # Navigate to PolicyBazaar car insurance page
            self.driver.get("https://www.policybazaar.com/motor-insurance/")
            
            # Here you would typically:
            # 1. Find and fill in the car details form
            # 2. Submit the form
            # 3. Wait for quotes to load
            # 4. Extract quote information
            
            # For demonstration, we'll return structured dummy data
            quotes = []
            companies = [
                ("HDFC ERGO", 4.5),
                ("Bajaj Allianz", 4.3),
                ("ICICI Lombard", 4.4),
                ("Tata AIG", 4.2),
                ("New India", 4.1)
            ]
            
            for company_name, rating in companies:
                base_premium = 5000 + (hash(company_name + car_number) % 3000)
                quote = {
                    "company_name": company_name,
                    "premium": base_premium,
                    "monthly_premium": round(base_premium / 12),
                    "coverage_amount": base_premium * 100,
                    "features": [
                        "Third-party liability",
                        "Own damage protection",
                        "Personal accident cover",
                        "Zero depreciation",
                        "24/7 Roadside assistance"
                    ],
                    "claim_settlement_ratio": 92 + (hash(company_name) % 7),
                    "rating": rating,
                    "discount": 10 + (hash(company_name) % 15),
                    "add_ons": {
                        "personal_accident_cover": True,
                        "zero_dep_cover": True,
                        "engine_protection": True,
                        "roadside_assistance": True
                    }
                }
                quotes.append(quote)
            
            return {
                "status": "success",
                "quotes": quotes,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": str(e),
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }

    def wait_for_element(self, by, value, timeout=10):
        return WebDriverWait(self.driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )
