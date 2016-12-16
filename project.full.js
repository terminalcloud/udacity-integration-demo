const React = require('react')
const $ = require('jquery')

const fixtures = {
  'lesson2.py': require('raw!./fixtures/lesson2.py'),
  'lesson2-test.py': require('raw!./fixtures/lesson2-test.py'),
  'lesson1.py': require('raw!./fixtures/lesson1.py')
}

//TODO: move into student files
function commandFor(fixtures, name) {
  return `if [ ! - f /home/${name} ]; then echo '${fixtures[name].replace(/'/g, "'\\''")}' > /home/${name}`
}

const fixtureCommand = Object.keys(fixtures).map(name => commandFor(fixtures, name)).join('\n')

module.exports = function ({ bootstrap, PanelManager, Terminal, Editor, Files, Layout }) {
  class Project extends React.Component {
    componentWillMount() {
      bootstrap(this.props.serverUrl)
      this.terminalManager = new PanelManager()
      this.editorManager = new PanelManager()
      this.filesManager = new PanelManager()
      this.terminal2Manager = new PanelManager()
      this.terminal3Manager = new PanelManager()
      this.editor3Manager = new PanelManager()
      this.files3Manager = new PanelManager()
    }

    componentDidMount() {
      $.ajax({
        type: 'POST',
        url: this.props.serverUrl + '/exec',
        data: JSON.stringify({ cmd: fixtureCommand}),
        success: () => { this.addWorkFile(); this.run('lesson2.py', 'full') }
      })

      this.terminal2Manager.destroyTerm('repl')
      this.terminal2Manager.newTerm('repl', '/usr/bin/python', [], () => this.terminal2Manager.SelectTab('repl'))
    }

    run(file, id) {
      let terminalManager = this.terminalManager
      let editorManager = this.editorManager
      if (id === 'half') {
        terminalManager = this.terminal3Manager
        editorManager = this.editor3Manager
      }
      editorManager.saveAllFiles().then(() => {
        terminalManager.destroyTerm(id)
        terminalManager.newTerm(id, '/usr/bin/python', ['-i', '/home/student_files/' + file], () => terminalManager.SelectTab(id))
      })
    }

    addWorkFile() {
      this.filesManager.cd('/home/student_files')
      this.editorManager.openFile('/home/student_files/lesson1.py')
      this.editorManager.openFile('/home/student_files/lesson2.py')
    }

    renderButtons(id) {
      let file = 'lesson2.py'
      if (id === 'half') { file = 'lesson1.py' }
      return (
        <div>
          <div id="runcode_container" className="panel">
            <button
              className="btn btn-primary"
              onClick={() => this.run(file, id)}
              >Run Code</button>
            {
              id === 'full'
              ? <button className="btn btn-default test"
                        onClick={() => this.run('lesson2-test.py', id)}
                        >Test Code</button>
              : ''
            }
          </div>
        </div>
      )
    }

    render() {
      return (
        <div className="multiple-components">
          <article className="demo-text">
            <p>
              Python has many math functions to help you with numeric calculations. Python can represent all kinds of numbers: integers, fractions, positive and negative, trigonometry constants like PI, etc. Let's experiment with a few of these now. We'll set some variables (as you learned in Chapter 1). Try entering the following code into the interpreter directly below where you see the prompt >>> . :
            </p>
            <pre><code>balance = 153.55</code></pre>
            <pre><code>sales_tax = 0.85</code></pre>
            <pre><code>taxes_due = Math.floor(balance * sales_tax)</code></pre>
            <pre><code>print('Your taxes due are:' + taxes_due)</code></pre>
          </article>
          <div className="terminal-only theme_dark">
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
          <article className="demo-text">
            <p>
              Now let's try applying this to a program. We've created a program for you to start with. Use the editor below to edit the program, and click <b>Run Code</b> to run the program. Change the amount of your starting balance to 2544.53, and make your program round the taxes up. Use math.ceil() to round up.
            </p>
          </article>
          <div className='full-project half_project theme_dark'>
            <div style={{ display: 'none' }}>
              <Files manager={this.files3Manager} editor3Manager={this.editor3Manager} serverUrl={this.props.serverUrl}/>
            </div>
            <Layout layout={{
              override: true,
              is_hidden: {},
              maximized: '',
              layout: {
                type: 'vertical',
                parts: [
                  {
                    component: <Editor manager={this.editor3Manager}
                                       filesManager={this.files3Manager}
                                       serverUrl={this.props.serverUrl}/>,
                    key: 'editor',
                    weight: 6
                  },
                  {
                    component: <Terminal manager={this.terminal3Manager} serverUrl={this.props.serverUrl}/>,
                    key: 'terminal',
                    weight: 6
                  },
                  {
                    component: this.renderButtons('half'),
                    key: 'run-button',
                    weight: 1
                  }
                ]
              }
            }}/>
          </div>
          <article className="demo-text">
            <p>
              Great job! Now that you've modified a program, it's time to write your own. Using the file browser below, double click the file "lesson2.py" and add code to compute your tax refund. At the end of the fiscal year, you should receive a refund on your taxes paid. Assuming you earned $50,000 dollars this year, and you paid 8.5% in taxes, calculate and print out your refund, which will be 50% of your taxes paid thanks to your excellent writeoffs, like this programming course. Press 'Run Code' to run your program and 'Test Code' to see if it is correct.
            </p>
          </article>
          <div className='full-project theme_dark'>
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
                        component: <Terminal manager={this.terminalManager}
                                             serverUrl={this.props.serverUrl}/>,
                        key: 'terminal',
                        weight: 6
                      },
                      {
                        component: this.renderButtons('full'),
                        key: 'run-button',
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
