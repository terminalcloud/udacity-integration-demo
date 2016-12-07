/* global WebTerminal */

const { components, bootstrap, parseUrl, PanelManager, bootstrapHotkeys } = WebTerminal
const { Terminal, Files, Editor, Layout } = components

class Project extends React.Component {
  componentWillMount() {
    bootstrap(this.props.serverUrl)

    this.terminalManager = new PanelManager()
    this.editorManager = new PanelManager()
    this.filesManager = new PanelManager()
  }

  run() {
    this.terminalManager.destroyTerm(this.terminalManager.getCurrentTermId())
    this.terminalManager.newTerm('test code', '/bin/bash', ['-c', 'python /home/test.py']);
  }

  render() {
    const layoutBoxStyle = {
      position: 'absolute',
      height: '100%',
      width: '100%'
    }

    return <div className='theme_light' style={layoutBoxStyle}>
      <Layout layout={{
        override: true,
        is_hidden: {},
        maximized: '',
        layout: {
          type: 'horizontal',
          parts: [
            {
              component: <Files manager={this.filesManager} editorManager={this.editorManager} serverUrl={this.props.serverUrl}/>,
              key: 'files',
              weight: 1
            },
            {
              component: <Editor manager={this.editorManager}
                                 filesManager={this.filesManager}
                                 serverUrl={this.props.serverUrl}/>,
              key: 'editor',
              weight: 3
            },
            {
              type: 'vertical',
              parts: [
                {
                  component: <Terminal manager={this.terminalManager} serverUrl={this.props.serverUrl}/>,
                  key: 'terminal',
                  weight: 8
                },
                {
                  component: <button onClick={() => this.run()}>Run Code!</button>,
                  key: 'run-button',
                  weight: 1
                }
              ],
              weight: 2
            }
          ]
        }
      }}/>
    </div>
  }
}

function render(serverUrl) {
  ReactDOM.render(<Project serverUrl={parseUrl(serverUrl)}/>, document.getElementById('root'));
}

render(':8282');

