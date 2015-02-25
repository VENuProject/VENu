using UnityEngine;
using System.Collections;

public class FVCameraMotion : MonoBehaviour {


	void Start () {
	
	}
	

	void Update () {
		transform.Translate (Vector3.right * Time.deltaTime);
	}
}
