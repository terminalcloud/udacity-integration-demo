const React = require('react')
const $ = require('jquery')

const fixtures = {
  'persistence.py': require('raw!./fixtures/persistence.py'),
  'persistence-test.py': require('raw!./fixtures/persistence-test.py'),
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

    //TODO: do I need to target the run command to a particular project?
    componentDidMount() {
      $.ajax({
        type: 'POST',
        url: this.props.serverUrl + '/exec',
        data: JSON.stringify({ cmd: fixtureCommand}),
        success: () => { this.addWorkFile(); this.run('persistence.py', 'full') }
      })

      this.terminal2Manager.destroyTerm('repl')
      this.terminal2Manager.newTerm('repl', '/usr/bin/python', [], () => this.terminal2Manager.SelectTab('repl'))
    }

    //TODO: run code sign update
    run(file, id) {
      let terminalManager = this.terminalManager
      let editorManager = this.editorManager
      if (id === 'half') {
        terminalManager = this.terminal3Manager
        editorManager = this.editor3Manager
      }
      editorManager.saveAllFiles().then(() => {
        terminalManager.destroyTerm(id)
        terminalManager.newTerm(id, '/usr/bin/python', ['-i', '/home/' + file], () => terminalManager.SelectTab(id))
      })
    }

    addWorkFile() {
      this.filesManager.cd('/home/student_files')
      this.editorManager.openFile('/home/lesson1.py')
      this.editorManager.openFile('/home/persistence.py')
    }

    renderButtons(id) {
      let file = 'persistence.py'
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
                        onClick={() => this.run('persistence-test.py', id)}
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
