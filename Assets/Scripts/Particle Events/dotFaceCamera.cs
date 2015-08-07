//dotFaceCamera.cs
//Written by Alistair Maclean
//Force the sprite to always look at the main camera to give 2D sprites a 3D appearance.
using UnityEngine;
using System.Collections;

public class dotFaceCamera : MonoBehaviour {
	void Start () {
	
	}

	void Update () {
		//Warning: If there's no main camera, you'll get a bunch of errors, and performance will tank.
		transform.LookAt(Camera.main.transform, -Vector3.up);
	}
}