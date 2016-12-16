import math

def taxes_due(balance):
	sales_tax = 0.085
	return math.floor(balance * sales_tax) / 2

print('Your taxes due are: ' + str(taxes_due(12)))
