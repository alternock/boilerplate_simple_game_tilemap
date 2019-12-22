let elemsCell = document.querySelectorAll('.cell');
let cells = document.getElementsByTagName('div');
//
//let AvatarImg = document.createElement('img');
let Avatar_ELEM = document.getElementById('avatar');


const KEYBOARD = {
    LEFT:{
        CODE:37,
        TEXT:'left'
    },
    UP:{
       CODE:38,
       TEXT:'up'    
    },
    RIGHT:{
        CODE:39,
        TEXT:'right'
    },
    DOWN:{
       CODE:40,
       TEXT:'down'    
    }
}
Object.freeze(KEYBOARD);

const MapSet = {
    TAGS_BOX:{
        BOX:'box',
        POS_ID:'pos_id'
    }    
}
Object.freeze(MapSet)

const MapElements = {
    THREE:'three',
    ROUTE:'route'
}
Object.freeze(MapElements)

const Avatar = {
  PHOTO:'img/avatar.png',
  ID: 'avatar',    
  CSS:{
      CLASS:{
        DEFAULT:'avatar'  
      }
  },
  POSITION: {
      COLS:0,
      ROWS:0,
      CURRENT:0
  }  
};

const Map = [
  [1,1,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,1,1,1,0,1,1,1,1,0],
  [0,1,1,1,0,1,0,1,0,1,0,0],
  [0,0,0,0,0,1,1,1,0,1,1,0],
  [0,1,1,1,1,1,0,0,0,0,1,0],  
  [0,1,0,0,0,0,0,1,1,1,1,0],    
  [0,1,1,1,1,1,0,1,0,0,0,0],        
  [0,0,0,1,0,1,0,1,1,1,1,0],        
  [0,1,1,1,0,1,0,0,0,0,0,0],
  [0,0,1,0,0,1,0,1,1,1,0,0],    
  [0,1,1,1,0,1,1,1,0,1,1,2],    
  [0,0,0,0,0,0,0,0,0,0,0,0],      
];
Object.freeze(Map)

//11 X 11

const Map_DOM_POSITION_ID = [
  [0,1,2,3,4,5,6,7,8,9,10,11],
  [12,13,14,15,16,17,18,19,20,21,22,23],
  [24,25,26,27,28,29,30,31,32,33,34,35],
  [36,37,38,39,40,41,42,43,44,45,46,47],
  [48,49,50,51,52,53,54,55,56,57,58,59],    
  [60,61,62,63,64,65,66,67,68,69,70,71],    
  [72,73,74,75,76,77,78,79,80,81,82,83],
  [84,85,86,87,88,89,90,91,92,93,94,95],        
  [96,97,98,99,100,101,102,103,104,105,106,107],      
  [108,109,110,111,112,113,114,115,116,117,118,119],          
  [120,121,122,123,124,125,126,127,128,129,130,131],      
  [132,133,134,135,136,137,138,139,140,141,142,143],                
]

Avatar_ELEM.src = Avatar.PHOTO;
Avatar_ELEMclassName = Avatar.CSS.CLASS.DEFAULT;
Avatar_ELEM.id = "avatar";

/*
AvatarImg.addEventListener('keydown', evt =>{
    alert("img");
})*/

const drawVirtualMap = function create_An_Attribute_In_The_Tag_HTML_With_A_Value(){
  let cols = 0;
  let rows = 0;
  let pos = 0;
  let id_pos = 0;
  let colsLimit = 11;
  let rowsLimit = 11;    

  for(;cols <= colsLimit;cols++){
      for(;rows <= rowsLimit;rows++){          
          pos_id = pos++;
          elemsCell[pos_id].setAttribute(MapSet.TAGS_BOX.BOX,Map[cols][rows])
          elemsCell[pos_id].setAttribute(MapSet.TAGS_BOX.POS_ID,pos_id)          
      }      
      rows = 0;
  }
}


const drawMap = () =>{
 elemsCell.forEach(elem =>{
    console.log('elems: ',elem.getAttribute(MapElements.ROUTE));
    
    if(elem.getAttribute(MapSet.TAGS_BOX.BOX) == 1 || elem.getAttribute(MapSet.TAGS_BOX.BOX) ==  2){        
       elem.classList.add(MapElements.ROUTE);        
    }
    
    if(elem.getAttribute(MapSet.TAGS_BOX.BOX) == 0){
       elem.classList.add(MapElements.THREE);
    }        
 })
}



const checkMovement = (avatar, position_cols, position_rows) =>{
    let MapLength = Map.length;
    let cols = 0;
    let rows = 0;    
    let colsLimit = 11;
    let rowsLimit = 11;
    let movement = 0;
    
    console.log('>_')
    console.log('current: ',avatar.POSITION.CURRENT)
    
    
    for(;cols <= colsLimit;cols++){
        for(;rows <= rowsLimit; rows++){                  
             if(Map[position_cols][position_rows] == 1)
             {
                 return 1; 
             }
                  
             if(Map[position_cols][position_rows] == 0)
             {
                 return 0;
             }                  
                  
             if(Map[position_cols][position_rows] == 2)
             {
                 return 2;  
             }
        }
    }                  
}


const avatarProfile = (old_position, new_position) =>{
   //let AvatarImg = document.createElement('img');
   let Avatar_ELEM = document.getElementById('avatar');
   let CloneAvatar = Avatar_ELEM.cloneNode(true);
    
   CloneAvatar.src = Avatar.PHOTO;
   CloneAvatar.className = Avatar.CSS.CLASS.DEFAULT;
   CloneAvatar.id = "avatar";
          
   elemsCell[old_position].removeChild(Avatar_ELEM);
   elemsCell[new_position].appendChild(CloneAvatar);   
}


const getAvatarAndMovePosition = (Avatar_Old_Position, avatar) =>{
   let new_position = 0;
   let old_position = 0;    
    
   old_position = Map_DOM_POSITION_ID[Avatar_Old_Position.COLS][Avatar_Old_Position.ROWS];
   new_position = Map_DOM_POSITION_ID[avatar.POSITION.COLS][avatar.POSITION.ROWS];
   avatar.POSITION.CURRENT = new_position;

   console.log('>_')    
   console.log('getAvatar ', old_position, new_position)
   console.log('getAvatar_old ', Map_DOM_POSITION_ID[Avatar_Old_Position.COLS][Avatar_Old_Position.ROWS])
   console.log('getAvatar_new ', Map_DOM_POSITION_ID[Avatar_Old_Position.COLS][Avatar_Old_Position.ROWS])
   avatarProfile(old_position, new_position);
}


const moveAvatar  = (check, move, avatar) =>{        
    let Avatar_Old_Position = {COLS:0, ROWS: 0};
    console.log('>_')
    console.log('move, ',move)

    Avatar_Old_Position.COLS = avatar.POSITION.COLS;   
    Avatar_Old_Position.ROWS = avatar.POSITION.ROWS;      
    
    console.log('moveAvatar: ', Avatar_Old_Position.COLS, Avatar_Old_Position.ROWS);
    
    if(check == 1 || check == 2){
         if(check == 2){
            setTimeout(function(){
            alert('ganaste :)')
          },100);    
        }    
                   
       if(move == KEYBOARD.RIGHT.CODE){
          avatar.POSITION.ROWS = avatar.POSITION.ROWS + 1;
          console.log('right, ',avatar.POSITION.COLS, avatar.POSITION.ROWS)        
          getAvatarAndMovePosition(Avatar_Old_Position, avatar);
       }
       
       if(move == KEYBOARD.LEFT.CODE){
          avatar.POSITION.ROWS = avatar.POSITION.ROWS - 1;  
          console.log('left, ',avatar.POSITION.COLS, avatar.POSITION.ROWS)        
          getAvatarAndMovePosition(Avatar_Old_Position, avatar);
       }    
        
       if(move == KEYBOARD.UP.CODE){          
          avatar.POSITION.COLS = avatar.POSITION.COLS - 1;  
          console.log('up, ',avatar.POSITION.COLS, avatar.POSITION.ROWS)
          getAvatarAndMovePosition(Avatar_Old_Position, avatar);   
       }    
        
       if(move == KEYBOARD.DOWN.CODE){          
          avatar.POSITION.COLS = avatar.POSITION.COLS + 1;  
          console.log('down, ',avatar.POSITION.COLS, avatar.POSITION.ROWS)
          getAvatarAndMovePosition(Avatar_Old_Position, avatar);   
       }
    }    
}


const listMovements = (avatar) =>{           
       
  document.addEventListener('keydown',  evt =>{      
      let cache_position_cols = 0;
      let cache_position_rows = 0;
      let check = 0;
      
      cache_position_cols = avatar.POSITION.COLS;
      cache_position_rows = avatar.POSITION.ROWS;
      
      if(evt.keyCode == KEYBOARD.RIGHT.CODE){                    
          cache_position_rows = cache_position_rows + 1;//change          
          console.log(avatar.POSITION.COLS, avatar.POSITION.ROWS, avatar.POSITION.CURRENT, cache_position_cols, cache_position_rows)          
          check = checkMovement(avatar, cache_position_cols, cache_position_rows);
          console.log('check: ',check)
          
          moveAvatar(check, KEYBOARD.RIGHT.CODE, avatar);
          
      }
      
      if(evt.keyCode == KEYBOARD.LEFT.CODE){          
          cache_position_rows = cache_position_rows - 1;//change          
          console.log(avatar.POSITION.COLS, avatar.POSITION.ROWS, avatar.POSITION.CURRENT, cache_position_cols, cache_position_rows)          
          check = checkMovement(avatar, cache_position_cols, cache_position_rows);
          console.log('check: ',check)
          
          moveAvatar(check, KEYBOARD.LEFT.CODE, avatar);         
      }
      
      if(evt.keyCode == KEYBOARD.UP.CODE){
         cache_position_cols = cache_position_cols - 1;//change         
         console.log(avatar.POSITION.COLS, avatar.POSITION.ROWS, avatar.POSITION.CURRENT, cache_position_cols, cache_position_rows)  
         check = checkMovement(avatar, cache_position_cols, cache_position_rows);
         console.log('check: ',check)
          
         moveAvatar(check, KEYBOARD.UP.CODE, avatar);                    
      }
      
      if(evt.keyCode == KEYBOARD.DOWN.CODE){          
         cache_position_cols = cache_position_cols + 1;//change         
         console.log(avatar.POSITION.COLS, avatar.POSITION.ROWS, avatar.POSITION.CURRENT, cache_position_cols, cache_position_rows)  
         check = checkMovement(avatar, cache_position_cols, cache_position_rows);
         console.log('check: ',check)
          
         moveAvatar(check, KEYBOARD.DOWN.CODE, avatar);           
      }
  })
}


const avatarProfileInit = () =>{     
   elemsCell[Avatar.POSITION.CURRENT].appendChild(Avatar_ELEM)
}

//
window.onload = () =>{   
  drawVirtualMap();
  drawMap();
  avatarProfileInit();
  listMovements(Avatar);
}
