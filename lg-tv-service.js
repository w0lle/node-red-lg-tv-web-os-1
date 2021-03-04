module.exports = function(RED) {
    function LGTVNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;

        
    };

    RED.httpAdmin.get('/lgtv-connect-2', (req, res) => {
        const fetch = require('node-fetch');
        fetch("http://192.168.178.32:8080/udap/api/pairing", {method:"POST", body:"<auth><type>AuthKeyReq</type></auth>", headers: {"Content-Type":"text/xml; charset=utf-8"}});
        res.status(200).send();
    });

    RED.nodes.registerType("lg-tv",LGTVNode);
}