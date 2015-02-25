#pragma strict
var idleTimer: float = 0.0;
var cam1: Camera;
var cam2: Camera;
var cam3: Camera;
var cam4: Camera;
var cam5: Camera;
var cam6: Camera;
var cam2pos: Vector3;
var cam3pos: Vector3;
var cam4pos: Vector3;	
var cam5pos: Vector3;
var cam6pos: Vector3;
private var lastPos: Vector3;

function Start(){

    cam1.enabled = true;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
    cam2pos = cam2.transform.position;
    cam3pos = cam3.transform.position;
    cam4pos = cam4.transform.position;
    cam5pos = cam5.transform.position;
    cam6pos = cam6.transform.position;
  	lastPos = transform.position;
}


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
    cam1.enabled = true;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
  }
  else if (idleTimer >= 6 && idleTimer < 14 && (cam1.enabled == true || cam3.enabled == true)) {
    cam1.enabled = false;
    cam2.enabled = true;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
  	}
  else if (idleTimer >= 14 && idleTimer < 29 && (cam2.enabled == true || cam1.enabled == true)) {
  	cam3.transform.position = cam3pos;
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = true;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
    }
  else if (idleTimer >= 29 && idleTimer < 44 && (cam2.enabled == true || cam3.enabled == true)) {
  	cam4.transform.position = cam4pos;
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = true;
    cam5.enabled = false;
    cam6.enabled = false;
    }
  else if (idleTimer >= 44 && idleTimer < 54 && (cam3.enabled == true || cam4.enabled == true)) {
  	cam5.transform.position = cam5pos;
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = true;
    cam6.enabled = false;
    }
 else if (idleTimer >= 54 && idleTimer < 66 && (cam4.enabled == true || cam5.enabled == true)) {
  	cam6.transform.position = cam6pos;
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = true;
    } 
  else if (idleTimer >= 66 && (cam5.enabled == true || cam6.enabled == true)){
  	idleTimer = 6;
    cam1.enabled = false;
    cam2.enabled = true;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
  	}
  	
}