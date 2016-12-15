# Some comment
def digits(n):
    dig = []
    while n > 9:
        dig.append(n % 10)
        n /= 10
    dig.append(n)
    return dig
