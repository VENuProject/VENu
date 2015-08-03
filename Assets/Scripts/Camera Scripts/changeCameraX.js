#pragma strict


var cam1: Camera;
var cam2: Camera;
var cam3: Camera;
private var lastPos: Vector3;
 
function Start() {
    cam1.enabled = true;
    cam2.enabled = false;
    cam3.enabled = false;
    lastPos = transform.position;
}
 
function Update() {
 
    if (Input.GetKeyDown(KeyCode.V) && (cam1.enabled == true || cam3.enabled == true)) {
    cam1.enabled = false;
    cam2.enabled = true;
    cam3.enabled = false;
      	lastPos = transform.position;
    }
    else if (Input.GetKeyDown(KeyCode.B) && (cam2.enabled == true || cam1.enabled == true)) {
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = true;
      	lastPos = transform.position;
    }
    else if (Input.GetKeyDown(KeyCode.C) && (cam2.enabled == true || cam3.enabled == true)) {
    cam1.enabled = true;
    cam2.enabled = false;
    cam3.enabled = false;
      	lastPos = transform.position;
    }
}