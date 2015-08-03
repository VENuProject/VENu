//SmoothLookAt.cs
//Written by Jake Bayer
//Written and uploaded November 18, 2012
//This is a modified C# version of the SmoothLookAt JS script.  Use it the same way as the Javascript version.

using UnityEngine;
using System.Collections;

///<summary>
///Looks at a target
///</summary>
[AddComponentMenu("Camera-Control/Smooth Look At CS")]
public class smoothLookAt : MonoBehaviour {
	public Transform target;		//an Object to lock on to
	public float damping = 6.0f;	//to control the rotation 
	public bool smooth = true;
	public float minDistance = 10.0f;	//How far the target is from the camera
	public string property = "";
	
	private Color color;
	private float alpha = 1.0f;
	private Transform _myTransform;

	//AMCLEAN added:
	public float zoomSpd = 2.0f;

	public float xSpeed = 240.0f;
	public float ySpeed = 123.0f;
	
	public int yMinLimit = -723;
	public int yMaxLimit = 877;
	
	private float x = 0.0f;
	private float y = 0.0f;

	void Awake() {
		_myTransform = transform;
	}
	
	// Use this for initialization
	void Start () {
		//		if(renderer.material.HasProperty(property)) {
		//			color = renderer.material.GetColor(property);
		//		}
		//		else {
		//			property = "";
		//		}
		//		if(rigidbody) {
		//			rigidbody.freezeRotation = true;
		//		}
		Vector3 angles = transform.eulerAngles;
		x = angles.y;
		y = angles.x;
		
	}
	
	// Update is called once per frame
	void Update () {
		_myTransform = transform;

	}
	//AMCLEAN added:
	public static float ClampAngle (float angle, float min, float max) {
		if (angle < -360.0f)
			angle += 360.0f;
		if (angle > 360.0f)
			angle -= 360.0f;
		return Mathf.Clamp (angle, min, max);
	}
	//AMCLEAN finished adding
	void LateUpdate() {
		//Where the modification starts! -Alistair
		/*
		if (Input.GetMouseButtonDown (0)) {
						Ray ray = Camera.main.ScreenPointToRay (Input.mousePosition);
						RaycastHit hit = new RaycastHit ();
						if (Physics.Raycast (ray, out hit.collider.gameObject)) { //If the raycast from the mouse								  //position hit anything, then:
																				  //Hit
						}
				}
		*/
				//Where the modification ends! -Alistair
		

		if(target) {
			//AMCLEAN added:
			x -= Input.GetAxis("Horizontal") * xSpeed * 0.02f; 
			y += Input.GetAxis("Vertical") * ySpeed * 0.02f; 
			
			y = ClampAngle(y, yMinLimit, yMaxLimit); 
			
			minDistance -= Input.GetAxis("Fire1") *zoomSpd* 0.02f; 
			minDistance += Input.GetAxis("Fire2") *zoomSpd* 0.02f;
			//AMCLEAN finished adding
			if(smooth) {
				
				//Look at and dampen the rotation
				Quaternion rotation = Quaternion.LookRotation(target.position - _myTransform.position);
				_myTransform.rotation = Quaternion.Slerp(_myTransform.rotation, rotation, Time.deltaTime * damping);
			}
			else { //Just look at
				_myTransform.rotation = Quaternion.FromToRotation(-Vector3.forward, (new Vector3(target.position.x, target.position.y, target.position.z) - _myTransform.position).normalized);
				
				float distance = Vector3.Distance(target.position, _myTransform.position);
				
				if(distance < minDistance) {
					alpha = Mathf.Lerp(alpha, 0.0f, Time.deltaTime * 2.0f);
				}
				else {
					alpha = Mathf.Lerp(alpha, 1.0f, Time.deltaTime * 2.0f);
					
				}
				//				if(!string.IsNullOrEmpty(property)) {
				//					color.a = Mathf.Clamp(alpha, 0.0f, 1.0f);
				
				//					renderer.material.SetColor(property, color);
				
				//				}
			}
		}
	}
}
