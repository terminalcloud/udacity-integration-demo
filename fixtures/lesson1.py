import math

balance = 153.55
sales_tax = 0.85
taxes_due = math.floor(balance * sales_tax)
print('Your taxes due are: ' + str(taxes_due))