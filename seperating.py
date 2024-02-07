import pandas as pd
from openpyxl import Workbook as openpyxl
total = []
district = []
village = []


# for j in range(1, 11):
dataframe1 = pd.read_excel("all.xlsx" ,usecols="C,E,J",sheet_name=1)
l = dataframe1.values.tolist()
for i  in l:
    f = open("cities1.json", "a")
    f.write(str({"state":i[0],"district":i[1],"village":i[2]},)+",")
    f.close()

# total.append({"state":i[0],"district":i[1],"village":i[2]},)
# print(total)


