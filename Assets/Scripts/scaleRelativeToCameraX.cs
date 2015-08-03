/// scaleRelativeToCamera.cs
/// Scales object relative to camera distance.

using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class scaleRelativeToCamera : MonoBehaviour 
{
//	public Camera cam;
    public float objectScale; // = 1.0f; 

	//Make sure the object is never bigger or smaller than these factors
    public float maxScale; // = 5.0f;
    public float minScale; //= 1f;

	//These control when the max scale and min scale are reached
	//e.g. max scale at distance of 12, min scale at distance of 3 opposed to raw scaling on distance.
    public float minDist; // = 6.0f;
    public float maxDist; // = 12.0f;

	private Vector3 initialScale; 
	
	// set the initial scale, and setup reference camera
	void Start ()
	{
		// record initial scale, use this as a basis
		initialScale = transform.localScale; 

//		// if no specific camera, grab the default camera
//		if (cam == null)
//			//cam = Camera.main; AMCLEAN comment out
//			cam = GameObject.Find ("Main View").GetComponent<Camera>(); //AMCLEAN add
	}
	
	// scale object relative to distance from camera plane
	void Update () 
	{
		//This works, and fixes lag when switching controls
		float dist = Vector3.Distance(transform.position, Camera.main.transform.position);

		float distFactor = Mathf.Clamp01((dist - minDist) / (maxDist - minDist));

		Vector3 newScale = initialScale * (((maxScale - minScale) * distFactor) + minScale); //Mathf.Clamp(dist * objectScale, minScale, maxScale);

		transform.localScale = newScale;
	}
}
