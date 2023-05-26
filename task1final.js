var X=92;
var Y=92;
var x=0;
var y=0;
var Xf=0;
var Yf=0;
var points=0;
const gp=document.getElementById("sc");
gp.textContent="Scorecard:0";
var snk=document.getElementById("sobj");
snk.style.top=Y+"px";
snk.style.right=X+"px";
/*
const player = document.getElementById("pn");
player.addEventListener("click", updateName);
function updateName() {
  const namep = prompt("Enter player name");
  player.textContent = `Player name: ${namep}`;
}
updateName();
*/

const colors=["brown","orange","violet","black","yellow","blue"]; // 0 1 2 3 4 5
var c_=[];
var cx=[];
var cy=[];
var track=[0,0,0,0,0,0];
var ac_=[];   //actual order in which user catches the blocks
var c=0; //counter to check how many of the blocks were eaten

var y_= Math.floor(Math.random()*5)+1;
for(var i=0;i<6;i++){                  //function to shuffle colors
    if(i>=y_){
        c_[i]=colors[i-y_];
    }
    else{
        c_[i]=colors[6+i-y_];
    }
}


const para=document.getElementById("cd");

para.textContent="color sequence for round : "+ c_[0]+" "+c_[1]+" "+c_[2]+" "+c_[3]+" "+c_[4]+" "+c_[5];

function cpos(){
    var cc=0;
    while(cc==0){
        cc=1;
        for(var i=0;i<6;i++){
            var u=Math.floor(Math.random()*193);
            var v=Math.floor(Math.random()*193);
            cx[i]=u;
            cy[i]=v;

        }
        for(var i=0;i<5;i++){
            for(var j=i+1;j<=5;j++){
                
                if(Math.abs(cx[i]-cx[j])<20 && Math.abs(cy[i]-cy[j])<20){
                    cc=0;
                }
                if((Math.abs(cx[j]-X)<20)&&(Math.abs(cy[j]-Y)<20)){
                    cc=0;
                }
                if((Math.abs(cx[0]-X)<20) &&(Math.abs(cy[0]-Y)<20)){ //checks if cx[0]&& cy[0]
                    cc=0;
                }
            }
        }
        
         //
         
    }
    
    const c1 = document.getElementById(c_[0]);
    const c2 = document.getElementById(c_[1]);
    const c3 = document.getElementById(c_[2]);
    const c4 = document.getElementById(c_[3]);
    const c5 = document.getElementById(c_[4]);
    const c6 = document.getElementById(c_[5]);
    for(var i=0;i<6;i++){
        switch(i){
            case 0:
                
                c1.style.top=cy[0]+"px";
                c1.style.right=cx[0]+"px";
                break;
            case 1:
                
                c2.style.top=cy[1]+"px";
                c2.style.right=cx[1]+"px";
               
                break;
            case 2:
                
                c3.style.top=cy[2]+"px";
                c3.style.right=cx[2]+"px";
                
                break;
            case 3:
                
                c4.style.top=cy[3]+"px";
                c4.style.right=cx[3]+"px";
                
               
                break;
            case 4:
                
                c5.style.top=cy[4]+"px";
                c5.style.right=cx[4]+"px";
                
              
                break;
            case 5:
                                                        
                c6.style.top=cy[5]+"px";
                c6.style.right=cx[5]+"px";
                
               
                break;
        }
    }
}
cpos();


var t1=53;
var t=document.getElementById("time");




var ts=setInterval(function(){
    if(t1>0){
        t1=t1-1;
        t.style.width=t1+"px";
    }
   
    else{
        alert("time's up too bad snakey");
        clearInterval(ts);
        gameover();
    }
},1000);


document.addEventListener("keydown",function(KeyboardEvent){
    if(KeyboardEvent.keyCode==37){ //left
        x=1;
        y=0;

    }
    else if(KeyboardEvent.keyCode==38){//up
        x=0;
        y=-1;

    }
    else if(KeyboardEvent.keyCode==39){ //right
        x=-1;
        y=0;

    }
    else if(KeyboardEvent.keyCode==40){//down
        x=0;
        y=1;

    }
});


var s=setInterval(function(){
    X=X+x;
    Y=Y+y;
    snk.style.top=Y+"px";
    snk.style.right=X+"px";
    if(X==192||Y==0){
        
        clearInterval(s);
        
    }
    if(X==0||Y==192){
      
        clearInterval(s);
        
    }

    
    if(c<6){
        for(var i=0;i<cx.length;i++){
            if(Math.abs(X-cx[i])<10 && Math.abs(Y-cy[i])<10 && track[i]==0){
                c++;
                var block=document.getElementById(c_[i]);
                block.style.backgroundColor="green";
                track[i]++;
                ac_[c-1]=c_[i];
                
            }
        }
    }
    
    if(c==6){
        var w=1;
        c=0;
        
        for(var i=0;i<6;i++){
            if(c_[i]!=ac_[i]){   //checks the original order and order in which snake ate
                w=0;
            }
            track[i]=0;    //to prepare for next round;
        }
        if(w==0){
            alert("wrong order hence no points");
        
            
        }
        else{
            points+=10;
            gp.textContent=`Scorecard:${points}`;
            t.style.width=51+"px";
            
        }
        

        var h= Math.floor(Math.random()*5)+1;
        for(var i=0;i<6;i++){                  //function to shuffle colors
            if(i>=h){
                c_[i]=colors[i-h];
            }
            else{
                c_[i]=colors[6+i-h];
            }
        }
        const para=document.getElementById("cd");
        para.textContent="color sequence for round : "+ c_[0]+" "+c_[1]+" "+c_[2]+" "+c_[3]+" "+c_[4]+" "+c_[5];
        cpos();
        for(var i=0;i<6;i++){
            var u=document.getElementById(c_[i]);
            u.style.backgroundColor=c_[i];
        }

    }
}, 50);
    
    
function gameover(){
    const rbutton=document.createElement("button");
    rbutton.textContent="Wanna restart?"; 
   // rbutton.style.top=50+"px";
    //rbutton.style.right=5+"px";
    ///have to disable the keyboard event listener ///
    document.body.append(rbutton);
    rbutton.addEventListener("click",restartgame());
}
function restartgame(){
    rbutton.parentNode.removeChild(rbutton);///then reable listener again///

}