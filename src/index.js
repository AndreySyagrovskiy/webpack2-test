import {a} from "./tt"

require.ensure(['moment'], function (require) {
  const _ = require('lodash');
  require("./style.css");
  const moment = require("moment");

  console.log(moment().format(), 999);

  function component() {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());

})