using UnityEngine;
using System.Collections;

public class GyroLook : MonoBehaviour {

	Quaternion origin = Quaternion.identity;
	Transform camMount;
	Quaternion rotFix;
	Quaternion gyroval;
	public float rfX;
	public float rfY;
	public float rfZ;
	public float rfW;
	public float gX;
	public float gY;
	public float gZ;
	public float gW;

	void Start () {
		Input.gyro.enabled = true;
		origin = Input.gyro.attitude;
		camMount = transform.parent;
		if (Screen.orientation == ScreenOrientation.Landscape)
			camMount.transform.eulerAngles = new Vector3(90,90,0);
		//else if (Screen.orientation == ScreenOrientation.LandscapeRight)
			//camMount.transform.eulerAngles = new Vector3(-90,-90,0);
	}

	void Update () {

		//if (Screen.orientation == ScreenOrientation.LandscapeLeft) 
			//rotFix = new Quaternion(0,0,0.7071f,-0.7071f);
		//else if (Screen.orientation == ScreenOrientation.LandscapeRight) 
			//rotFix = new Quaternion(0,0,0.7071f,0.7071f);

		rotFix = new Quaternion(rfX, rfY, rfZ, rfW);
		gyroval = new Quaternion(gX, gY, gZ, gW);

		if(Input.touchCount > 0 || origin == Quaternion.identity)
			origin=Input.gyro.attitude;
		transform.localRotation = gyroval * rotFix * Quaternion.Inverse(origin);
	}

	void OnGUI(){
		GUILayout.Label("Origin: " + origin.ToString());
		GUILayout.Label("Camera: " + transform.localRotation.ToString());
		GUILayout.Label("Gyro: " + Input.gyro.attitude.ToString());
	}
}
