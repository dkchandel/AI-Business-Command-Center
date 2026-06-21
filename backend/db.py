# import mysql.connector

# def get_cursor():
#     connection = mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="DC776NQ#$6b+",
#         database="ai_business_dashboard"
#     )
#     return connection.cursor(dictionary=True)


import mysql.connector

def get_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="DC776NQ#$6b+",
        database="ai_business_dashboard"
    )
    return connection

def get_cursor():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    return connection, cursor