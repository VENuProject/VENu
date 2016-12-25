// gameApp.css
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk

using UnityEngine;
using System.Collections;
using System.IO;
using UnityEngine.UI;
using UnityEngine.SceneManagement;



public class gameApp : MonoBehaviour {

	[Tooltip("Rate the -Continue your search...- will flash. In seconds.")]
	public float flashingRate = 5.0F;

	private GameObject canvas;
	private GameObject evtPrefab;
	private bool goToNext;
	private bool goToMainMenu;
	private bool goToNextWithCosmics;
	private bool goToCardboardGame;

	//private float thisTime;
	//private float previousTime;

	private int numberOfClicks = 0;
	private int doubleClicked = 2;
	private double previousClickTime = -1;
	private double thisClickTime = -1;
	[Tooltip("Multiple click on track sensitivity. (seconds between two clicks)")]
	public double multipleClickSpeed = 1;


	// Use this for initialization
	void Start () {

		Screen.orientation = ScreenOrientation.LandscapeLeft;

		//previousTime = Time.time;

	}
	
	// Update is called once per frame
	void Update () {
		/*
		thisTime = Time.time;

		if (thisTime - previousTime > flashingRate) {

			canvas = GameObject.Find ("GameCanvas");
			foreach (Transform child in canvas.transform) {
				if (child.name == "PanelContinueSearch")
					StartCoroutine(FlashIt(child.gameObject)); //need to start a coroutine to use WaitForSeconds.
						
			}
			previousTime = thisTime;
		}
		*/
	
	}
	/*
	IEnumerator FlashIt(GameObject panel) {
		panel.SetActive (false);
		yield return new WaitForSeconds(0.3F);
		panel.SetActive (true);

	}*/

	void OnMouseDown(){

		numberOfClicks++;

		thisClickTime = Time.time;
		double deltaTime = thisClickTime - previousClickTime;

		// If I clicked at least twice, and the last two clicks happend close in time to each other, 
		//then it means I double clicked, then do whatever you have to do
		if (numberOfClicks >= doubleClicked && deltaTime < multipleClickSpeed) {

			numberOfClicks = 0;

			goToNext = false;
			goToMainMenu = false;
			goToNextWithCosmics = false;

			// Check what is the active prefab and decide to go back to main menu or not.
			evtPrefab = GameObject.Find ("EventsPrefab_simulation");
			Debug.Log ("the name is " + evtPrefab.name);
			foreach (Transform child in evtPrefab.transform) {
				Debug.Log ("The name of the child is " + child.name);
				if (child.gameObject.activeInHierarchy) {
					// For the turorial
					if (child.name == "prodgenie_bnb_nu_uboone_game_1.json") {
						goToNext = true;
					}
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


			// Activate congrats panel
			canvas = GameObject.Find ("GameCanvas");
			Debug.Log ("the name is " + canvas.name);
			foreach (Transform child in canvas.transform) {
				Debug.Log ("The name of the child is " + child.name);
				if (child.name == "PanelContinueSearch")
					child.gameObject.SetActive (false);
				if (child.name == "PanelNext" && goToNext)
					child.gameObject.SetActive (true);	
				if (child.name == "PanelGoToMainMenu" && goToMainMenu)
					child.gameObject.SetActive (true);
				if (child.name == "PanelNextWithCosmics" && goToNextWithCosmics)
					child.gameObject.SetActive (true);
				
			}

		}

		previousClickTime = Time.time;


	}
}
