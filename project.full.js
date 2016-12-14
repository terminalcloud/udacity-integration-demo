const React = require('react')
const $ = require('jquery')

var fixtureNames = ['persistence.py', 'persistence-test.py'];
var fixtureData = [`# Write a function, persistence, that takes in a positive parameter num and returns its 
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

      `, `print('Testing your persistence function...')

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
`];
var fixtureCommand = "";
for (var i in fixtureNames) {
  var escapedFileData = fixtureData[i].replace(/'/g, "'\\''");
  fixtureCommand += 'if [ ! -f /home/' + fixtureNames[i] + ' ] ; then  echo \'' + escapedFileData + '\' > /home/' + fixtureNames[i] + '; fi\n'
}

module.exports = function ({ bootstrap, PanelManager, Terminal, Editor, Files, Layout }) {
  class Project extends React.Component {
    componentWillMount() {
      bootstrap(this.props.serverUrl)
      console.log('full project')
      this.terminalManager = new PanelManager()
      this.editorManager = new PanelManager()
      this.filesManager = new PanelManager()
      this.terminal2Manager = new PanelManager()
    }

    componentDidMount() {
      $.ajax({
        type: 'POST',
        url: this.props.serverUrl + '/exec',
        data: JSON.stringify({ cmd: fixtureCommand}),
        success: () => { this.addTestFile(); this.run() }
      })
    }

    run(file) {
      this.editorManager.saveAllFiles().then(() => {
        this.terminalManager.destroyTerm(this.terminalManager.getCurrentTermId())
        this.terminalManager.newTerm('test code', '/usr/bin/python', ['-i', '/home/' + file])

        this.terminal2Manager.destroyTerm('repl')
        this.terminal2Manager.newTerm('repl', '/usr/bin/python', [], () => this.terminal2Manager.SelectTab('repl'))
      })
    }

    addTestFile() {
      this.editorManager.openFile('/home/test.py')
    }

    render() {
      const layoutBoxStyle = {
        position: 'absolute',
        height: '100%',
        width: '100%'
      }

      return (
        <div className="multiple-components">
          <div className='full-project theme_dark' style={layoutBoxStyle}>
            <Layout layout={{
              override: true,
              is_hidden: {},
              maximized: '',
              layout: {
                type: 'vertical',
                parts: [
                  {
                    type: 'horizontal',
                    parts: [
                      {
                        component: <Files manager={this.filesManager}
                                          editorManager={this.editorManager}
                                          serverUrl={this.props.serverUrl}/>,
                        key: 'files',
                        weight: 2
                      },
                      {
                        component: <Editor manager={this.editorManager}
                                           filesManager={this.filesManager}
                                           serverUrl={this.props.serverUrl}/>,
                        key: 'editor',
                        weight: 6
                      },
                   ],
                   weight: 6
                 },
                      {
                        component: <Terminal manager={this.terminalManager} serverUrl={this.props.serverUrl}/>,
                        key: 'terminal',
                        weight: 6
                      },
                      {
                        component: <div><div id="runcode_container" className="panel"><button className="btn btn-primary" onClick={() => this.run('persistence.py')}>Run Code!</button><button className="btn btn-default ml-4" onClick={() => this.run('persistence-test.py')}>Test Code</button></div></div>,
                        key: 'run-button',
                        weight: 1
                      }
                ]
              }
            }}/>
          </div>
          <article className="demo-text" style={{ position: 'relative', top: 680 }}>
            <p>
              Let's focus on how python  math actually works. When you're working in Python you can use
              the "math" library to access many functions to speed your everyday computations along. For
              instance, you can use ceil(), floor(), and round() to convert fractional numbers to nice round
              integers in a predictable way.
            </p>
            <p>
              To show this off, let's play with a few of these in the python interpreter below. Enter math.ceil(4.5) into
               the interpreter and see what it says. Then try math.floor(4.5). Did this do what you'd expect?
            </p>
          </article>
          <div className="terminal-only" style={{ top: 700, position: 'relative', height: 300, marginBottom: 200 }}>
            <Layout layout={{
                is_hidden: {},
                maximized: '',
                layout: {
                  type: 'horizontal',
                  parts: [
                    {
                      component: <Terminal manager={this.terminal2Manager} serverUrl={this.props.serverUrl}/>,
                      key: 'terminal',
                      weight: 1
                    }
                  ]
                }
              }}/>
          </div>
        </div>
      )
    }
  }

  return Project;
}
