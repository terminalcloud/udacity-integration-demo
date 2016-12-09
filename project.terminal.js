const React = require('react')

module.exports = function ({ bootstrap, PanelManager, Terminal, Editor, Files, Layout }) {
  class Project extends React.Component {
    componentWillMount() {
      bootstrap(this.props.serverUrl)
      this.terminalManager = new PanelManager()
    }

    run() {
      this.terminalManager.destroyTerm(this.terminalManager.getCurrentTermId())
      this.terminalManager.newTerm('test code', '/usr/bin/python', ['-i', '/home/test.py'])
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
                component: <Terminal manager={this.terminalManager} serverUrl={this.props.serverUrl}/>,
                key: 'terminal',
              },
            ]
          }
        }}/>
      </div>
    }
  }

  return Project;
}
