class Game {
    constructor(){
        this.gridGame = document.getElementById('grid-game')
    }
    
    render(){
        this.create()
        
    }

    create(){
        this.tiles()

        this.tiles = document.querySelectorAll('.tile')

        this.tiles.forEach((tile, index) => {

            if ((index + 1) == 28 || (index + 1) == 37) {
                this.player(tile)
            }

            if ((index + 1) == 29  || (index + 1) == 36) {
                this.bot(tile)
            }

            console.log(index+1 * index+1)

            
            
            tile.addEventListener('click', () => {
                if (!tile.classList.contains('player') || !tile.classList.contains('bot')) {
                    
                    this.player(tile)
                
                }
            })
        })
    }

    player(tile){
        tile.classList.add('player')
    }

    bot(tile){
        tile.classList.add('bot')
    }
    
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