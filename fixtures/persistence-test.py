print('Testing your persistence function...')

# Silence stdout while importing file to test
import sys
import cStringIO
save_stdout = sys.stdout
sys.stdout = cStringIO.StringIO()
import persistence
sys.stdout = save_stdout

tests = [(1, 0), (4, 0), (39, 3), (55, 3), (93, 3), (100, 1), (100, 1), (100, 1), (100, 1), (100, 1), (100, 1), 
  (100, 1), (100, 1), (100, 1), (100, 1), (100, 1), (100, 1), (100, 1), (100, 1), (100, 1), (106, 1), (109, 1), 
  (113, 1), (282, 2), (363, 3), (369, 3), (369, 3), (384, 4), (782, 2), (974, 3), (988, 3), (990, 1), (1067, 1), 
  (1416, 2), (2309, 1), (5905, 1), (6248, 5), (8908, 1), (9249, 4), (14185, 2), (21336, 2), (23205, 1), (39308, 1), 
  (39355, 2), (39603, 1), (44270, 1), (68730, 1), (86404, 1), (88048, 1), (93337, 2), (96163, 4), (97681, 2), 
  (144209, 1), (213777, 2), (415318, 2), (455586, 2), (492904, 1), (495728, 2), (523643, 2), (664250, 1), (679394, 2), 
  (702031, 1), (876438, 3), (3672331, 4), (5051546, 1), (5433327, 2), (5776913, 2), (5838698, 2), (5893865, 2), 
  (6429207, 1), (6786395, 2), (6913430, 1), (7162459, 2), (8069648, 1), (8254120, 1), (9378816, 3), 
  (12109992, 1), (16160193, 1), (19434642, 2), (36838629, 3), (47099177, 1), (51318283, 2), (56354961, 2), 
  (56675349, 2), (57520239, 1), (59526921, 2), (66359955, 2), (91032547, 1), (92003312, 1), (97139668, 4), 
  (155145731, 2), (273173689, 2), (493688525, 2), (502095193, 1), (567316176, 2), (700904426, 1), (708424285, 1), 
  (722432899, 3), (781397515, 2), (844591002, 1), (854198736, 2), (911283046, 1), (913388574, 2), (963324574, 2), 
  (990045818, 1)]

for test in tests:
  if persistence.persistence(test[0]) != test[1]:
    raise Exception('Test failed: persistence(' + str(test[0]) + ') did not equal ' + str(test[1]))

print('All tests passed.')