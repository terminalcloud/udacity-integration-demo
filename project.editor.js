const React = require('react')

module.exports = function ({ bootstrap, PanelManager, Terminal, Editor, Files, Layout }) {
  class Project extends React.Component {
    componentWillMount() {
      bootstrap(this.props.serverUrl)
      console.log('project editor only')
      this.editorManager = new PanelManager()
      this.filesManager = new PanelManager()
    }

    componentDidMount() {
      this.addTestFile()
    }

    run() {
      this.editorManager.saveAllFiles()
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
                weight: 1
              },
            ]
          }
        }}/>
      </div>
    }
  }

  return Project;
}
