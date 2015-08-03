using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;

public class mouseInterface : MonoBehaviour {

	public GameObject cameraMount;
	public GameObject playerCamera;
	//public EventSystem eventSystem;
	private bool isDragging = false;
	private Vector3 startPos;
	private Vector3 currentPos;
	public float mouseSensitivity;
	public float moveSpeed;
	public float height;
	public CharacterController me;

	void Start () {
		me = GetComponent<CharacterController>();
	}

	void Update () {
		PlayerLook();
		PlayerMove();
	}

	void FixedUpdate(){
		mouseSensitivity = PlayerPrefs.GetFloat("LookSensitivity");
		moveSpeed = PlayerPrefs.GetFloat("MoveSpeed") / 2;
		height = PlayerPrefs.GetFloat("PlayerHeight");
	}

	void PlayerLook(){
		if (Input.GetMouseButtonDown(1)){ //&& eventSystem.IsPointerOverGameObject() == false){
			//start a drag
			isDragging = true;
			currentPos = Input.mousePosition;
			startPos = currentPos;
		}
		
		if (isDragging){
			if(Input.GetMouseButton(1) == false)
				isDragging = false;
			
			else{
				currentPos = Input.mousePosition;
				
				//horizontal rotation
				cameraMount.transform.Rotate(
					0f, (currentPos.x - startPos.x) * mouseSensitivity, 0f);
				
				//vertical rotation, clamped at +- 90
				if (playerCamera.transform.eulerAngles.x + -(currentPos.y - startPos.y) * mouseSensitivity <= 90
				    ||
				    playerCamera.transform.eulerAngles.x + -(currentPos.y - startPos.y) * mouseSensitivity >= 270)
				{
					playerCamera.transform.Rotate(
						-(currentPos.y - startPos.y) * mouseSensitivity, 0f, 0f);
				}
				
				startPos = Input.mousePosition;
			}
		}
	}

	void PlayerMove(){
		Vector3 delta = new Vector3(0, 0, 0);
		if(Input.GetKey(KeyCode.W))
			delta.z += moveSpeed;
		if(Input.GetKey(KeyCode.A))
			delta.x -= moveSpeed;
		if(Input.GetKey(KeyCode.S))
			delta.z -= moveSpeed;
		if(Input.GetKey(KeyCode.D))
			delta.x += moveSpeed;
		if(Input.GetKey(KeyCode.LeftShift))
			delta *= 2;

		delta = Quaternion.AngleAxis(cameraMount.transform.eulerAngles.y, Vector3.up) * delta;
		me.Move(delta);
		transform.Translate(0, height - transform.position.y, 0);

	}
}
