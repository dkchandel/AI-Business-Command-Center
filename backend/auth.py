# from fastapi import APIRouter
# from backend.db import get_cursor

# router = APIRouter()

# @router.post("/login")
# def login(user: dict):
#     email = user["email"]
#     password = user["password"]

#     query = """
#     SELECT * FROM users
#     WHERE email=%s AND password=%s
#     """
#     values = (email, password)

#     cursor = get_cursor()          # ← yeh line missing thi!
#     cursor.execute(query, values)
#     existing_user = cursor.fetchone()
#     cursor.close()                 # ← close karna zaruri hai

#     if existing_user:
#         return {
#             "message": "Login successful",
#             "user": existing_user
#         }

#     return {
#         "message": "Invalid email or password"
#     }


from fastapi import APIRouter
from backend.db import get_connection

router = APIRouter()

@router.post("/login")
def login(user: dict):
    try:
        email = user["email"]
        password = user["password"]

        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT * FROM users
        WHERE email=%s AND password=%s
        """
        values = (email, password)

        cursor.execute(query, values)
        existing_user = cursor.fetchone()

        cursor.close()
        connection.close()

        if existing_user:
            return {
                "message": "Login successful",
                "user": existing_user
            }

        return {
            "message": "Invalid email or password"
        }

    except Exception as e:
        return {
            "error": str(e)
        }