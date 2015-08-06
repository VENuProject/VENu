using UnityEngine;
using System.Collections;

public class mapMoveTarget : MonoBehaviour {
	public TouchPad miniMap;
	public GameObject target;



	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		//transform.Translate.x 


		if (Input.touchCount > 0) {
			// The screen has been touched so 	 the touch
			Touch touch = Input.GetTouch(0);
			
			if (touch.phase == TouchPhase.Began || touch.phase == TouchPhase.Moved ) {
				//Ray ray = Camera.main.ScreenPointToRay(touch.position);
				//RaycastHit2D hit;
				//if(Physics.Raycast(ray, out hit
				// If the finger is on the screen, move the object smoothly to the touch position
				Vector3 touchPosition = Camera.main.ScreenToWorldPoint(new Vector3(touch.position.x, touch.position.y, 10));                
				transform.position = Vector3.Lerp(transform.position, touchPosition, Time.deltaTime);
			}
		}
	}
}
