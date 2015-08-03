#pragma strict


//For placing the image of the mini map.
var miniMap : GUIStyle;
//Two transform variables, one for the player's and the enemy's, 
var player : Transform;
var enemy : Transform;

//Icon images for the player and enemy(s) on the map. 
var playerIcon : GUIStyle;
var enemyIcon : GUIStyle;

//Offset variables (X and Y) - where you want to place your map on screen.
var mapOffSetX = 762;
var mapOffSetY = 510;

//The width and height of your map as it'll appear on screen,
var mapWidth = 200;
var mapHeight = 200;

//Width and Height of your scene, or the resolution of your terrain.
var sceneWidth = 500;
var sceneHeight = 500;

//The size of your player's and enemy's icon on the map. 
var iconSize = 10;
private var iconHalfSize;

function Update () { //So that the pivot point of the icon is at the middle of the image.
//You'll know what it means later...
iconHalfSize = iconSize/2;
}