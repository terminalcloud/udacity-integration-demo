# Write a function, persistence, that takes in a positive parameter num and returns its 
# multiplicative persistence, which is the number of times you must multiply the digits 
# in num until you reach a single digit.

import operator

def persistence(n):
    cur = n
    i = 0
    while cur > 9:
        i = i + 1
        cur = reduce(operator.mul, digits(cur), 1)
    return i
  
def digits(n):
    dig = []
    while n > 9:
        dig.append(n % 10)
        n /= 10
    dig.append(n)
    return dig

print(persistence(1))
print(persistence(17))
print(persistence(129))
print(persistence(1231))