// floorMenuCardboard.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class floorMenuCardboard : MonoBehaviour {

	[Tooltip("Debug mode")]
	public bool _debug;

	CardboardHead head = null;

	// Use this for initialization
	void Start () {

		head = Camera.main.GetComponent<StereoController>().Head;
		
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

		transform.eulerAngles = new Vector3(
			transform.eulerAngles.x,
			head.transform.eulerAngles.y,
			transform.eulerAngles.z
		);
			
	}
}
