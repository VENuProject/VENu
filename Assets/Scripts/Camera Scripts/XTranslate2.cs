using UnityEngine;
using System.Collections;

public class XTranslate2 : MonoBehaviour {
	
	void Start () {
		
	}
	
	void Update () {
		transform.Translate(Vector3.right*1*Time.deltaTime);
	}
	
}