/* global WebTerminal, TERMINAL_DEMO_STAGE  */

const React = require('react')
const ReactDOM = require('react-dom')
const $ = require('jquery')
const { getTerminal } = require('../util')
const makeProject = require('../project.js')

window.TERMINAL_DEMO_STAGE = window.TERMINAL_DEMO_STAGE || 'initialize';
window.$ = $;
window.jQuery = $;

if (TERMINAL_DEMO_STAGE === 'initialize') {
  require('../index.sass')
}

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

  if (TERMINAL_DEMO_STAGE === 'initialize') {
    console.log('append scripts and stylesheets')
    const getStyle = (path) => $('<link/>', { rel: 'stylesheet', type: 'text/css', href: path }).appendTo('head')
    styles.forEach(getStyle)
    document.getElementsByTagName('body')[0].setAttribute('class', 'theme_light')
  }

  const getScript = (script) => Promise.resolve($.getScript(script))
  return Promise.all(scripts.map(getScript))
}

function render(terminalAddress) {
  const { components, bootstrap, parseUrl, PanelManager } = WebTerminal
  const { Terminal, Files, Editor, Layout } = components

  const serverUrl = parseUrl(terminalAddress)
  let Project;
  let terminalNode = document.getElementById('terminal-demo');

  // create the dom node for rendering into
  const oldNode = document.getElementById('terminal-demo')
  const root = document.getElementById('main-layout-content')
  if (oldNode) {
    root.removeChild(oldNode)
  }
  terminalNode = document.createElement('div')
  terminalNode.id = 'terminal-demo'
  jQuery(root).append(terminalNode)

  Project = makeProject({ bootstrap, PanelManager, Terminal, Editor, Files, Layout })
  ReactDOM.render(<Project serverUrl={parseUrl(serverUrl)}/>, terminalNode);
}

function main() {
  loadWebTerminal().then(getTerminal).then(render)
}

main()