// gameCardboardApp.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk

using UnityEngine;
using System.Collections;

public class gameCardboardApp : MonoBehaviour {

	CardboardHead head = null;

	private bool neutrinoEventFound = false;

	private GameObject goNextPanel;
	private GameObject congratsPanel;
	private GameObject continueSearchPanel;
	private GameObject withCosmicPanel;


	// Use this for initialization
	void Start () {

		Debug.Log ("Here we are");

		head = Camera.main.GetComponent<StereoController>().Head;

		// Get Panels
		GameObject canvas = GameObject.Find("cardboard_RFPS");
		foreach (Transform child in canvas.transform)
		{
			if (child.gameObject.name == "CardboardMain") {
				foreach (Transform child2 in child.gameObject.transform) {
					if (child2.gameObject.name == "Head") {
						foreach (Transform child3 in child2.gameObject.transform) {
							if (child3.gameObject.name == "Main Camera") {
								foreach (Transform child4 in child3.gameObject.transform) {
									if (child4.gameObject.name == "GameCanvas") {
										foreach (Transform child5 in child4.gameObject.transform) {
											if (child5.name == "PanelContinueSearch")
												continueSearchPanel = child5.gameObject;
											if (child5.name == "PanelNext")
												goNextPanel = child5.gameObject;	
											if (child5.name == "PanelGoToMainMenu")
												congratsPanel = child5.gameObject;
											if (child5.name == "PanelNextWithCosmics")
												withCosmicPanel = child5.gameObject;
										}
									}
								}
							}
						}
					}
				}
			}


			if (child.name == "PanelContinueSearch")
				continueSearchPanel = child.gameObject;
			if (child.name == "PanelNext")
				goNextPanel = child.gameObject;	
			if (child.name == "PanelGoToMainMenu")
				congratsPanel = child.gameObject;
			if (child.name == "PanelNextWithCosmics")
				withCosmicPanel = child.gameObject;
		}

		continueSearchPanel.SetActive (true);


	}

	// Update is called once per frame
	void Update () {

		if(Input.GetMouseButtonDown (0) && neutrinoEventFound) {

			removePanel ();
			continueSearchPanel.SetActive (true);
			neutrinoEventFound = false;


		}

		// Get nu track
		Transform nuTrack = (GameObject.Find ("EventsPrefab_simulation").transform); // just but something in nuTrack so nity doesn't complain

		GameObject rfps = GameObject.Find ("EventsPrefab_simulation");
		foreach (Transform child in rfps.transform) {
			//if (child.name == "prodgenie_bnb_nu_uboone_new_1.json_testGame") {
			if (child.gameObject.activeInHierarchy) {

				foreach (Transform child2 in child.transform) {
					if (child2.name == "Cube" || child2.name == "ClickableCube") {
						nuTrack = child2;
					}
				}
			}
		}
		Collider coll = nuTrack.GetComponent<Collider> ();


		// Understand if it's pointing to the nu track
		RaycastHit hit2;
		bool lookingAtNuTrack = coll.Raycast(head.Gaze, out hit2, Mathf.Infinity);

		if (Input.GetMouseButtonDown (0) && lookingAtNuTrack) {

			bool goToNext = false, goToNextWithCosmics = false, goToMainMenu = false;

			// First undertstand what to do now
			// Check what is the active prefab and decide to go back to main menu or not.
			foreach (Transform child in rfps.transform) {
				Debug.Log ("The name of the child is " + child.name);
				if (child.gameObject.activeInHierarchy) {
					// For the turorial
					if (child.name == "prodgenie_bnb_nu_uboone_new_1.json_testGame") goToNext = true;
					if (child.name == "prodgenie_bnb_nu_uboone_new_2.json_testGame") goToNextWithCosmics = true;
					if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_10.json") goToNext = true;
					if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_12.json") goToMainMenu = true;

					// For the real game
					if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_2.json") goToNext = true;
					if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_6.json") goToNext = true;
					if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_7.json") goToMainMenu = true;
					if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_8.json") goToNext = true;
					if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_9.json") goToNext = true;

				}
			}

			neutrinoEventFound = true;
			continueSearchPanel.SetActive (false);
			if (goToNext) goNextPanel.SetActive (true);
			if (goToNextWithCosmics) withCosmicPanel.SetActive (true);
			if (goToMainMenu) congratsPanel.SetActive (true);

		}





		if (Input.GetMouseButtonDown (0) && false) {
			Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			RaycastHit hit;
			if (Physics.Raycast(ray, out hit)) {
				Debug.Log ("Name = " + hit.collider.name);
				Debug.Log ("Tag = " + hit.collider.tag);
				Debug.Log ("Hit Point = " + hit.point);
				Debug.Log ("Object position = " + hit.collider.gameObject.transform.position);
				Debug.Log ("--------------");
			}
		}
	}




	void removePanel(){

		goNextPanel.SetActive (false);
		withCosmicPanel.SetActive (false);
		congratsPanel.SetActive (false);
	}
}
