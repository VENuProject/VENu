using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {

    //public GameObject other;
	//public Rigidbody rb = other.GetComponent<Rigidbody>();

	void FixedUpdate() { // Executed once per physics step

		// Grab the input from the player
		float moveHorizontal = Input.GetAxis ("Horizontal");
		float moveVertical = Input.GetAxis ("Vertical");


		Vector3 movement = new Vector3 (moveHorizontal, 0.0f, moveVertical);
		Rigidbody rb = GetComponent<Rigidbody>();
		rb.velocity = movement;
	}
		
}
