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

public var perspectiveZoomSpeed : float = 0.5f;        // The rate of change of the field of view in perspective mode.
public var orthoZoomSpeed : float = 0.5f;        // The rate of change of the orthographic size in orthographic mode.



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
	x += Input.GetAxisRaw("Mouse X")*5; 
	y -= Input.GetAxisRaw("Mouse Y")*5;
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
     
     
     //AMCLEAN add
     
 }
}

function Update()
{
    // If there are two touches on the device...
    if (Input.touchCount == 2)
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