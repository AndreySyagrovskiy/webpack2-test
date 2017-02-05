export function a() {
    require.ensure(['moment'], function (require) {
        require("./style.css");
        const moment = require("moment");
        console.log(moment().format(), 999);
    });
}