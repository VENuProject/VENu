// floorMenuCardboard.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class floorMenuCardboard : MonoBehaviour {

	[Tooltip("Debug mode")]
	public bool _debug;

	private Collider floorMenuCollider;

	CardboardHead head = null;

	// Use this for initialization
	void Start () {

		head = Camera.main.GetComponent<StereoController>().Head;

		// Get the floor panel cube (for the collider)
		GameObject rfps = GameObject.Find ("cardboard_RFPS");
		foreach (Transform child in rfps.transform) {
			if (child.name == "FloorCanvas") {
				foreach (Transform child2 in child.transform) {
					if (child2.name == "CubeCollider") {
						floorMenuCollider = child2.GetComponent<Collider> ();
					}
				}
			}
		}
		
	}
	
	// Update is called once per frame
	void Update () {

		if (_debug) {
			Debug.Log ("head.transform.eulerAngles.x " + head.transform.eulerAngles.x);
			Debug.Log ("head.transform.eulerAngles.y " + head.transform.eulerAngles.y);
			Debug.Log ("head.transform.eulerAngles.z " + head.transform.eulerAngles.z);
			Debug.Log ("transform.eulerAngles.x " + transform.eulerAngles.x);
			Debug.Log ("transform.eulerAngles.y " + transform.eulerAngles.y);
			Debug.Log ("transform.eulerAngles.z " + transform.eulerAngles.z);
			Debug.Log ("**********");
		}

		// Understand if it's pointing to the floor menu
		RaycastHit hit;
		bool lookingAtMenu = floorMenuCollider.Raycast(head.Gaze, out hit, Mathf.Infinity);

		// If we are not looking at the menu, than rotate the floor menu accordingly
		if (!lookingAtMenu) {

			transform.eulerAngles = new Vector3 (
				transform.eulerAngles.x,
				head.transform.eulerAngles.y,
				transform.eulerAngles.z
			);
		}
			
	}
}
