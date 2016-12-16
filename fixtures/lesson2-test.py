print('Testing your taxes_due function...')

import lesson2

tests = [[0, 0.0], [11, 0.0], [12, 0.5], [100, 4.0], [100000, 4250.0]]

for test in tests:
  if lesson2.taxes_due(test[0]) != test[1]:
    raise Exception('Test failed: taxes_due(' + str(test[0]) + ') did not equal ' + str(test[1]))

print('All tests passed.')