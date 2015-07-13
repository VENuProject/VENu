using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;

public class CameraMotion : MonoBehaviour {

	public GameObject cameraMount;
	public GameObject camera;
	public GameObject sensitivtySlider;
	public EventSystem eventSystem;
	private bool isDragging = false;
	private Vector3 startPos;
	private Vector3 currentPos;
	public float mouseSensitivity;
	
	
	void Start () {
		
	}

	public void SetSensitivity(float value){
		mouseSensitivity = value;
	}
	
	void Update () {
		currentPos = Input.mousePosition;
		
		if (Input.GetMouseButton(0)){

			if (isDragging == false){
				startPos = currentPos;
				isDragging = true;
			}

			//horizontal rotation
			cameraMount.transform.Rotate(
				0f,
				-(currentPos.x - startPos.x) * mouseSensitivity,
				0f
				);

			//vertical rotation, clamped at +- 90
			if (camera.transform.eulerAngles.x + (currentPos.y - startPos.y) * mouseSensitivity <= 90
			    ||
			    camera.transform.eulerAngles.x + (currentPos.y - startPos.y) * mouseSensitivity >= 270)
			{
				camera.transform.Rotate(
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
