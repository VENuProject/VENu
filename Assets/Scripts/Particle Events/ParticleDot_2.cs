using UnityEngine;
using System.Collections;

public class ParticleDot_2 : MonoBehaviour {
	//public Camera cam;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void LateUpdate () {
		//transform.LookAt (Camera.main.transform.position, -Vector3.up);

		//AMCLEAN testing out something....

		if (GameObject.Find ("Main View") == true)
		{ 
		transform.LookAt(GameObject.Find("Main View").transform.position, -Vector3.up); 
		}
		else 
		{
		transform.LookAt(Camera.main.transform.position, -Vector3.up);
		}

}
}