const React = require('react')

module.exports = function ({ bootstrap, PanelManager, Terminal, Editor, Files, Layout }) {
  class Project extends React.Component {
    componentWillMount() {
      bootstrap(this.props.serverUrl)
      console.log('project terminal only')
      this.terminalManager = new PanelManager()
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
            type: 'vertical',
            parts: [
              {
                component: <Terminal manager={this.terminalManager} serverUrl={this.props.serverUrl}/>,
                key: 'terminal',
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
