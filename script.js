// debugger
let cards=document.querySelectorAll('.card');

let score1=document.querySelector('.score1');
let score2=document.querySelector('.score2');

let img=document.querySelectorAll('.card img');

// let newgame=document.querySelector('.new-game');
let winner=document.querySelector('.winclass');
let wincup=document.querySelector('.winclass img');

let bodycolor=document.querySelector('body');

let secondCard,firstCard;
let fcount=0; 
let scount=0;

let totalc=0;
let first_p=true;
let second_p=false;

let is_flipped=false;
let isequal=false;
let lockboard=false;


 let images=[
    "img/1.jpg",
    "img/1.jpg",
    "img/2.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/4.jpg",
    "img/5.jpg",
    "img/5.jpg",
    "img/6.jpg",
    "img/6.jpg",
    "img/7.jpg",
    "img/7.jpg",
    "img/8.jpg",
    "img/8.jpg"

]





const shuffle_images=()=>{
    for (let i = images.length - 1; i >0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        console.log(`value of i ${i} value of j ${j}`);
        [images[i], images[j]] = [images[j], images[i]]; // swap elements

    }
    
    console.log("images array is ",images);
    
    let i,j=0;
    for( i=0;i<img.length;i++){
        
        img[i].src=images[j];
        j++;
    }
    
}
shuffle_images();

// newgame.addEventListener('click',()=>{
   

function flip_card(){

    if (lockboard) return;  // Prevents further clicks when the board is locked
    if(this===firstCard) return;
    this.classList.add('flip');  // Add the flip class to the clicked card

    if(!is_flipped){
        is_flipped=true;
        firstCard=this;
        return;
    }

    secondCard=this;
    check_match();

}

function unflipCards() {
    lockboard = true;  // Lock the board to prevent more clicks until it unflip

    // After a short delay, remove the flip class from both cards
    setTimeout(() => {
        firstCard.classList.add('flip-out');
        secondCard.classList.add('flip-out');
       
    }, 1500);
    setTimeout(()=>{
        firstCard.classList.remove('flip-out');
        secondCard.classList.remove('flip-out');
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');    
        resetBoard()
    },2000);  // Reset the board for the next turn
}


function resetBoard() {
    // Reset variables to start the next turn   
    [is_flipped, lockboard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

const checkwinner=()=>{
    winner.classList.remove('hide');
    wincup.classList.remove('hide');
    if(fcount > scount){
        winner.innerHTML='<h3> Winner is Player 1 </h3>'
        // wincup.src='img/winnercup.png';

    }
    else if(fcount < scount){
        winner.innerHTML='<h3> Winner is Player 2 </h3>'
        // wincup.src='img/winnercup.png';
    }
    else{
        winner.innerHTML='<h3> DRAW</h3>';
    }

    setTimeout(() => {
        fcount=0; 
        scount=0;
        totalc=0;
        first_p=true;
        second_p=false;
        is_flipped=false;
        isequal=false;
        lockboard=false;  
        [is_flipped, lockboard] = [false, false];
        [firstCard, secondCard] = [null, null];
        score1.innerHTML=fcount;
        score2.innerHTML=scount;
    
        winner.classList.add('hide');
        wincup.classList.add('hide');
        bodycolor.style.backgroundColor='rgb(233, 58, 87)';
        
        shuffle_images();
        cards.forEach((box)=>{
            
            
            if(box.classList.contains('flip')){
                box.classList.add('flip-out');
                setTimeout(()=>{
                    box.classList.remove('flip-out');
                    box.classList.remove('flip');
                    box.addEventListener('click',flip_card);
                },2000)      
              }
        })
    
    }, 5000);
}
const check_match=()=>{
    if((firstCard.querySelector('img').src ===secondCard.querySelector('img').src)){
        firstCard.removeEventListener('click', flip_card);
        secondCard.removeEventListener('click', flip_card);  
        if(first_p===true){
            fcount++;
            totalc++;
            score1.innerHTML=fcount;
        } 
        else if(second_p===true){
            scount++;
            totalc++;

            score2.innerHTML=scount;

        }

        if(totalc===8){
            checkwinner();
        }
        resetBoard();
    }
    else{
        unflipCards();
        if(first_p===true){
            first_p=false;
            second_p=true;

            setTimeout(() => {
                bodycolor.style.backgroundColor='rgb(101, 154, 223)';

            }, 1000);
        }
        else if(second_p===true){
            second_p=false;
            first_p=true;
            setTimeout(() => {
                bodycolor.style.backgroundColor='rgb(233, 58, 87)';
                
            }, 1000);

        }

        // return false;
    }
}



cards.forEach((card)=>{
    card.addEventListener('click',flip_card);
})