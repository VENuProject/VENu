using UnityEngine;
using System.Collections;
using UnitySampleAssets.CrossPlatformInput;

public class twoJoyControl : MonoBehaviour {

	public GameObject cameraMount;
	public GameObject myCamera;
	public CharacterController me;
	float height;
	float moveSpeed;
	float lookSensitivity;
	public float horizLookMultiplier;

	void Start () {

	}

	void FixedUpdate(){
		height = PlayerPrefs.GetFloat("PlayerHeight");
		moveSpeed = PlayerPrefs.GetFloat("MoveSpeed");
		lookSensitivity = PlayerPrefs.GetFloat("LookSensitivity");
	}

	void Update () {

		cameraMount.transform.Rotate(0, CrossPlatformInputManager.GetAxis("HorizontalLook") * 2 * lookSensitivity * horizLookMultiplier, 0);
		float xDelta = CrossPlatformInputManager.GetAxis("VerticalLook") * lookSensitivity * 2;
		float newXrot = myCamera.transform.eulerAngles.x - xDelta;
		if(newXrot <= 90 || newXrot > 270)
			myCamera.transform.Rotate( -xDelta, 0, 0);

		Vector3 delta = new Vector3(
			CrossPlatformInputManager.GetAxis("Horizontal") * moveSpeed * 1.5f, 
			height - transform.position.y, 
			CrossPlatformInputManager.GetAxis("Vertical") * moveSpeed * 1.5f);
		delta = Quaternion.AngleAxis(cameraMount.transform.eulerAngles.y, Vector3.up) * delta;
		me.Move(delta);
	}
}
