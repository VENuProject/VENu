//moveTarget.js
//Written by Alistair Maclean
//Purpose: Handles clicking on the minimap.

#pragma strict

import UnityEngine.EventSystems;
import UnityEngine.UI;
//import UnityEngine.
public var moveSpeed : float = 2.0;
//var img : GUIStyle;
//public Transform target;
private var targetPosition : Vector3;
public var orthoCam : Camera;
public var eventSystem : EventSystem;
public var height : float;

function Start () {
	
}

function LateUpdate () 
{

}
 static var selectedId : int;
 static var speed : int = 5;
 
 function Update () 
 
 
 
 
 {
 	if(Input.GetKeyDown(KeyCode.Mouse0)
 		&& orthoCam.pixelRect.Contains(Input.mousePosition)
 		 && eventSystem.IsPointerOverGameObject() == false
 		  && orthoCam.isActiveAndEnabled == true)
 {
 	var tpcPlane = new Plane(Vector3.up, transform.position);
 	var ray = orthoCam.ScreenPointToRay(Input.mousePosition);
 	var hitdist = 5.0;
 	
 	if(tpcPlane.Raycast(ray, hitdist) && Camera.main.pixelRect.Contains(Input.mousePosition)) 
 	{
 		var targetPoint = ray.GetPoint(hitdist);
 		targetPosition = ray.GetPoint(hitdist);
 		var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
 		transform.rotation = targetRotation;
 	}	
 }
        
        var dir:Vector3 = targetPosition - transform.position;
        var length:float = Vector3.Magnitude(dir); //AMCLEAN add
        var dist:float = dir.magnitude;
        var move:float = speed * Time.deltaTime;
 
        if(dist > move)
        {
        transform.position += dir.normalized * move; //AMCLEAN changed += to =
        }
        else 
        {
        transform.position = targetPosition;
        }
 //AMCLEAN added if statement
 if (length > 0.2)
 {
        transform.position += (targetPosition - transform.position).normalized * speed * Time.deltaTime;
 }
 else 
 		{
 		//Do nothing...
 		//transform.position = transform.position;
 		}
 		//keep the target inside the detector
 transform.position.x = Mathf.Clamp (transform.position.x, -10, 10);
 transform.position.z = Mathf.Clamp (transform.position.z, -50, 50);
 //AMCLEAN arrow key movement
         if (Input.GetKey (KeyCode.UpArrow)) transform.Translate (Vector3(0,1,0) * Time.deltaTime*speed);
         if (Input.GetKey (KeyCode.DownArrow)) transform.Translate (Vector3(0,-1,0) * Time.deltaTime*speed);
         if (Input.GetKey (KeyCode.LeftArrow)) transform.Translate (Vector3(1,0,0) * Time.deltaTime*speed);
         if (Input.GetKey (KeyCode.RightArrow)) transform.Translate (Vector3(-1,0,0) * Time.deltaTime*speed);
     
     transform.Translate(0, height - transform.position.y, 0);
 }
 
 function FixedUpdate(){
 	height = PlayerPrefs.GetFloat("PlayerHeight");
 }
 
 function OnMouseDown () {
     selectedId = GetInstanceID();
 }
 