// cardboardAutoWalk.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk

using UnityEngine;
using System.Collections;

public class carboardAutoWalk : MonoBehaviour {

	public bool stopIt;
	private bool dontShowIcon = false;
	private Collider floorMenuCollider;

	private const int RIGHT_ANGLE = 90; 

	// This variable determinates if the player will move or not 
	private bool isWalking = false;

	CardboardHead head = null;

	//This is the variable for the player speed
	[Tooltip("With this speed the player will move.")]
	public float speed;

	[Tooltip("Activate this checkbox if the player shall move when the Cardboard trigger is pulled.")]
	public bool walkWhenTriggered;

	[Tooltip("Activate this checkbox if the player shall move when he looks below the threshold.")]
	public bool walkWhenLookDown;

	[Tooltip("This has to be an angle from 0° to 90°")]
	public double thresholdAngle;

	[Tooltip("Activate this Checkbox if you want to freeze the y-coordiante for the player. " +
		"For example in the case of you have no collider attached to your CardboardMain-GameObject" +
		"and you want to stay in a fixed level.")]
	public bool freezeYPosition; 

	[Tooltip("This is the fixed y-coordinate.")]
	public float yOffset;

	[Tooltip("How many seconds to wait before the walking or stoping icons go off.")]
	public float waitSec;

	// Use this for initialization
	void Start () {
		head = Camera.main.GetComponent<StereoController>().Head;

		// Get the floor panel cube (for the collider)
		GameObject rfps = GameObject.Find ("cardboard_RFPS");
		foreach (Transform child in rfps.transform) {
			if (child.name == "FloorCanvas") {
				foreach (Transform child2 in child.transform) {
					if (child2.name == "CubeCollider") {
						floorMenuCollider = child2.GetComponent<Collider> ();
					}
				}
			}
		}

	}
	
	// Update is called once per frame
	void Update () {

		// Understand if it's pointing to the floor menu
		RaycastHit hit;
		bool lookingAtMenu = floorMenuCollider.Raycast(head.Gaze, out hit, Mathf.Infinity);


		// Walk when the Cardboard Trigger is used 
		if (walkWhenTriggered && !walkWhenLookDown && !isWalking && Cardboard.SDK.Triggered && !lookingAtMenu) 
		{
			isWalking = true; 

			// Make the walking icon appear for n seconds.
			WalkingIconOn();
		} 
		else if (walkWhenTriggered && !walkWhenLookDown && isWalking && Cardboard.SDK.Triggered && !lookingAtMenu) 
		{
			isWalking = false;

			// Make the stopping icon appear for n seconds.
			StoppingIconOn();
		}


		// Walk when player looks below the threshold angle 
		if (walkWhenLookDown && !walkWhenTriggered && !isWalking &&  
			head.transform.eulerAngles.x >= thresholdAngle && 
			head.transform.eulerAngles.x <= RIGHT_ANGLE) 
		{
			isWalking = true;
		} 
		else if (walkWhenLookDown && !walkWhenTriggered && isWalking && 
			(head.transform.eulerAngles.x <= thresholdAngle ||
				head.transform.eulerAngles.x >= RIGHT_ANGLE)) 
		{
			isWalking = false;
		}

		// Walk when the Cardboard trigger is used and the player looks down below the threshold angle
		if (walkWhenLookDown && walkWhenTriggered && !isWalking &&  
			head.transform.eulerAngles.x >= thresholdAngle && 
			Cardboard.SDK.Triggered &&
			head.transform.eulerAngles.x <= RIGHT_ANGLE) 
		{
			isWalking = true;
		} 
		else if (walkWhenLookDown && walkWhenTriggered && isWalking && 
			head.transform.eulerAngles.x >= thresholdAngle &&
			(Cardboard.SDK.Triggered ||
				head.transform.eulerAngles.x >= RIGHT_ANGLE)) 
		{
			isWalking = false;
		}

		if (isWalking) 
		{

			// Move the user
			Vector3 direction = new Vector3(head.transform.forward.x, 0, head.transform.forward.z).normalized * speed * Time.deltaTime;
			Quaternion rotation = Quaternion.Euler(new Vector3(0, -transform.rotation.eulerAngles.y, 0));
			transform.Translate(rotation * direction);
		}

		if(freezeYPosition)
		{
			transform.position = new Vector3(transform.position.x, yOffset, transform.position.z);
		}
			
	}






	void WalkingIconOn() {

		GameObject rfps = GameObject.Find ("cardboard_RFPS");
		foreach (Transform child in rfps.transform) {
			if (child.name == "CardboardMain") {
				foreach (Transform child2 in child.gameObject.transform) {
					if (child2.name == "Head") {
						foreach (Transform child3 in child2.gameObject.transform) {
							if (child3.name == "Main Camera") {
								foreach (Transform child4 in child3.gameObject.transform) {
									if (child4.name == "FrontCanvas") {
										foreach (Transform child5 in child4.gameObject.transform) {
											if (child5.name == "PanelWalk") {
												child5.gameObject.SetActive (true);
												StartCoroutine (WaitAndStop (child5.gameObject));
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	void StoppingIconOn() {

		GameObject rfps = GameObject.Find ("cardboard_RFPS");
		foreach (Transform child in rfps.transform) {
			if (child.name == "CardboardMain") {
				foreach (Transform child2 in child.gameObject.transform) {
					if (child2.name == "Head") {
						foreach (Transform child3 in child2.gameObject.transform) {
							if (child3.name == "Main Camera") {
								foreach (Transform child4 in child3.gameObject.transform) {
									if (child4.name == "FrontCanvas") {
										foreach (Transform child5 in child4.gameObject.transform) {
											if (child5.name == "PanelStop") {
												child5.gameObject.SetActive (true);
												StartCoroutine (WaitAndStop (child5.gameObject));
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	IEnumerator WaitAndStop(GameObject panel) {

		yield return new WaitForSeconds(waitSec);
		panel.SetActive (false);

	}
}
