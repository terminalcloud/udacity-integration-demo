const $ = require('jquery')

module.exports.getTerminal = function getTerminal() {
  function getHardCodedCookie() {
    return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODM3Mzc1ODgsImlhdCI6MTQ4MTE0NTU4OCwia2lkIjoiYTdlODllZDIxIiwidWlkIjoiNzQyODUyNjA0NiJ9.LNoDj5rJ-XLj23pqrhv93giWID0Kv90i1vLhqBXyHJOQRa3E2kjzpbZUa1W8oF-VbRbKELTZxO15-QZw3UhEy_ElckH-u3nIHYBLX78E-QZt6BOMH8S7XIWl4C12Hlh_tv-AeObY10eK0OsjoHAeWcdlQZ-m0Uj8ReqZjZGK0uScxHD7uBinIJFejId9b0_f_o6MJTt3NfOSgl5bs6rlmP6gkA1lNMBJ871r7v-V1xQsWnhUtf0rH5zy1rC_ptV_mrhVBZmqkbsIDoVqqGzovIiJ_ryDtDc2ph1D3snd13hXynuxG3gwddvOIP7eZAPCbAQHQpUGluA9zETG'
  }

  const url = 'https://www.betaterminal.com/udacity/api/terminal/link'
  const jwt = getHardCodedCookie('_jwt')
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
