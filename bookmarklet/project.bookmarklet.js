/* global WebTerminal */

const React = require('react')
const ReactDOM = require('react-dom')
const $ = require('jquery')
const { getTerminal } = require('../util')
const makeProject = require('../project')

require('../index.sass')

// try this on: https://classroom.udacity.com/nanodegrees/nd200/parts/24c5c39a-6040-4d5a-82d8-7d3d30d7bc9a/project

window.$ = $;
window.jQuery = $;

function loadWebTerminal() {
  const scripts = [
    'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js',
    'https://storage.googleapis.com/terminal-cdn/web-terminal-client/dev/public/lib.js'
  ]

  const styles = [
    'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.0/codemirror.css',
    'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.0/addon/scroll/simplescrollbars.css',
    'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.0/theme/solarized.min.css',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700',
    'https://fonts.googleapis.com/css?family=Open+Sans:400,600',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
  ]

  const getScript = (script) => Promise.resolve($.getScript(script))
  const getStyle = (path) => $('<link/>', { rel: 'stylesheet', type: 'text/css', href: path }).appendTo('head')

  styles.forEach(getStyle)
  return Promise.all(scripts.map(getScript))
}

function render(terminalAddress) {
  const { components, bootstrap, parseUrl, PanelManager } = WebTerminal
  const { Terminal, Files, Editor, Layout } = components

  const serverUrl = parseUrl(terminalAddress)
  const Project = makeProject({ bootstrap, PanelManager, Terminal, Editor, Files, Layout })

  const root = document.getElementById('main-layout-content')
  ReactDOM.render(<Project serverUrl={parseUrl(serverUrl)}/>, root);
}

function main() {
  loadWebTerminal().then(getTerminal).then(render)
}

main()
