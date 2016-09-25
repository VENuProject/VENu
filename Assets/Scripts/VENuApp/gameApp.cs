using UnityEngine;
using System.Collections;
using System.IO;
using UnityEngine.UI;
using UnityEngine.SceneManagement;



public class gameApp : MonoBehaviour {

	private GameObject canvas;
	private GameObject evtPrefab;
	private bool goToNext;
	private bool goToMainMenu;
	private bool goToNextWithCosmics;


	// Use this for initialization
	void Start () {

		Screen.orientation = ScreenOrientation.LandscapeLeft;

	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnMouseDown(){
		goToNext = false;
		goToMainMenu = false;
		goToNextWithCosmics = false;

		// Check what is the active prefab and decide to go back to main menu or not.
		evtPrefab = GameObject.Find("EventsPrefab_simulation");
		Debug.Log ("the name is " + evtPrefab.name);
		foreach (Transform child in evtPrefab.transform) {
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
				if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_7.json") goToNext = true;
				if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_8.json") goToNext = true;
				if (child.name == "prodgenie_bnb_nu_cosmic_uboone_game_final_9.json") goToMainMenu = true;

			}
		}


		// Activate congrats panel
		canvas = GameObject.Find("GameCanvas");
		Debug.Log ("the name is " + canvas.name);
		foreach (Transform child in canvas.transform)
		{
			Debug.Log ("The name of the child is " + child.name);
			if (child.name == "PanelNext" && goToNext)
				child.gameObject.SetActive (true);
			if (child.name == "PanelGoToMainMenu" && goToMainMenu)
				child.gameObject.SetActive (true);
			if (child.name == "PanelNextWithCosmics" && goToNextWithCosmics)
				child.gameObject.SetActive (true);
		}


	}
}
