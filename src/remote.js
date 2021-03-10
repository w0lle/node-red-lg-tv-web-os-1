module.exports = function(RED) {
    const LgRemote = require('lgsmarttvremote');

    function LGNode(config) {
        RED.nodes.createNode(this,config);

        this.tv = RED.nodes.getNode(config.tv);

        if(this.tv){
            this.host = this.tv.host;
        }

        this.lgremote = new LgRemote(this.host, this.tv.code);

        var node = this;

        node.on('input', function(msg) {
            node.lgremote.commandKey(node.lgremote.keyCodes[msg.payload]);
            node.send(msg);
        });
    }
    RED.nodes.registerType("lg-remote",LGNode);
}