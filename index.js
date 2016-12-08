/* global WebTerminal */

const { components, bootstrap, parseUrl, PanelManager, bootstrapHotkeys } = WebTerminal
const { Terminal, Files, Editor, Layout } = components
const React = require('react')
const ReactDOM = require('react-dom')

require('./index.sass')

class Project extends React.Component {
  componentWillMount() {
    bootstrap(this.props.serverUrl)

    this.terminalManager = new PanelManager()
    this.editorManager = new PanelManager()
    this.filesManager = new PanelManager()
  }

  componentDidMount() {
    this.addTestFile()
  }

  run() {
    this.terminalManager.destroyTerm(this.terminalManager.getCurrentTermId())
    this.terminalManager.newTerm('test code', '/bin/bash', ['-c', 'python /home/test.py']);
  }

  addTestFile() {
    this.terminalManager.newTerm('create test file', '/bin/bash', ['-c', 'touch /home/test.py']);
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
              weight: 5
            },
            {
              component: <Terminal manager={this.terminalManager} serverUrl={this.props.serverUrl}/>,
              key: 'terminal',
              weight: 5
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

function render(serverUrl) {
  ReactDOM.render(<Project serverUrl={parseUrl(serverUrl)}/>, document.getElementById('root'));
}

function getTerminalAddress(accept, reject) {

  function getHardCodedCookie() {
      return "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODM3Mzc1ODgsImlhdCI6MTQ4MTE0NTU4OCwia2lkIjoiYTdlODllZDIxIiwidWlkIjoiNzQyODUyNjA0NiJ9.LNoDj5rJ-XLj23pqrhv93giWID0Kv90i1vLhqBXyHJOQRa3E2kjzpbZUa1W8oF-VbRbKELTZxO15-QZw3UhEy_ElckH-u3nIHYBLX78E-QZt6BOMH8S7XIWl4C12Hlh_tv-AeObY10eK0OsjoHAeWcdlQZ-m0Uj8ReqZjZGK0uScxHD7uBinIJFejId9b0_f_o6MJTt3NfOSgl5bs6rlmP6gkA1lNMBJ871r7v-V1xQsWnhUtf0rH5zy1rC_ptV_mrhVBZmqkbsIDoVqqGzovIiJ_ryDtDc2ph1D3snd13hXynuxG3gwddvOIP7eZAPCbAQHQpUGluA9zETG";
  }

  var url = "https://www.jesse2.test-cluster.com/udacity/api/terminal/link"
  var jwt = getHardCodedCookie("_jwt");
  var projectId = "f4862cba-db41-4250-bc28-7aaf61f00453";



  var data = {
      udacityJwt: jwt,
      projectId: projectId
  };

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      accept(JSON.parse(this.responseText)['link']);
    }
  });

  xhr.open("POST", url);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("accept", "application/json");

  xhr.send(JSON.stringify(data));
}

new Promise(getTerminalAddress).then((res) => {
  console.log("terminal address: " + res)
  render(res + ':443');
});



