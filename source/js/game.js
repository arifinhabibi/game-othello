class Game {
    constructor(){
        this.gridGame = document.getElementById('grid-game')

        this.playerChoice = []

        this.botChoice = []

    }
    
    render(){
        this.create()
        
    }

    create(){
        this.tiles()

        this.tiles = document.querySelectorAll('.tile')

        this.tiles.forEach((tile, index) => {

            if ((index + 1) == 28 || (index + 1) == 37) {
                this.player(tile, index + 1)
            }

            if ((index + 1) == 29  || (index + 1) == 36) {
                this.bot(tile, index + 1)
            }

            tile.addEventListener('click', () => {
                if (!tile.classList.contains('player') && !tile.classList.contains('bot')) {
                    
                    this.player(tile, index+1)
                
                }
            })
        })



    }

    // player action
    player(tile, index){
        tile.classList.add('player')
        this.playerChoice.push(index)
        console.log(this.playerChoice)


        this.playerScore = document.getElementById('scoring-player')

        this.playerScore.innerHTML = this.playerChoice.length

    }

    // bot action
    bot(tile, index){
        tile.classList.add('bot')
        this.botChoice.push(index)

        this.botScore = document.getElementById('scoring-bot')

        this.botScore.innerHTML = this.botChoice.length

    }

    // membuat lantai 8 * 8
    tiles(){
        for (let row = 1; row <= 8; row++) {
            for (let col = 1; col <= 8; col++) {
                const tile = document.createElement('div')
                tile.classList.add('tile')
                this.gridGame.append(tile)
            }
        }
        
    }

}

const game = new Game()

game.render()


const reset = document.querySelector('.reset')

reset.addEventListener('click', () => {
    location.reload()
})