#pragma strict

var target : Transform; 
var distance = 10.0;
var zoomSpeed = 2.0;

var xSpeed = 250.0; 
var ySpeed = 120.0;

var yMinLimit = -20; 
var yMaxLimit = 80;

private var x = 0.0; 
private var y = 0.0;

var smoothTime = 0.3;

private var xSmooth = 0.0; 
private var ySmooth = 0.0; 
private var xVelocity = 0.0; 
private var yVelocity = 0.0;

private var posSmooth = Vector3.zero; 
private var posVelocity = Vector3.zero;

@script AddComponentMenu("Camera-Control/Mouse Orbit smoothed")

function Start () { var angles = transform.eulerAngles; x = angles.y; y = angles.x;

 // Make the rigid body not change rotation
 if (GetComponent.<Rigidbody>())
     GetComponent.<Rigidbody>().freezeRotation = true;
}

function LateUpdate () { if (target) 
{ 
	if(Input.GetButton("Fire2"))
	{	
	x += Input.GetAxis("Mouse X")*xSpeed*0.02; 
	y -= Input.GetAxis("Mouse Y")*ySpeed*0.02;
	}
	//distance -= Input.GetAxis("Mouse Z") *zoomSpeed* 0.02;
	distance -= Input.GetAxis("Mouse ScrollWheel")*zoomSpeed;

     xSmooth = Mathf.SmoothDamp(xSmooth, x, xVelocity, smoothTime);
     ySmooth = Mathf.SmoothDamp(ySmooth, y, yVelocity, smoothTime);
 
     ySmooth = ClampAngle(ySmooth, yMinLimit, yMaxLimit);
 
     var rotation = Quaternion.Euler(ySmooth, xSmooth, 0);
 
    // posSmooth = Vector3.SmoothDamp(posSmooth,target.position,posVelocity,smoothTime);
 
     posSmooth = target.position; // no follow smoothing
 
     transform.rotation = rotation;
     transform.position = rotation * Vector3(0.0, 0.0, -distance) + posSmooth;
 }
}

static function ClampAngle (angle : float, min : float, max : float) 
{ 
if (angle < -360) angle += 360; 
if (angle > 360) angle -= 360; 
return Mathf.Clamp (angle, min, max); 
}