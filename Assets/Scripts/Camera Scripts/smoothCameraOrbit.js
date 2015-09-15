//smoothCameraOrbit.js
//Written by Alistair Maclean, Owen Crawford
//Purpose: Handles the minimap orbiting camera position.

#pragma strict

import UnityEngine.EventSystems;

//Change these values in the inspector
var target : Transform; 
var distance = 10.0;
var maxDistance = 20.0;
var zoomSpeed = 2.0;

var xSpeed = 250.0; 
var ySpeed = 120.0;

var yMinLimit = -80; 
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

public var perspectiveZoomSpeed : float = 0.5f;        // The rate of change of the field of view in perspective mode.
public var orthoZoomSpeed : float = 0.5f;        // The rate of change of the orthographic size in orthographic mode.

public var eventSystem : EventSystem;
public var cameraIcon : GameObject;

var rotSpeedMult : float;

@script AddComponentMenu("Camera-Control/Mouse Orbit smoothed")

function Start () { var angles = transform.eulerAngles; x = angles.y; y = angles.x;

 // Make the rigid body not change rotation
 if (GetComponent.<Rigidbody>())
     GetComponent.<Rigidbody>().freezeRotation = true;
     
#if MOBILE_INPUT
	rotSpeedMult = 8;
#else
	rotSpeedMult = 20;
#endif
}

function LateUpdate () { if (target) 
{ 
    var rotSpeed : float = PlayerPrefs.GetFloat("LookSensitivity") * rotSpeedMult;
    
	if(Input.GetMouseButton(0) && Input.touchCount == 0 && eventSystem.IsPointerOverGameObject() == false){
		x += Input.GetAxisRaw("Mouse X")*rotSpeed;
		y -= Input.GetAxisRaw("Mouse Y")*rotSpeed;
	}
	else if(Input.touchCount == 1 && Input.GetTouch(0).phase == TouchPhase.Moved && eventSystem.IsPointerOverGameObject(0) == false){
		x += Input.GetTouch(0).deltaPosition.x * rotSpeed;
		y -= Input.GetTouch(0).deltaPosition.y * rotSpeed;	
	}
	else {
		
	}
	//Make sure y doesn't repeatedly add to itself.
	y = Mathf.Clamp(y, yMinLimit, yMaxLimit);

	xSmooth = Mathf.SmoothDamp(xSmooth, x, xVelocity, smoothTime);
    ySmooth = Mathf.SmoothDamp(ySmooth, y, yVelocity, smoothTime);
    //ySmooth = ClampAngle(ySmooth, yMinLimit, yMaxLimit);
    var rotation = Quaternion.Euler(ySmooth, xSmooth, 0);

    transform.rotation = rotation;
	
	distance -= Input.GetAxis("Mouse ScrollWheel")*zoomSpeed;
	distance = Mathf.Clamp(distance, -maxDistance, maxDistance);
	posSmooth = target.position;
	
	var newPos : Vector3 = rotation * Vector3(0.0, 0.0, -distance) + posSmooth;
	//These clamps will ensure the camera doesn't fly out of the cryostat
	newPos.x = Mathf.Clamp(newPos.x, -10, 10);
	newPos.z = Mathf.Clamp(newPos.z, -50, 50);
	transform.position = newPos; //rotation * Vector3(0.0, 0.0, -distance) + posSmooth;
	
	cameraIcon.transform.eulerAngles = new Vector3(90, cameraIcon.transform.eulerAngles.y, cameraIcon.transform.eulerAngles.z);
	cameraIcon.transform.position = new Vector3(gameObject.transform.position.x, 0, gameObject.transform.position.z);
 }
}

function Update()
{
    // If there are two touches on the device...
    if (Input.touchCount == 2 && eventSystem.IsPointerOverGameObject(0) == false && eventSystem.IsPointerOverGameObject(1) == false)
    {
        // Store both touches.
        var touchZero = Input.GetTouch(0);
        var touchOne = Input.GetTouch(1);

        // Find the position in the previous frame of each touch.
        var touchZeroPrevPos = touchZero.position - touchZero.deltaPosition;
        var touchOnePrevPos = touchOne.position - touchOne.deltaPosition;

        // Find the magnitude of the vector (the distance) between the touches in each frame.
        var prevTouchDeltaMag = (touchZeroPrevPos - touchOnePrevPos).magnitude;
        var touchDeltaMag = (touchZero.position - touchOne.position).magnitude;

        // Find the difference in the distances between each frame.
        var deltaMagnitudeDiff = prevTouchDeltaMag - touchDeltaMag;

        // If the camera is orthographic...
        if (GetComponent.<Camera>().orthographic)
        {
            // ... change the orthographic size based on the change in distance between the touches.
            GetComponent.<Camera>().orthographicSize += deltaMagnitudeDiff * orthoZoomSpeed;

            // Make sure the orthographic size never drops below zero.
            GetComponent.<Camera>().orthographicSize = Mathf.Max(GetComponent.<Camera>().orthographicSize, 0.1f);
        }
        else
        {
        	distance += deltaMagnitudeDiff * 0.1;
            // Otherwise change the field of view based on the change in distance between the touches.
            //GetComponent.<Camera>().fieldOfView += deltaMagnitudeDiff * perspectiveZoomSpeed;

            // Clamp the field of view to make sure it's between 0 and 180.
            //GetComponent.<Camera>().fieldOfView = Mathf.Clamp(GetComponent.<Camera>().fieldOfView, 0.1f, 179.9f);
        }
    }
}

static function ClampAngle (angle : float, min : float, max : float) 
{ 
if (angle < -360) angle += 360; 
if (angle > 360) angle -= 360; 
return Mathf.Clamp (angle, min, max); 
}