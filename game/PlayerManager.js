const Player = require('./Player');

class PlayerManager {
    constructor(){
        this.playersList = new Map;
        this.initGameMessage = `
                    Let's play a game.  
                    I'll send you an emoji riddle and you guess what it is.  
                    The answer will be two words.  
                    Here's the first riddle:  👸 🐝`;
    }

    createPlayer(id){
        if(this.playersList.has(id)){
            throw new Error(`whoops, I goofed somewhere, player ${id} already exists`);
        }
        const player = new Player(id);
        this.playersList.set(id, player);
        console.log(this.playersList);
    }

    respond(id, incomingMessage){
        console.log(this.playersList);
        if(this.playersList.has(id)){
            const game = this.playersList.get(id).game;
            if(!game.started){
                game.init(); 
                return `welcome back, ${id}!  I don't have anything new for you but, ${this.initGameMessage}.`
            } else {
                return game.checkAnswer(incomingMessage);
            }

        } else {
            this.createPlayer(id);
            return this.initGameMessage;
        }

    }
}

module.exports = PlayerManager
