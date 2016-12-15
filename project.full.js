const React = require('react')
const $ = require('jquery')

const fixtures = {
  'persistence.py': require('raw!./fixtures/persistence.py'),
  'persistence-test.py': require('raw!./fixtures/persistence-test.py')
}

function commandFor(fixtures, name) {
  return `if [ ! - f /home/${name} ]; then echo '${fixtures[name].replace(/'/g, "'\\''")}' > /home/${name}`
}

const fixtureCommand = Object.keys(fixtures).map(name => commandFor(fixtures, name)).join('\n')

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
        success: () => { this.addWorkFile(); this.run('persistence.py') }
      })

      this.terminal2Manager.destroyTerm('repl')
      this.terminal2Manager.newTerm('repl', '/usr/bin/python', [], () => this.terminal2Manager.SelectTab('repl'))
    }

    run(file) {
      this.editorManager.saveAllFiles().then(() => {
        this.terminalManager.destroyTerm('test code')
        this.terminalManager.newTerm('test code', '/usr/bin/python', ['-i', '/home/' + file], () => this.terminalManager.SelectTab('test code'))

      })
    }

    addWorkFile() {
      this.editorManager.openFile('/home/persistence.py')
    }

    render() {
      const layoutBoxStyle = {
        position: 'absolute',
        height: '100%',
        width: '100%'
      }

      return (
        <div className="multiple-components">
          <div className="full-project">
            <div style={{display: 'none'}}>
              <Files manager={this.filesManager}
                                editorManager={this.editorManager}
                                serverUrl={this.props.serverUrl}>
              </Files>
            </div>
            <div className="theme_dark" style={layoutBoxStyle}>
              <Layout layout={{
                override: true,
                is_hidden: {},
                maximized: '',
                layout: [
                  {
                    component: <Editor manager={this.editorManager}
                                       filesManager={this.filesManager}
                                       serverUrl={this.props.serverUrl}/>,
                    key: 'editor',
                    weight: 6
                  },
                  {
                    component: <Terminal manager={this.terminalManager} serverUrl={this.props.serverUrl}/>,
                    key: 'terminal',
                    weight: 6
                  },
                  {
                    component: <div><div id="runcode_container" className="panel"><button className="btn btn-primary" onClick={() => this.run('persistence.py')}>Run Code!</button><button className="btn btn-default test" onClick={() => this.run('persistence-test.py')}>Test Code</button></div></div>,
                    key: 'run-button',
                    weight: 1
                  }
                  ]
              }}/>
            </div>
          </div>
        </div>
      )
    }
  }

  return Project;
}
