// ========================================
//         ======| THE START |=======
// ========================================

// GLOBAL VARIABLES
// ------------------------------------

const root = document.getElementById('root');
const rootWidth = 940;
const rootHeight = 500;
const blockWidth = 100;
const blockHeight = 30;
const userWidth = 215;
const userHeight = 15;
const ballDiameter = 20;
const emptySpace = 15; 
const spaceBlock = rootHeight - blockHeight;

// user space
const userBlock = [ (( emptySpace + blockWidth ) * 3) + emptySpace, emptySpace ];
let currentUserPosition = userBlock;

// ball space
const ballBlock = [ (rootWidth / 2) - emptySpace , (emptySpace * 2) ];
let currentBallPosition = ballBlock;
let xDirection = 2;
let yDirection = 2;

//other variables
let ballSpeed;

// ------------------------------------
// ----- | END VARIABLES
// ------------------------------------

// POSITION BLOCK

class Block {
    constructor( x, y ){
        this.mainPosition = [ x, y ];
        this.bottomRight = [ x + blockWidth, y ];
        this.topLeft = [ x, y + blockHeight ];
        this.topRight = [ x + blockWidth, y + blockHeight ];
    }
}

// ALL BLOCKS 

const blocks = [
    // first line of blocks
    new Block( 
        emptySpace, 
        spaceBlock - emptySpace 
    ),
    new Block( 
        ( emptySpace * 2 ) + blockWidth, 
        spaceBlock - emptySpace 
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 2) + emptySpace, 
        spaceBlock - emptySpace 
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 3) + emptySpace, 
        spaceBlock - emptySpace 
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 4) + emptySpace, 
        spaceBlock - emptySpace 
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 5) + emptySpace, 
        spaceBlock - emptySpace 
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 6) + emptySpace, 
        spaceBlock - emptySpace 
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 7) + emptySpace, 
        spaceBlock - emptySpace 
    ),
    // last line of blocks
    new Block( 
        emptySpace, 
        (spaceBlock - (emptySpace * 2) - blockHeight ) 
    ),
    new Block( 
        ( emptySpace * 2 ) + blockWidth, 
        (spaceBlock - (emptySpace * 2) - blockHeight )  
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 2) + emptySpace, 
        (spaceBlock - (emptySpace * 2) - blockHeight )  
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 3) + emptySpace, 
        (spaceBlock - (emptySpace * 2) - blockHeight )  
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 4) + emptySpace, 
        (spaceBlock - (emptySpace * 2) - blockHeight )  
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 5) + emptySpace, 
        (spaceBlock - (emptySpace * 2) - blockHeight )  
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 6) + emptySpace, 
        (spaceBlock - (emptySpace * 2) - blockHeight )  
    ),
    new Block( 
        (( emptySpace + blockWidth ) * 7) + emptySpace, 
        (spaceBlock - (emptySpace * 2) - blockHeight )  
    ),
]

// ------------------------------------
// ----- | END ALL BLOCKS
// ------------------------------------

// == GLOBAL FUNCTIONS ==

// create element in the parent

const createElement = (...classElements) => {
    const userBlockBody = document.createElement('div');
    //console.log(classElements)
    for(let i = 0; i < classElements.length; i++){
        userBlockBody.classList.add(classElements[i]);
        //console.log(classElements[i])
    }
    return userBlockBody;
}

// ------------------------------------

// draw user block
    
const drawBlock = (blockPostion,currentPosition) => {
    blockPostion.style.left = currentPosition[0] + 'px';
    blockPostion.style.bottom = currentPosition[1] + 'px';
}

// ------------------------------------
// ----- | END GLOBAL FUNCTIONS
// ------------------------------------

// == USER ==

// create block for the user

const elementUser = createElement( 'block', 'block-user');

drawBlock( elementUser, currentUserPosition);

root.appendChild(elementUser);

// ------------------------------------

// move the user

const moveUserBlock = e => {
    switch( e.key ) {
        case 'ArrowLeft':
            if( currentUserPosition[0] > 0 ){
                currentUserPosition[0] -= 30;
                drawBlock( elementUser, currentUserPosition );
            }
        break;
        case 'ArrowRight':
            if( currentUserPosition[0] < 720 ){
                currentUserPosition[0] += 30;
                drawBlock( elementUser, currentUserPosition );
            }
        break;
    }
}

document.addEventListener( 'keydown', moveUserBlock );

// ------------------------------------
// ----- | END USER
// ------------------------------------

// == BALL ==

// draw ball

const createBall = createElement( 'ball' );

drawBlock( createBall, currentBallPosition);

root.appendChild(createBall)


// ------------------------------------

// change direction if happened any accident

const changeDirection = () => {
    
    // [ right and top -->> change to down and right ]
    if( xDirection === 2 && yDirection === 2 ){
        yDirection = -2;
        return
    }

    // [ right and down -->> change to down and left ]
    if( xDirection === 2 && yDirection === -2 ){
        xDirection = -2;
        return
    }

    // [ left and down -->> change to top and left ]
    if( xDirection === -2 && yDirection === -2 ){
        yDirection = 2;
        return
    }

    // [ left and top -->> change to top and right ]
    if( xDirection === -2 && yDirection ===  2 ){
        xDirection = 2;
        return
    }

}

const checkAccidentDir = () => {

    // local variables 
    let xBall = currentBallPosition[0];
    let yBall = currentBallPosition[1];
    let xUser = currentUserPosition[0];
    let yUser = currentUserPosition[1];

    // hit the border of our body game

    if( ( xBall >= (rootWidth - ballDiameter) ) ||
        ( yBall >= (rootHeight - ballDiameter) ) ||
          xBall <= 0 
    ) {
        changeDirection()
    }

    // hit game blocks

    for( let i = 0; i < blocks.length; i++ ){
        if( 
            // x direction
            ( (currentBallPosition[0] > blocks[i].mainPosition[0]) && (currentBallPosition[0] < blocks[i].bottomRight[0] )) &&
            // y direction
            ( ((currentBallPosition[1] + ballDiameter) > blocks[i].mainPosition[1]) && (currentBallPosition[1] < blocks[i].topLeft[1]) )
         ) {
            const allBlocksGame = Array.from(document.querySelectorAll('.block-game'));
            allBlocksGame[i].parentElement.classList.add( 'fire' )
            allBlocksGame[i].classList.remove('block');
            allBlocksGame[i].classList.remove('block-game');
            blocks.splice(i,1);
            changeDirection();
            setTimeout( () => {
                allBlocksGame[i].parentElement.classList.remove('fire');
            }, 1000 )
        }
    }

    // hit user block

    if( (xBall > xUser && xBall < xUser + userWidth) && (yBall > yUser && yBall < yUser + userHeight) ){
        // check the direction x neer to hit
        if( xBall < ((xUser + ((userWidth - 35) / 2)) ) ){
            console.log('less')
            xDirection = -2;
            yDirection = 2;
            return
        }else if( xBall > ((xUser + ((userWidth - 35) / 2)) ) ){
            xDirection = 2;
            yDirection = 2;
            return
        }
    }

    // game win
    
    const allBlocksGame_ = Array.from(document.querySelectorAll('.block-game'));

    if( allBlocksGame_.length === 0 ){
        gameStatus('WIN')
    }

    // gameover
    
    if( yBall <= 0 ){
        gameStatus('LOST')
    }

}

// move ball

const moveBall = () => {

    // check happened any accident
    checkAccidentDir();

    // move to x direction [ left & right ]
    currentBallPosition[0] += xDirection;
    // move to y direction [ top & bottom ]
    currentBallPosition[1] += yDirection;
    // update ball position
    drawBlock( createBall, currentBallPosition);

}

// speed ball moving

ballSpeed = setInterval( moveBall, 5 );

// ------------------------------------
// ----- | END BALL
// ------------------------------------

// == GAME ==

// Start Game

const startGame = () => {

    // fetch all blocks of game

    for( let i = 0; i < blocks.length ; i++ ){

        const elementBlock = createElement( 'block', 'block-game' );

        if( i % 2 === 1 ){
            elementBlock.classList.add('block-game-2');
        }

        elementBlock.style.left = blocks[i].mainPosition[0] + 'px';
        elementBlock.style.bottom = blocks[i].mainPosition[1] + 'px';
        
        root.appendChild(elementBlock)

    }

    // ------------------------------------


} 

startGame()

// ------------------------------------
// ----- | END GAME CONTROL
// ------------------------------------

// == GAME STATUS ==

const gameStatus = status => {

    // stop ball
    clearInterval( ballSpeed );
    // tell you are lost
    alert( `YOU ARE ${status} !` );
    // stop user block control
    document.removeEventListener( 'keydown' , moveUserBlock );

}

// ========================================
//         ======| THE END |=======
// ========================================
