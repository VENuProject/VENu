// gameCardboardApp.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk

using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class gameCardboardApp : MonoBehaviour {

	CardboardHead head = null;

	private bool neutrinoEventFound = false;

	private GameObject goNextPanel;
	private GameObject congratsPanel;
	private GameObject continueSearchPanel;
	private GameObject withCosmicPanel;
	private GameObject cardboardGame;

	private Selectable buttonN; // next evt
	private Selectable buttonP; // previous evt
	private Selectable buttonT; // toggle VR

	private int numberOfClicks = 0;
	private int doubleClicked = 2;
	private double previousClickTime = -1;
	private double thisClickTime = -1;
	[Tooltip("Multiple click on track sensitivity. (seconds between two clicks)")]
	public double multipleClickSpeed = 1;

	// Use this for initialization
	void Start () {

		Debug.Log ("Here we are");

		Screen.orientation = ScreenOrientation.LandscapeLeft;

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
											if (child5.name == "PanelGoToCardboardGame") 
												cardboardGame = child5.gameObject;
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
			


		// Get the Next Event button and the selectable
		foreach (Transform child in canvas.transform) {
			if (child.gameObject.name == "FloorCanvas") {
				foreach (Transform child2 in child.gameObject.transform) {
					if (child2.gameObject.name == "Panel") {
						foreach (Transform child3 in child2.gameObject.transform) {
							if (child3.gameObject.name == "Next Event Button") {
								buttonN = child3.gameObject.GetComponent<Selectable>();
							}
							if (child3.gameObject.name == "Previous Event Button") {
								buttonP = child3.gameObject.GetComponent<Selectable>();
							}
							if (child3.gameObject.name == "Toggle VR Button") {
								buttonT = child3.gameObject.GetComponent<Selectable>();
							}
						}
					}
				}
			}
		}

		// Now prepare everything to start
		//   Activate the "Continue your search..." flashing written
		continueSearchPanel.SetActive (true);
		//   Set the "Next Event" button to not clickable
		buttonN.interactable = false;
		//   Set the "Previous Event" button to not clickable
		buttonP.interactable = false;
		//   Set the "Toggle VR" button to not clickable
		buttonT.interactable = false;

	}

	// Update is called once per frame
	void Update () {

		Screen.orientation = ScreenOrientation.LandscapeLeft;

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

			Debug.Log ("HERE");

			numberOfClicks++;

			thisClickTime = Time.time;
			double deltaTime = thisClickTime - previousClickTime;

			// If I clicked at least twice, and the last two clicks happend close in time to each other, 
			//then it means I double clicked, then do whatever you have to do
			if (numberOfClicks >= doubleClicked && deltaTime < multipleClickSpeed) {

				numberOfClicks = 0;


				bool goToNext = false, goToNextWithCosmics = false, goToMainMenu = false, goToCardboardGame = false;

				// First undertstand what to do now
				// Check what is the active prefab and decide to go back to main menu or not.
				foreach (Transform child in rfps.transform) {
					Debug.Log ("The name of the child is " + child.name);
					if (child.gameObject.activeInHierarchy) {
						// For the turorial
						if (child.name == "prodgenie_bnb_nu_uboone_game_1.json")
							goToNext = true;
						if (child.name == "prodgenie_bnb_nu_uboone_new_2.json_testGame")
							goToNextWithCosmics = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_10.json")
							goToNext = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_12.json") {
							goToMainMenu = true;
							goToCardboardGame = true;
						}

						// For the real game
						// Level 1
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_2.json")
							goToNext = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_6.json")
							goToNext = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_7.json")
							goToMainMenu = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_8.json")
							goToNext = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_9.json")
							goToNext = true;
						// Level 2
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_14.json")
							goToNext = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_15.json")
							goToNext = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_17.json")
							goToNext = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_19.json")
							goToNext = true;
						if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_21.json")
							goToMainMenu = true;
					}
				}

				neutrinoEventFound = true;
				continueSearchPanel.SetActive (false);
				if (goToNext)
					goNextPanel.SetActive (true);
				if (goToNextWithCosmics)
					withCosmicPanel.SetActive (true);
				if (goToMainMenu)
					congratsPanel.SetActive (true);
				if (goToCardboardGame) {
					goToCardboardRealGame ();
					Debug.Log ("HERE");
				}

				// Activate the "Next Event" button
				buttonN.interactable = true;

			}
			previousClickTime = Time.time;
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


	void goToCardboardRealGame() {

		StartCoroutine (goToCardboardRealGameMain());

	}

	IEnumerator goToCardboardRealGameMain() {
		yield return new WaitForSeconds(1.5F);
		congratsPanel.SetActive (false);
		cardboardGame.SetActive (true);
		yield return new WaitForSeconds(1.5F);
		Application.LoadLevel("GamePlayCardboardApp");
	}



	void removePanel(){

		goNextPanel.SetActive (false);
		withCosmicPanel.SetActive (false);
		congratsPanel.SetActive (false);
	}
}
