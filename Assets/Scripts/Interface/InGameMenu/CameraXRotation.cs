using UnityEngine;
using System.Collections;

public class CameraXRotation : MonoBehaviour {

	private bool isDragging = false;
	private Vector3 startPos;
	private Vector3 currentPos;
	public float mouseSensitivity;


	void Start () {
	
	}
	

	void Update () {
		currentPos = Input.mousePosition;
		
		if (Input.GetMouseButton(1)){
			if (isDragging == false){
				startPos = currentPos;
				isDragging = true;
			}
			transform.Rotate(
				0f,
				-(currentPos.x - startPos.x) * mouseSensitivity,
				0f
				);
			
			startPos = Input.mousePosition;
		}
		else isDragging = false;
	}
}
