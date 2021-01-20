var dog,milk, happyDog, database;
var foodS, foodStock, foodObj;
var happyDogimg,dogimg;
var feedb,addb;
var fedTime,lastFed;

function preload(){
  happyDogimg=loadImage("images/dogImg1.png",happyDogimg);
  dogimg=loadImage("images/dogImg.png",dogimg);
  Milkimg=loadImage("images/Milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1350, 600);

  foodObj = new Food();

  foodStock=database.ref('Food');
foodStock.on("value",readStock);
  
  dog=createSprite(800,200);
  dog.addImage(dogimg);
  dog.scale=0.2;

  milk=createSprite(200,200);
  milk.addImage(Milkimg);
  milk.scale=0.15;


  feedb=createButton("Feed the dog");
  feedb.position(400,500);
  feedb.mousePressed(feedDog);
  this.feedb.mousePressed(()=>{
milk.x=600;
dog.addImage(happyDogimg);
addFoods();
  });

  var a=10
  addb=createButton("Add Food");
  addb.position(500,500);
  addb.mousePressed(addFoods);
  this.addb.mousePressed(()=>{
    a=a+100;
    milk=createSprite(200,200+a);
   milk.addImage(Milkimg);
   milk.scale=0.15;
    addFoods();
      });

}

function draw() {  
background("yellow");

textSize(25);
if(lastFed>=12){
  fill("blue");
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   fill("blue")
   text("Last Feed : 12 AM",350,30);
 }else{
   fill("blue");
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }
 
  drawSprites();
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
}

function feedDog(){
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}