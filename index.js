/* global WebTerminal */

const { components, bootstrap, parseUrl, PanelManager, bootstrapHotkeys } = WebTerminal
const { Terminal, Files, Editor, Layout } = components
const React = require('react')
const ReactDOM = require('react-dom')
const { getTerminal } = require('./util.js')
const makeProject = require('./project.js')

require('./index.sass')

const Project = makeProject({ bootstrap, PanelManager, Terminal, Editor, Files, Layout })

function render(serverUrl) {
  ReactDOM.render(<Project serverUrl={parseUrl(serverUrl)}/>, document.getElementById('root'));
}

getTerminal().then((res) => {
  console.log("Terminal address: " + res)
  render(res);
});



