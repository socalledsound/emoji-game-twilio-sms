const Game = require('./Game');

class Player {
    constructor(id){
        this.id = id;
        this.game = new Game();
        this.game.init();
    }
}

module.exports = Player;