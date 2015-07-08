#pragma strict


public var moveSpeed : float = 2.0;
//public Transform target;
private var targetPosition : Vector3;


function Start () {

}

function LateUpdate () 
{


}
 static var selectedId : int;
 static var speed : int = 5;
 
 function Update () 
 {
 	if(Input.GetKeyDown(KeyCode.Mouse0))
 {
 	var tpcPlane = new Plane(Vector3.up, transform.position);
 	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
 	var hitdist = 0.0;
 	
 	if(tpcPlane.Raycast(ray, hitdist)) 
 	{
 		var targetPoint = ray.GetPoint(hitdist);
 		targetPosition = ray.GetPoint(hitdist);
 		var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
 		transform.rotation = targetRotation;
 	}	
 }
        
        var dir:Vector3 = targetPosition - transform.position;
        var dist:float = dir.magnitude;
        var move:float = speed * Time.deltaTime;
 
        if(dist > move)
        {
        transform.position += dir.normalized * move;
        }
        else 
        {
        transform.position = targetPosition;
        }
 
        transform.position += (targetPosition - transform.position).normalized * speed * Time.deltaTime;
 
 
 //AMCLEAN arrow key movement
         if (Input.GetKey (KeyCode.UpArrow)) transform.Translate (Vector3(0,1,0) * Time.deltaTime*speed);
         if (Input.GetKey (KeyCode.DownArrow)) transform.Translate (Vector3(0,-1,0) * Time.deltaTime*speed);
         if (Input.GetKey (KeyCode.LeftArrow)) transform.Translate (Vector3(1,0,0) * Time.deltaTime*speed);
         if (Input.GetKey (KeyCode.RightArrow)) transform.Translate (Vector3(-1,0,0) * Time.deltaTime*speed);
     
 }
 
 function OnMouseDown () {
     selectedId = GetInstanceID();
 }
 