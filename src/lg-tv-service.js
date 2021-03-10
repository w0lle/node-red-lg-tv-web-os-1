module.exports = function(RED) {

    const LgRemote = require('lgsmarttvremote');
    

    function LGTVNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.code = n.code;
    };

    RED.httpAdmin.get('/lgtv-connect-2', (req, res) => {
        var lgremote = new LgRemote(req.query.host);
        
        lgremote.requestPairingKey();
        res.status(200).send();
    });

    RED.httpAdmin.get('/lgtv-pair-2', (req, res) => {
        var lgremote = new LgRemote(req.query.host,req.query.code);
        lgremote.commandKey(lgremote.keyCodes.Ok);
        res.status(200).send();
    });

    RED.nodes.registerType("lg-tv",LGTVNode);
}