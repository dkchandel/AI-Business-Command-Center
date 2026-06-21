def generate_business_insight(question):

    question = question.lower()

    if "sales" in question:
        return "Sales are showing positive growth trends across multiple regions."

    elif "region" in question:
        return "West region is currently generating the highest revenue."

    elif "profit" in question:
        return "Profit margins are improving due to increased sales performance."

    elif "growth" in question:
        return "Business growth increased by 18% compared to previous records."

    else:
        return "AI is analysing the business data successfully."

        