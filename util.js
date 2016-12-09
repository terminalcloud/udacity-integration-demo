const $ = require('jquery')
const DEMO_COOKIE = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODM3Mzc1ODgsImlhdCI6MTQ4MTE0NTU4OCwia2lkIjoiYTdlODllZDIxIiwidWlkIjoiNzQyODUyNjA0NiJ9.LNoDj5rJ-XLj23pqrhv93giWID0Kv90i1vLhqBXyHJOQRa3E2kjzpbZUa1W8oF-VbRbKELTZxO15-QZw3UhEy_ElckH-u3nIHYBLX78E-QZt6BOMH8S7XIWl4C12Hlh_tv-AeObY10eK0OsjoHAeWcdlQZ-m0Uj8ReqZjZGK0uScxHD7uBinIJFejId9b0_f_o6MJTt3NfOSgl5bs6rlmP6gkA1lNMBJ871r7v-V1xQsWnhUtf0rH5zy1rC_ptV_mrhVBZmqkbsIDoVqqGzovIiJ_ryDtDc2ph1D3snd13hXynuxG3gwddvOIP7eZAPCbAQHQpUGluA9zETG'

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            console.log('found jwt on page')
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

module.exports.getTerminal = function getTerminal() {
  const jwt = getCookie('_jwt') || DEMO_COOKIE
  const url = 'https://www.betaterminal.com/udacity/api/terminal/link'
  const projectId = 'f4862cba-db41-4250-bc28-7aaf61f00453'

  const data = {
    udacityJwt: jwt,
    projectId
  }

  return Promise.resolve($.ajax({
    type: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: JSON.stringify(data)
  })).then((data) => {
    return data.link + ':443'
  })
}
