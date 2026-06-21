# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from backend.auth import router as auth_router

# from backend.db import get_cursor
# from ai.llm import generate_business_insight

# app = FastAPI()

# # ==============================
# # Include Auth Routes
# # ==============================
# app.include_router(auth_router)

# # ==============================
# # CORS Middleware
# # ==============================
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ==============================
# # Home Route
# # ==============================
# @app.get("/")
# def home():
#     return {
#         "message": "AI Business Dashboard API Running"
#     }


# # ==============================
# # Total Sales API
# # ==============================
# @app.get("/total-sales")
# def total_sales():

#     cursor = get_cursor()

#     query = """
#     SELECT SUM(sales_amount) AS total_sales
#     FROM sales
#     """

#     cursor.execute(query)

#     data = cursor.fetchone()

#     cursor.close()

#     return {
#         "total_sales": data["total_sales"] if data else 0
#     }


# # ==============================
# # Region Sales API
# # ==============================
# @app.get("/total-sales")
# def total_sales():

#     try:
#         cursor = get_cursor()

#         cursor.execute(
#             "SELECT SUM(sales_amount) AS total_sales FROM sales"
#         )

#         data = cursor.fetchone()

#         cursor.close()

#         return {
#             "total_sales": data["total_sales"]
#         }

#     except Exception as e:

#         return {
#             "error": str(e)
#         }


# # ==============================
# # Top Region API
# # ==============================
# @app.get("/top-region")
# def top_region():

#     cursor = get_cursor()

#     query = """
#     SELECT region, sales_amount
#     FROM sales
#     ORDER BY sales_amount DESC
#     LIMIT 1
#     """

#     cursor.execute(query)

#     data = cursor.fetchone()

#     cursor.close()

#     return data


# # ==============================
# # Sales Growth API
# # ==============================
# @app.get("/sales-growth")
# def sales_growth():

#     current_sales = 120000
#     previous_sales = 100000

#     growth = (
#         (current_sales - previous_sales)
#         / previous_sales
#     ) * 100

#     return {
#         "growth_percentage": round(growth, 2)
#     }


# # ==============================
# # AI Insight API
# # ==============================
# @app.get("/ask-ai")
# def ask_ai(question: str):

#     answer = generate_business_insight(question)

#     return {
#         "question": question,
#         "ai_response": answer
#     }


# # ==============================
# # Database Status API
# # ==============================
# @app.get("/database-status")
# def database_status():

#     try:
#         # cursor = get_cursor()
#         # cursor.execute("SELECT 1")
#         # cursor.fetchone()
#         # cursor.close()
        

#         return {
#             "status": "Connected"
#         }

#     except Exception as e:
#         return {
#             "status": "Disconnected",
#             "error": str(e)
#         }

        









# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from backend.auth import router as auth_router
# from backend.db import get_cursor
# from ai.llm import generate_business_insight

# app = FastAPI()

# app.include_router(auth_router)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def home():
#     return {"message": "AI Business Dashboard API Running"}


# # ==============================
# # Total Sales API
# # ==============================
# @app.get("/total-sales")
# def total_sales():
#     try:
#         cursor = get_cursor()
#         cursor.execute("SELECT SUM(sales_amount) AS total_sales FROM sales")
#         data = cursor.fetchone()
#         cursor.close()
#         return {"total_sales": data["total_sales"] if data else 0}
#     except Exception as e:
#         return {"error": str(e)}


# # ==============================
# # Region Sales API  ← YEH MISSING THA, ISLIYE 404 AA RAHA THA
# # ==============================
# @app.get("/region-sales")
# def region_sales():
#     try:
#         cursor = get_cursor()
#         cursor.execute(
#             "SELECT region, SUM(sales_amount) AS total FROM sales GROUP BY region"
#         )
#         data = cursor.fetchall()
#         cursor.close()
#         return {"region_sales": data}
#     except Exception as e:
#         return {"error": str(e)}


# # ==============================
# # Top Region API
# # ==============================
# @app.get("/top-region")
# def top_region():
#     try:
#         cursor = get_cursor()
#         cursor.execute("""
#             SELECT region, sales_amount
#             FROM sales
#             ORDER BY sales_amount DESC
#             LIMIT 1
#         """)
#         data = cursor.fetchone()
#         cursor.close()
#         return data
#     except Exception as e:
#         return {"error": str(e)}


# # ==============================
# # Sales Growth API
# # ==============================
# @app.get("/sales-growth")
# def sales_growth():
#     current_sales = 120000
#     previous_sales = 100000
#     growth = ((current_sales - previous_sales) / previous_sales) * 100
#     return {"growth_percentage": round(growth, 2)}


# # ==============================
# # AI Insight API
# # ==============================
# @app.get("/ask-ai")
# def ask_ai(question: str):
#     answer = generate_business_insight(question)
#     return {"question": question, "ai_response": answer}


# # ==============================
# # Database Status API
# # ==============================
# @app.get("/database-status")
# def database_status():
#     try:
#         cursor = get_cursor()
#         cursor.execute("SELECT 1")
#         cursor.fetchone()
#         cursor.close()
#         return {"status": "Connected"}
#     except Exception as e:
#         return {"status": "Disconnected", "error": str(e)}





from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.auth import router as auth_router
from backend.db import get_cursor
from ai.llm import generate_business_insight

app = FastAPI()

app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Business Dashboard API Running"}


@app.get("/total-sales")
def total_sales():
    try:
        connection, cursor = get_cursor()
        cursor.execute("SELECT SUM(sales_amount) AS total_sales FROM sales")
        data = cursor.fetchone()
        cursor.close()
        connection.close()
        return {"total_sales": data["total_sales"] if data else 0}
    except Exception as e:
        return {"error": str(e)}


@app.get("/region-sales")
def region_sales():
    try:
        connection, cursor = get_cursor()
        cursor.execute(
            "SELECT region, SUM(sales_amount) AS total FROM sales GROUP BY region"
        )
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        return {"region_sales": data}
    except Exception as e:
        return {"error": str(e)}


@app.get("/top-region")
def top_region():
    try:
        connection, cursor = get_cursor()
        cursor.execute("""
            SELECT region, sales_amount
            FROM sales
            ORDER BY sales_amount DESC
            LIMIT 1
        """)
        data = cursor.fetchone()
        cursor.close()
        connection.close()
        return data
    except Exception as e:
        return {"error": str(e)}


@app.get("/sales-growth")
def sales_growth():
    current_sales = 120000
    previous_sales = 100000
    growth = ((current_sales - previous_sales) / previous_sales) * 100
    return {"growth_percentage": round(growth, 2)}


@app.get("/ask-ai")
def ask_ai(question: str):
    answer = generate_business_insight(question)
    return {"question": question, "ai_response": answer}


@app.get("/database-status")
def database_status():
    try:
        connection, cursor = get_cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()
        cursor.close()
        connection.close()
        return {"status": "Connected"}
    except Exception as e:
        return {"status": "Disconnected", "error": str(e)}