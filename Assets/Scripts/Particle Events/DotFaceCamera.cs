using UnityEngine;
using System.Collections;

public class DotFaceCamera : MonoBehaviour {

	public Transform target;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (target != null)
			transform.rotation = target.rotation;
	}
}
