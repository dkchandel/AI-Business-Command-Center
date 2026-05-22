import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="DC776NQ#$6b+",
    database="ai_business_dashboard"
)

cursor = connection.cursor(dictionary=True)