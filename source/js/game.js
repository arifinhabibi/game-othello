class Game {
    constructor(){
        this.gridGame = document.getElementById('grid-game')
    }

    render(){
        console.log(this.gridGame)
    }
}

const game = new Game()

game.render()