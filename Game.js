class Game {
    constructor(){
        this.glyphs = [" 👸 🐝",'⭐ 🐠', '🌽 🐶', '🌊 🐴'];
        this.answers = ['queen bee', 'star fish', 'corn dog', 'sea horse'];
        this.started = false;
        this.glyph = null;
        this.answer = null;
        this.gameCount = null;
        this.gameOver = false;
        this.correctAnswers = 0;
        this.totalAnswers = 4;
        this.remainingGuesses = 3;
    }


    init(){
        this.gameCount = 0;
        this.started = true;
        this.glyph = this.glyphs[this.gameCount];
        this.answer = this.answers[this.gameCount];
    }

    checkAnswer(response){
        if(response.toLowerCase() === this.answer){
            if(this.gameCount < this.glyphs.length - 1){
                this.gameCount++;
                this.answer = this.answers[this.gameCount];
                this.correctAnswers++;
                
                return `yes!  you got it!  try another: ${this.glyphs[this.gameCount]}`
            } else {
                return `yes!  you got it!  thanks for playing, you got ${this.correctAnswers} out of ${this.totalAnswers} correct!  have a great day!`  
            }
            
        } else {
            if(this.remainingGuesses > 1){
                this.remainingGuesses--;
                return `sorry, that's not it!  you've got ${this.remainingGuesses} guesses left. try again!`
            } else {
                const oldAnswer = this.answer;
                this.gameCount++;
                this.remainingGuesses = 3;
                this.answer = this.answers[this.gameCount];
                return `nope!  the answer was ${oldAnswer}.  Try another one : ${this.glyphs[this.gameCount]}`
            }
            
        }
    }

    

}

module.exports = Game;