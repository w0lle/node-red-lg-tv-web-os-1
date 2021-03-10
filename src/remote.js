module.exports = function(RED) {
    const LgRemote = require('lgsmarttvremote');

    function LGNode(config) {
        RED.nodes.createNode(this,config);

        this.tv = RED.nodes.getNode(config.tv);
        this.action = config.action;

        if(this.tv){
            this.host = this.tv.host;
        }

        this.lgremote = new LgRemote(this.host, this.tv.code);

        var node = this;

        node.on('input', function(msg) {
            if(node.action){
                node.lgremote.commandKey(node.lgremote.keyCodes[node.action]);
            }else{
                node.lgremote.commandKey(node.lgremote.keyCodes[msg.payload]);
            }
            //node.lgremote.commandKey(node.lgremote.keyCodes[msg.payload]);
            node.send(msg);
        });
    }
    RED.nodes.registerType("lg-remote",LGNode);
}