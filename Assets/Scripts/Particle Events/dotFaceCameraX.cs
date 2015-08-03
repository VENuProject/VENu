using UnityEngine;
using System.Collections;

public class dotFaceCamera : MonoBehaviour {
	//public Camera cam;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {

		//This works, and fixes the lag when switching controls.
		//-Owen
		transform.LookAt(Camera.main.transform, -Vector3.up);
}
}