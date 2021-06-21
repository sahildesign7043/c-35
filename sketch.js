var baseball;
var database,position;


function setup(){

    createCanvas(500,500);
    database=firebase.database();
   baseball = createSprite(250,250,10,10);
    baseball.shapeColor = "red";

    var baseballPosition=database.ref("ball/position");
    baseballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if (position!=null){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
    
}

function writePosition(x,y){
    database.ref("ball/position").set({
        'x': position.x + x,
        'y': position.y + y
    });
}
function readPosition(data){
position=data.val();
baseball.x=position.x;
baseball.y=position.y;

}
function showError(){
    console.log("error in readind to database");
}