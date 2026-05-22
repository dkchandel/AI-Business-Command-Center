from fastapi.middleware.cors import CORSMiddleware
from ai.llm import generate_business_insight

from fastapi import FastAPI
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dataset
df = pd.read_csv("data/sales_data.csv")


# Home route
@app.get("/")
def home():
    return {"message": "AI Business Dashboard API Running"}


# Total sales route
@app.get("/total-sales")
def total_sales():
    total = df["Sales_Amount"].sum()

    return {
        "total_sales": float(total)
    }


# Region wise sales
@app.get("/region-sales")
def region_sales():

    region_data = (
        df.groupby("Region")["Sales_Amount"]
        .sum()
        .to_dict()
    )

    return region_data


# AI Insight Route
@app.get("/ask-ai")
def ask_ai(question: str):

    answer = generate_business_insight(question)

    return {
        "question": question,
        "ai_response": answer
    }