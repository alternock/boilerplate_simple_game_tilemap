let elemsCell = document.querySelectorAll('.cell');
let c = 0;


const MapElements = {
    THREE:'three',
    ROUTE:'route'
}

const Avatar = {
  PHOTO:'../img/avatar.png',
  ID: 'avatar',    
  CSS:{
      CLASS:'avatar'
  },
  POSITION: {
      COLS:0,
      ROWS:0,
      POS:0
  }  
};

const World = [
  1,1,1,0,
  0,0,1,0,
  0,0,1,0,
  0,0,1,0,
  0,0,1,1
];


const MOVE ={
    LEFT:'left',
    RIGHT:'right',
    UP:'up',
    DOWN:'down'
}

elemsCell.forEach(elem =>{    
    elem.innerHTML = World[c];
    elem.setAttribute('pos',c);        
    c++;
});



elemsCell.forEach(elem =>{
    console.log('e: ',elem.innerHTML);
    
    if(elem.innerHTML == 1){        
       elem.classList.add(MapElements.ROUTE);        
    }
    
    if(elem.innerHTML == 0){
       elem.classList.add(MapElements.THREE);
    }        
})


elemsCell[Avatar.POSITION.POS].classList.add(Avatar.PHOTO);



let ENGINE = (avatar, action) =>{
    let cols = 0;
    let rows = 0;
    let subRows = [0,4,8,12,16];        
    let limit;
    let length = 4;
    let worldLength = World.length;
    
    
    for(;cols < length; cols++){
        limit = (cols == 0)?1:cols*2;
        
        for(;rows < subRows[limit];rows++){
            if(avatar.POSITION.POS <= worldLength){
               oldPos = avatar.POSITION.POS; 
                               
                if(action == MOVE.RIGHT){
                   let RIGHT = avatar.POSITION.POS + 1;
                    
                   elemsCell[oldPos].classList.remove(Avatar.PHOTO) 
                   elemsCell[RIGHT].classList.add(Avatar.PHOTO)
                } 
                
                if(action == MOVE.LEFT){
                   let LEFT = avatar.POSITION.POS + 1;
                    
                    elemsCell[oldPos].classList.remove(Avatar.PHOTO) 
                    elemsCell[LEFT].classList.add(Avatar.PHOTO)                   
                }                
                
            }
        }        
    }    
};


//let USER = elemsCell[Avatar.POSITION.POS].className = 'avatar';





    