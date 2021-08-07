var dog,sadDog,happyDog;
var database;
var feed;
var addFood;
var foodObj;
var foodStock;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;


  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

foodObj = new Food();
foodStock = database.ref("Food");
foodStock.on("value",readStock);

}

function draw() {
   background(46,139,87);
   foodObj.display();
   fedTime = database.ref("FeedTime");
   fedTime.on("value",function(data){
     lastFed = data.val();
   })
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Fed : 12 AM",350,30);
    }else{
      text("Last Fed : "+ lastFed + " AM", 350,30);
    }

//foodObj.display();



  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updatefoodStock(foodS);
  
}


//function to update food stock and last fed time
function feedog(){
  dog.addImage(happyDog);

var food_stock_val = foodObj.getfoodStock();
if(food_stock_val<=0){
  foodObj.updatefoodStock(food_stock_val*0);

}
else
{
  foodObj.updatefoodStock(food_stock_val-1);
}
database.ref("/").update({
  Food:foodObj.getfoodStock(),
  FeedTime:hour()
})



 }


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
