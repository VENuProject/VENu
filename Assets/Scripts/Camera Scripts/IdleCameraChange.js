﻿#pragma strict
var idleTimer: float = 0.0;
var cam1: Camera;
var cam2: Camera;
var cam3: Camera;
var cam4: Camera;

/*var cam2pos: Vector3(0,0,-34.68567);
var cam3pos: Vector3(27.68517,0.1953173,-3.251777);
var cam4pos: Vector3(-22.3174,11.53674,-0.5150426); */
private var startPostion: Vector3;
private var lastPos: Vector3;

function Start(){

    cam1.enabled = true;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = false;



}
/*
function Update(){
  // calculate the velocity since last Update:
  var vel: float = Vector3.Distance(transform.position, lastPos)/Time.deltaTime;
  lastPos = transform.position; // update lastPos
  if (vel > 0.001){ // if vel slightly greater than zero...
    idleTimer = 0.0; // reset timer
  } else { // if zero or too near to zero...
    idleTimer += Time.deltaTime; // count time in idleTimer
  }
  
  
  if (idleTimer == 0 ){
    cam1.GetComponent.<Camera>().active = true;
    cam2.GetComponent.<Camera>().active = false;
    cam3.GetComponent.<Camera>().active = false;
    cam4.GetComponent.<Camera>().active = false;
    
    
  }
  else if (idleTimer < 14 && idleTimer >= 6 && (cam1.enabled == true || cam3.enabled == true)) {
    var cam2clone : Camera;
    Destroy(cam2clone);
//    cam2clone = Instantiate(cam2, transform.position(0,0,-34.68567), transform.RotateAround(0,0,0));
    cam1.GetComponent.<Camera>().active = false;
    cam2.GetComponent.<Camera>().active = true;
    cam3.GetComponent.<Camera>().active = false;
    cam4.GetComponent.<Camera>().active = false;
  	}
  else if (idleTimer < 20 && idleTimer >= 14 && (cam2.enabled == true || cam1.enabled == true)) {
    var cam3clone : Camera;
    Destroy(cam2clone);
    Destroy(cam3clone);
//    cam3clone = Instantiate(cam3, transform.position(0,0,-34.68567), transform.RotateAround(0,0,0));
    cam1.GetComponent.<Camera>().active = false;
    cam2.GetComponent.<Camera>().active = false;
    cam3.GetComponent.<Camera>().active = true;
    cam4.GetComponent.<Camera>().active = false;
    }
  else if (idleTimer < 25 &&idleTimer >= 20 && (cam2.enabled == true || cam1.enabled == true)) {
    var cam4clone : Camera;
    Destroy(cam3clone);
    Destroy(cam4clone);
//    cam4clone = Instantiate(cam4, transform.position(0,0,-34.68567), transform.RotateAround(0,0,0));
    cam1.GetComponent.<Camera>().active = false;
    cam2.GetComponent.<Camera>().active = false;
    cam3.GetComponent.<Camera>().active = false;
    cam4.GetComponent.<Camera>().active = true;
    }
  else if (idleTimer >= 25) {
  	idleTimer = 6;
  	}
  	
}
*/