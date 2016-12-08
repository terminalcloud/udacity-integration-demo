const React = require('react')

module.exports = function ({ bootstrap, PanelManager, Terminal, Editor, Files, Layout }) {
  class Project extends React.Component {
    componentWillMount() {
      bootstrap(this.props.serverUrl)

      this.terminalManager = new PanelManager()
      this.editorManager = new PanelManager()
      this.filesManager = new PanelManager()
    }

    componentDidMount() {
      this.addTestFile()

      this.interval = setInterval(() => {
        this.editorManager.saveAllFiles()
      }, 100)
    }

    componentWillUnmount() {
      clearInterval(this.interval)
    }

    run() {
      this.editorManager.saveAllFiles().then(() => {
        this.terminalManager.destroyTerm(this.terminalManager.getCurrentTermId())
        this.terminalManager.newTerm('test code', '/usr/bin/python', ['-i', '/home/test.py'])
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

      return <div className='theme_light' style={layoutBoxStyle}>
        <div style={{ display: 'none' }}>
          <Files manager={this.filesManager} editorManager={this.editorManager} serverUrl={this.props.serverUrl}/>
        </div>
        <Layout layout={{
          override: true,
          is_hidden: {},
          maximized: '',
          layout: {
            type: 'vertical',
            parts: [
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
                component: <div><div id="runcode_container" className="panel"><button className="btn btn-primary" onClick={() => this.run()}>Run Code!</button></div></div>,
                key: 'run-button',
                weight: 1
              }
            ]
          }
        }}/>
      </div>
    }
  }

  return Project;
}
