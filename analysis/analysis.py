import pandas as pd
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv("data/sales_data.csv")

# Show columns
print("Columns:")
print(df.columns)

# First rows
print("\nFirst 5 Rows:")
print(df.head())

# Total rows
print("\nTotal Rows:")
print(len(df))

# Missing values
print("\nMissing Values:")
print(df.isnull().sum())

# Numeric summary
print("\nNumeric Summary:")
print(df.describe())

# Product category wise sales
print("\nProduct Category Wise Sales:")
print(
    df.groupby("Product_Category")["Sales_Amount"]
    .sum()
    .sort_values(ascending=False)
)

# Region wise sales
# print("\nRegion Wise Sales:")
# print(
#     df.groupby("Region")["Sales_Amount"]
#     .sum()
# )

# # Graph
# df.groupby("Region")["Sales_Amount"].sum().plot(kind="bar")

# plt.title("Region Wise Sales")
# plt.xlabel("Region")
# plt.ylabel("Sales Amount")

# plt.show()



#second code

# Top Sales Representatives
print("\nTop Sales Representatives:")
print(
    df.groupby("Sales_Rep")["Sales_Amount"]
    .sum()
    .sort_values(ascending=False)
)

# Sales Channel Analysis
print("\nSales Channel Analysis:")
print(
    df.groupby("Sales_Channel")["Sales_Amount"]
    .sum()
)

# Customer Type Analysis
print("\nCustomer Type Analysis:")
print(
    df.groupby("Customer_Type")["Sales_Amount"]
    .sum()
)

#3rd code

# Sales by Region
df.groupby("Region")["Sales_Amount"].sum().plot(kind="bar")

plt.title("Region Wise Sales")
plt.xlabel("Region")
plt.ylabel("Sales Amount")

plt.show()

# Sales Channel Pie Chart
df.groupby("Sales_Channel")["Sales_Amount"].sum().plot(kind="pie", autopct="%1.1f%%")

plt.title("Sales Channel Distribution")

plt.ylabel("")

plt.show()