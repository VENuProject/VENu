using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;
using UnitySampleAssets.CrossPlatformInput;

public class OneJoyDragInterface : MonoBehaviour {

	public GameObject cameraMount;
	public GameObject playerCamera;
	public EventSystem eventSystem;
	private bool isDragging = false;
	private ArrayList draggingFingers = new ArrayList();
	private Vector3 startPos;
	private Vector3 currentPos;
	public float mouseSensitivity;
	public float moveSpeed;
	public float height;
	public CharacterController me;

	void Start () {
		me = GetComponent<CharacterController>();
	}
	
	public void SetSensitivity(float value){
		mouseSensitivity = value;
	}

	public void SetSpeed(float value){
		moveSpeed = value;
	}
	
	void Update () {
		PlayerLook();
		PlayerMove();
	}

	void FixedUpdate(){
		mouseSensitivity = PlayerPrefs.GetFloat("LookSensitivity");
		moveSpeed = PlayerPrefs.GetFloat("MoveSpeed");
		height = PlayerPrefs.GetFloat("PlayerHeight");
	}

	void PlayerLook (){

#if MOBILE_INPUT

		foreach(Touch finger in Input.touches){
			if(finger.phase == TouchPhase.Began && eventSystem.IsPointerOverGameObject(finger.fingerId) == false){
				//start drag on this finger
				draggingFingers.Add(finger.fingerId);
			}
			if(finger.phase == TouchPhase.Ended || finger.phase == TouchPhase.Canceled){
				draggingFingers.Remove(finger.fingerId);
			}
		}

		foreach(int index in draggingFingers){
			Touch finger = Input.GetTouch(index);

			//horizontal rotation
			cameraMount.transform.Rotate(
				0, finger.deltaPosition.x * mouseSensitivity, 0);

			//vertical rotation
			if(playerCamera.transform.eulerAngles.x + finger.deltaPosition.y * mouseSensitivity <= 90
			   ||
			   playerCamera.transform.eulerAngles.x + finger.deltaPosition.y * mouseSensitivity >= 270)
			{
				playerCamera.transform.Rotate(
					finger.deltaPosition.y * -mouseSensitivity, 0, 0);
			}
		}

#else

		if (Input.GetMouseButtonDown(1) && eventSystem.IsPointerOverGameObject() == false){
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
#endif

	}

	void PlayerMove (){

		Vector3 delta = new Vector3(CrossPlatformInputManager.GetAxis("Horizontal"),
		                            0,
		                            CrossPlatformInputManager.GetAxis("Vertical")
		                            ) * moveSpeed;
		delta = Quaternion.AngleAxis(cameraMount.transform.eulerAngles.y, Vector3.up) * delta;
		me.Move(delta);
		transform.Translate(0, height - transform.position.y, 0);

	}

}
