// moveOnClick.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk

using UnityEngine;
using System.Collections;

public class moveOnClick : MonoBehaviour {

	bool tutorialActive = false;
	bool gameActive     = false;



	// Use this for initialization
	void Start () {
		
		// Check if the start tutorial or game panels are active
		GameObject canvas = GameObject.Find("MainCanvas");
		foreach (Transform child in canvas.transform)
		{
			if(child.gameObject.name == "StartTutorialPanel"){
				tutorialActive = child.gameObject.activeInHierarchy;
			}
			if(child.gameObject.name == "StartGamePanel"){
				gameActive = child.gameObject.activeInHierarchy;
			}
		}

	}
	
	// Update is called once per frame
	void Update () {

		// If the user click, don't wait for the 5 seconds but carry on.
		if(Input.GetMouseButtonDown(0)) {
			if (tutorialActive) Application.LoadLevel("GameTutorialApp");
			if (gameActive)     Application.LoadLevel("GamePlayApp");

		}
	}
}
