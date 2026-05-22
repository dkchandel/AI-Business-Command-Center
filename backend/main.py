from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd

from backend.db import cursor
from ai.llm import generate_business_insight

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV Dataset
df = pd.read_csv("data/sales_data.csv")


# Home Route
@app.get("/")
def home():

    return {
        "message": "AI Business Dashboard API Running"
    }


# Total Sales Route
@app.get("/total-sales")
def total_sales():

    total = df["Sales_Amount"].sum()

    return {
        "total_sales": float(total)
    }


# Region Sales Route (MySQL)
@app.get("/region-sales")
def region_sales():

    query = """
    SELECT region, sales_amount
    FROM sales
    """

    cursor.execute(query)

    data = cursor.fetchall()

    return data


# AI Insight Route
@app.get("/ask-ai")
def ask_ai(question: str):

    answer = generate_business_insight(question)

    return {
        "question": question,
        "ai_response": answer
    }