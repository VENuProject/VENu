/// ScaleColliderRelativeToCamera.cs
/// Scales box collider relative to camera distance.

using UnityEngine;
using System.Collections;

public class ScaleColliderRelativeToCamera : MonoBehaviour 
{
	public Camera cam; 
	public float objectScale = 1.0f; 

	//Make sure the object is never bigger or smaller than these factors
	public float maxScale = 0.4f;
	public float minScale = 0.1f;

	//These control when the max scale and min scale are reached
	//e.g. max scale at distance of 12, min scale at distance of 3 opposed to raw scaling on distance.
	public float minDist = 3.0f;
	public float maxDist = 12.0f;

	private Vector3 initialScale; 
	
	// set the initial scale, and setup reference camera
	void Start ()
	{
		// record initial scale, use this as a basis
		initialScale = transform.localScale; 

		// if no specific camera, grab the default camera
		if (cam == null)
			cam = Camera.main; 
	}
	
	// scale object relative to distance from camera plane
	void Update () 
	{
		Plane plane = new Plane(cam.transform.forward, cam.transform.position); 
		float dist = plane.GetDistanceToPoint(transform.position);
		float distFactor = Mathf.Clamp01((dist - minDist) / (maxDist - minDist));

		Vector3 newScale = initialScale * (((maxScale - minScale) * distFactor) + minScale);
		BoxCollider bc = transform.GetComponent<BoxCollider>();
		bc.size = new Vector3(newScale.x, newScale.y, bc.size.z);
	}
}