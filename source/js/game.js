class Game {
    constructor(){
        this.gridGame = document.getElementById('grid-game')

        this.playerChoice = []
        this.botChoice    = []

        this.cells = [];

        this.dom = document.querySelector('.game-main');
        this.displayName = document.querySelector('.display-name');

        this.botScore = document.getElementById('scoring-bot')

        this.playerScore = document.getElementById('scoring-player')


    }
    
    render(){
        this.create() 

    }

    mount() {
        this.dom.classList.add('active');

        this.displayName.innerHTML = intro.inputName.value; 
    }

    unMount() {
        this.dom.classList.remove('active');
    }

    create(){
        
        
        let countBot =  this.cells.filter((cell) => cell.dom.classList.contains('bot'))
        this.botScore.innerHTML = countBot.length

        let countPlayer =  this.cells.filter((cell) => cell.dom.classList.contains('player'))
        this.playerScore.innerHTML = countPlayer.length



        this.tiles()
        
        this.bot(4, 4)
        // this.bot(3, 4)
        // this.bot(2, 4)
        this.bot(5, 5)
        this.player(5, 4)
        this.player(4, 5)

        

        this.generateSuggest();

    }

    generateSuggest() {
        this.cells.forEach(cell => cell.dom.classList.remove('step'));
        const playerCells = this.cells.filter(cell => cell.dom.classList.contains('player'));

        playerCells.forEach((players) => {
            
            
            // cari data bot yang ad di atas
            let top = players.row - 1
            let stop = false
            let disc = []
            while(!stop){
                let dataBotTop = this.cells.find((cel) => cel.dom.classList.contains('bot') && cel.col == players.col &&  cel.row == top)
                if (dataBotTop) {
                    disc.push(dataBotTop)
                    top--
                }else {
                    if (top == 0) {
                        disc = []
                    }
                    stop = true
                }
                
            }
            this.cells.find(cell2 => players.row !== top+1 && cell2.row === top && cell2.col === players.col)?.setSuggest(disc[disc.length - 1], 'top')
            
            // cari data bot yang ada di kanan
            let right = players.col + 1
            stop = false
            disc = []
            while(!stop){
                let dataBotRight = this.cells.find((cell) => cell.dom.classList.contains('bot') && cell.row == players.row && cell.col == right)
                if (dataBotRight) {
                    disc.push(dataBotRight)
                    right++
                } else {
                    if (right == 0) {
                        disc = []
                    }
                    stop= true
                }
            }
            this.cells.find(cell2 => players.col !== right-1 && cell2.col === right && cell2.row == players.row)?.setSuggest(disc[disc.length - 1], 'right')
            
            
            // cari data bot yang ad di kiri
            let left = players.col - 1
            stop = false
            disc = []
            while(!stop){
                let dataBotLeft = this.cells.find((cell) => cell.dom.classList.contains('bot') && cell.row == players.row && cell.col == left)
                if (dataBotLeft) {
                    disc.push(dataBotLeft)
                    left--
                } else {
                    if (left == 0) {
                        disc = []
                    }
                    stop= true
                }
            }
            this.cells.find(cell2 => players.col !== left+1 && cell2.col === left && cell2.row == players.row)?.setSuggest(disc[disc.length - 1], 'left')
            
            
            //  cari data bot yang ada di bawah
            let bottom = players.row + 1
            stop = false
            disc = []
            while(!stop){
                let dataBotBottom = this.cells.find((cel) => cel.dom.classList.contains('bot') && cel.col == players.col &&  cel.row == bottom)
                if (dataBotBottom) {
                    disc.push(dataBotBottom)
                    bottom++
                }else {
                    if (bottom == 0) {
                        disc = []
                    }
                    stop = true
                }
                
       }
       this.cells.find(cell2 => players.row !== bottom-1 && cell2.row === bottom && cell2.col === players.col)?.setSuggest(disc[disc.length - 1], 'bottom')
       
       
       
    })
    }
    
    
    
    
    // player action
    player(row, col){
        
        this.cells.forEach((cell) => {
            if (cell.row == row && cell.col == col)  {
                cell.dom.classList.add('player')
                this.playerChoice.push(cell)
            }
        })
        
        
        // this.playerScore.innerHTML = this.playerChoice.length
         

        let countPlayer =  this.cells.filter((cell) => cell.dom.classList.contains('player'))
        this.playerScore.innerHTML = countPlayer.length


        
        

    }

    // bot action
    bot(row, col){
        
        this.cells.forEach((cell) => {
            if (cell.row == row && cell.col == col) {
                
                cell.dom.classList.add('bot')
                this.botChoice.push(cell)
            }
        })
        
        
        // this.botScore.innerHTML = game.botChoice.length
        let countBot =  this.cells.filter((cell) => cell.dom.classList.contains('bot'))
        this.botScore.innerHTML = countBot.length

        
        
        
    }
    
    // membuat lantai 8 * 8
    tiles(){
        for (let row = 1; row <= 8; row++) {
            for (let col = 1; col <= 8; col++) {
                const cell = new Cell(row, col);
                cell.render();
                this.cells.push(cell);
            }
        }
    }

}

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.dom = null;
    }
    render() {
        this.create();
        this.listen();

    }
    create() {
        this.dom = document.createElement('div')
        this.dom.setAttribute('data-col', this.col);
        this.dom.setAttribute('data-row', this.row);
        this.dom.classList.add('tile')
        
        game.gridGame.append(this.dom)
    }
    listen() {
        this.dom.addEventListener('click', () => {
            if (!this.dom.classList.contains('player') && !this.dom.classList.contains('bot') && this.dom.classList.contains('step')) {
                
                game.player(this.row, this.col)
                this.playerPoint(this.row, this.col, this.dom)

                setTimeout(() => {
                    this.botChoosing()
                    game.generateSuggest()
                }, 500)

                
            }
        })
    }
    
    botChoosing(){
        
        const botCells = game.cells.filter(cell => cell.dom.classList.contains('bot'));

        botCells.forEach((bot) => {

             // cari data player yang ad di atas
             let data = []
             let top = bot.row - 1
             let stop = false
             let disc = []
             while(!stop){
                 let dataPlayerTop = game.cells.find((cel) => cel.dom.classList.contains('player') && cel.col == bot.col &&  cel.row == top)
                // console.log(dataPlayerTop)
                 if (dataPlayerTop) {
                    let step = game.cells.find((cel) => cel.row == dataPlayerTop.row - 1 && cel.col == dataPlayerTop.col)
                    data.push(step)
                     disc.push(dataPlayerTop)
                     top--
                 }else {
                     if (top == 0) {
                         disc = []
                     }
                     stop = true
                 }
                 
             }
             
            
             
             // cari data player yang ada di kanan
             let right = bot.col + 1
             stop = false
             disc = []
             while(!stop){
                 let dataPlayerRight = game.cells.find((cell) => cell.dom.classList.contains('player') && cell.row == bot.row && cell.col == right)
                 if (dataPlayerRight) {
                    let step = game.cells.find((cel) => cel.row == dataPlayerRight.row && cel.col == dataPlayerRight.col + 1)
                    data.push(step)
                     disc.push(dataPlayerRight)
                     right++
                    } else {
                        if (right == 0) {
                            disc = []
                     }
                     stop= true
                    }
                }
               
                
                
                // cari data player yang ad di kiri
                let left = bot.col - 1
                stop = false
                disc = []
                while(!stop){
                 let dataPlayerLeft = game.cells.find((cell) => cell.dom.classList.contains('player') && cell.row == bot.row && cell.col == left)
                 if (dataPlayerLeft) {
                    let step = game.cells.find((cel) => cel.row == dataPlayerLeft.row && cel.col == dataPlayerLeft.col - 1)
                    data.push(step)
                     disc.push(dataPlayerLeft)
                     left--
                    } else {
                     if (left == 0) {
                         disc = []
                        }
                        stop= true
                    }
                }
                
               
                
                
                //  cari data player yang ada di bawah
                let bottom = bot.row + 1
                stop = false
                disc = []
                while(!stop){
                 let dataPlayerBottom = game.cells.find((cel) => cel.dom.classList.contains('player') && cel.col == bot.col &&  cel.row == bottom)
                 if (dataPlayerBottom) {
                    let step = game.cells.find((cel) => cel.row == dataPlayerBottom.row + 1 && cel.col == dataPlayerBottom.col)
                    data.push(step)
                     disc.push(dataPlayerBottom)
                     bottom++
                    }else {
                        if (bottom == 0) {
                            disc = []
                        }
                        stop = true
                    }
                    
                }
               
                
                
                // console.log(data)
                this.randomBot(data)
                game.generateSuggest()
            })
            
            
            
        }
        
    playerPoint(row, col, dom){

        dom.classList.remove('step')
        
        // cek bot yang ada bottom player
        let bottom = row + 1
        let discs = []
        let stop = false

        while(!stop){
            game.cells.forEach((cell) => {
                let data = game.botChoice.find((bot) => cell.dom.classList.contains('bot') && bot.col == col && bot.row == bottom)
                // console.log(data)
                if (data) {
                    discs.push(data)
                    bottom++
                } else {
                    stop = true
                }
            })
        }

        discs.forEach((disc) =>{
            const point = game.cells.find(cell => cell.row == disc.row && cell.col == disc.col)
            // console.log(disc)

            if (point) {
                point.dom.classList.remove('bot')

                game.player(point.row, point.col)
                
                game.botChoice.splice(game.botChoice.indexOf(disc), 1)

                game.botScore.innerHTML = game.botChoice.length
            }
        } )


        // cek bot yang ada top player
        let top = row - 1
        discs = []
        stop = false

        while(!stop){
            game.cells.forEach((cell) => {
                let data = game.botChoice.find((bot) => cell.dom.classList.contains('bot') && bot.col == col && bot.row == top)
                // console.log(data)
                if (data) {
                    discs.push(data)
                    top--
                } else {
                    stop = true
                }
            })
        }

        discs.forEach((disc) =>{
            const point = game.cells.find(cell => cell.row == disc.row && cell.col == disc.col)

            if (point) {
                point.dom.classList.remove('bot')

                game.player(point.row, point.col)
                
                game.botChoice.splice(game.botChoice.indexOf(disc), 1)

                game.botScore.innerHTML = game.botChoice.length
            }
        } )

       
        // cek bot yang ada di left player
        let  left = col + 1
        discs = []
        stop = false

        while(!stop){
            game.cells.forEach((cell) => {
                let data = game.botChoice.find((bot) => cell.dom.classList.contains('bot') && bot.col == left && bot.row == row)
                if (data) {
                    discs.push(data)
                    left++
                } else {
                    stop = true
                }
            })
        }

        discs.forEach((disc) =>{
            const point = game.cells.find(cell => cell.row == disc.row && cell.col == disc.col)

            if (point) {
                point.dom.classList.remove('bot')

                game.player(point.row, point.col)
                
                game.botChoice.splice(game.botChoice.indexOf(disc), 1)

                game.botScore.innerHTML = game.botChoice.length
            }
        } )

        // cek bot yang ada di right player
        let  right = col - 1
        discs = []
        stop = false

        while(!stop){
            game.cells.forEach((cell) => {
                let data = game.botChoice.find((bot) => cell.dom.classList.contains('bot') && bot.col == right && bot.row == row)
                if (data) {
                    discs.push(data)
                    right++
                } else {
                    stop = true
                }
            })
        }

        discs.forEach((disc) =>{
            const point = game.cells.find(cell => cell.row == disc.row && cell.col == disc.col)

            if (point) {
                point.dom.classList.remove('bot')

                game.player(point.row, point.col)
                
                game.botChoice.splice(game.botChoice.indexOf(disc), 1)

                game.botScore.innerHTML = game.botChoice.length
            }
        } )

    }

    randomBot(data){

        console.log(data) 

        let  random = Math.floor(Math.random() * (data.length - 1))  

        let botChoose = data[random]
        if(!botChoose) {
            // alert('Game Over');
            // location.reload();
            return;
        }

        let choosing = game.cells.find((cell) => cell.row == botChoose.row && cell.col == botChoose.col)

        if (choosing) {
            
            game.bot(choosing.row, choosing.col)
    
            this.botPoint(choosing.row, choosing.col)
        }
        

    }

    botPoint(row, col){

        // cek player yang ada top bot
        let bottom = row + 1
        let discs = []
        let stop = false

        while(!stop){
            game.cells.forEach((cell) => {
                let data = game.playerChoice.find((player) => cell.dom.classList.contains('player') && player.col == col && player.row == bottom)
                // console.log(data)
                if (data) {
                    discs.push(data)
                    bottom++
                } else {
                    stop = true
                }
            })
        }

        discs.forEach((disc) =>{
            const point = game.cells.find(cell => cell.row == disc.row && cell.col == disc.col)
            // console.log(disc)

            if (point) {
                point.dom.classList.remove('player')

                game.bot(point.row, point.col)
                
                game.playerChoice.splice(game.playerChoice.indexOf(disc), 1)

                game.playerScore.innerHTML = game.playerChoice.length
            }
        } )


        // cek bot yang ada top player
        let top = row - 1
        discs = []
        stop = false

        while(!stop){
            game.cells.forEach((cell) => {
                let data = game.playerChoice.find((player) => cell.dom.classList.contains('player') && player.col == col && player.row == top)
                // console.log(data)
                if (data) {
                    discs.push(data)
                    top--
                } else {
                    stop = true
                }
            })
        }

        discs.forEach((disc) =>{
            const point = game.cells.find(cell => cell.row == disc.row && cell.col == disc.col)

            if (point) {
                point.dom.classList.remove('player')

                game.bot(point.row, point.col)
                
                game.playerChoice.splice(game.playerChoice.indexOf(disc), 1)

                game.playerScore.innerHTML = game.playerChoice.length
            }
        } )

       
        // cek bot yang ada di left player
        let  left = col + 1
        discs = []
        stop = false

        while(!stop){
            game.cells.forEach((cell) => {
                let data = game.playerChoice.find((player) => cell.dom.classList.contains('player') && player.col == left && player.row == row)
                if (data) {
                    discs.push(data)
                    left++
                } else {
                    stop = true
                }
            })
        }

        discs.forEach((disc) =>{
            const point = game.cells.find(cell => cell.row == disc.row && cell.col == disc.col)

            if (point) {
                point.dom.classList.remove('player')

                game.bot(point.row, point.col)
                
                game.playerChoice.splice(game.playerChoice.indexOf(disc), 1)

                game.playerScore.innerHTML = game.playerChoice.length
            }
        } )

        // cek bot yang ada di right player
        let  right = col - 1
        discs = []
        stop = false

        while(!stop){
            game.cells.forEach((cell) => {
                let data = game.playerChoice.find((player) => cell.dom.classList.contains('player') && player.col == right && player.row == row)
                if (data) {
                    discs.push(data)
                    right++
                } else {
                    stop = true
                }
            })
        }

        discs.forEach((disc) =>{
            const point = game.cells.find(cell => cell.row == disc.row && cell.col == disc.col)

            if (point) {
                point.dom.classList.remove('player')

                game.bot(point.row, point.col)
                
                game.playerChoice.splice(game.playerChoice.indexOf(disc), 1)

                game.playerScore.innerHTML = game.playerChoice.length
            }
        } )
    }

    setSuggest(cellFrom, position){

        if (position == 'top') {
            const suggest = game.cells.find(cell => cell.col === cellFrom.col && cell.row === cellFrom.row - 1);
            suggest.dom.classList.add('step')     
        }
        
        if (position == 'left') {
            const suggest = game.cells.find(cell => cell.row == cellFrom.row && cell.col == cellFrom.col - 1) 
            suggest.dom.classList.add('step')     
        }

        if (position == 'right') {
            const suggest = game.cells.find(cell => cell.row == cellFrom.row && cell.col == cellFrom.col + 1) 
            suggest.dom.classList.add('step')
        }

        if (position == 'bottom') {
            const suggest = game.cells.find(cell => cell.col === cellFrom.col && cell.row === cellFrom.row + 1);
            suggest.dom.classList.add('step')
        }


        
    }

    
   
}

class Intro {
    constructor() {
        this.dom = document.querySelector('.intro')
        this.btnStart = document.querySelector('.start-game')
        this.inputName = document.querySelector('.input-name')
    }
    render(){ 
        this.listen();
    }
    mount() {
        this.dom.classList.add('active');
    }

    unMount() {
        this.dom.classList.remove('active');
    }
    listen() {
        this.btnStart.addEventListener('click', () => {
            othello.setActiveScreen('game');
        })
    }
}

 
const game = new Game()
game.render() 

const intro = new Intro()
intro.render()


class Othello{
    constructor() {
        this.screens = {
            game,  
            intro,
        }
        this.activeScreen = null;
    }
    render() {
        this.setActiveScreen('game');

        

        
    }
    setActiveScreen(screen) {
        if (this.activeScreen) { this.screens[this.activeScreen].unMount() }
        this.screens[screen]?.mount();
        this.activeScreen = screen;
    }
}

const othello = new Othello();
othello.render();


const reset = document.querySelector('.reset')

reset.addEventListener('click', () => {
    location.reload()
})