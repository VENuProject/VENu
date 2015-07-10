using UnityEngine;
using System.Collections;

public class CameraYRotation : MonoBehaviour {

	private bool isDragging = false;
	private Vector3 startPos;
	private Vector3 currentPos;
	public float mouseSensitivity;

	
	void Update () {
		currentPos = Input.mousePosition;
		if (Input.GetMouseButton(1)){
			if (isDragging == false){
				startPos = currentPos;
				isDragging = true;
			}

			//clamping rotation at +- 90
			if (transform.eulerAngles.x + (currentPos.y - startPos.y) * mouseSensitivity <= 90
				||
				transform.eulerAngles.x + (currentPos.y - startPos.y) * mouseSensitivity >= 270)
			{
				transform.Rotate(
					(currentPos.y - startPos.y) * mouseSensitivity,
					0f,
					0f
					);
			}
			startPos = Input.mousePosition;
		}
		else isDragging = false;
	}
}
