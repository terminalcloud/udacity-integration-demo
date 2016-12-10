const React = require('react')
const $ = require('jquery')

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
        data: JSON.stringify({ cmd: `if [ ! -f /home/test.py ] ; then  echo "print 'Hello World'" > /home/test.py; fi` }),
        success: () => { this.addTestFile() }
      })
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

      return <div className='theme_dark' style={layoutBoxStyle}>
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
                    component: <div><div id="runcode_container" className="panel"><button className="btn btn-primary" onClick={() => this.run()}>Run Code!</button></div></div>,
                    key: 'run-button',
                    weight: 1
                  }
            ]
          }
        }}/>

      <br/>
      <p style={{ position: 'relative', top: 680 }}>
        Some content can go here!

        And more content! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
      </p>

      <div style={{ top: 800, position: 'relative', height: 300, marginBottom: 200 }}>
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
    }
  }

  return Project;
}
