// inGameMenuScriptCardboardApp2.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk



using UnityEngine;
using System.Collections;
using System.IO;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class inGameMenuScriptCardboardApp2: MonoBehaviour {
	
	int nPrefabs = 0;
	int currentPrefab = 0;
	GameObject[] prefabsToLoad = new GameObject[100];
	string[] namePrefabsToLoad = new string[100];
	GameObject evtContainer;

	public string EventMenuScene;
	public float waitSec;

	private bool showData, showSimulation, isGame;

	private GameObject nextEventButton;
	private Selectable button;


	void Awake() {

		// ****************************
		// Listing prefabs looking in the scene - This takes ages to load the scene!
		// ****************************
		/* evtContainer = GameObject.Find("EventsPrefab");
		Debug.Log ("This should be EventsPrefab: " + evtContainer.name);
		foreach (Transform child in evtContainer.transform)
		{
			Debug.Log ("The name of the child is " + child.name);
			prefabsToLoad [nPrefabs] = child.gameObject;
			nPrefabs++;
		}
		Debug.Log ("Event prefabs found: " + nPrefabs+1);
		*/

		Screen.orientation = ScreenOrientation.LandscapeLeft;

		showSimulation = showData = isGame = false;

		// Understand if we need to show Simulation or Data events
		if (PlayerPrefs.HasKey ("ShowSimulationOrData")) {
			if (PlayerPrefs.GetInt ("ShowSimulationOrData") == 0) {  // 0: simulation, 1: data
				showSimulation = true;
			} else
				showData = true;
		} else
			Debug.Log ("Can't find key ShowSimulationOrData in inGameMenuScriptApp.cs.");

		if (SceneManager.GetActiveScene ().name == "GameTutorialCardboardApp" || 
			SceneManager.GetActiveScene ().name == "GamePlayCardboardApp") {
			isGame = true;
			showSimulation = showData = false;
		}
			

		if (showSimulation) {
			Debug.Log ("Showing simulation.");
			namePrefabsToLoad [0] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_5.json"; nPrefabs++;
			namePrefabsToLoad [1] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_16.json"; nPrefabs++;
			namePrefabsToLoad [2] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_13.json"; nPrefabs++;
			namePrefabsToLoad [3] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_12.json"; nPrefabs++; 
			namePrefabsToLoad [4] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json"; nPrefabs++;
		}

		if (showData) {
			Debug.Log ("Showing data.");
			namePrefabsToLoad [0] = "SpacePoints/data_ccpi0_r5975e4262.json.spacepoints_3cm.json"; nPrefabs++;
			namePrefabsToLoad [1] = "SpacePoints/data_ccnumu_r5153e2919.json.spacepoints_3cm.json"; nPrefabs++;
			namePrefabsToLoad [2] = "SpacePoints/data_ccnumu_r5153e2929.json.spacepoints_3cm.json"; nPrefabs++;
			namePrefabsToLoad [3] = "SpacePoints/data_ccnumu_r5155e6623.json.spacepoints_3cm.json"; nPrefabs++; 
			namePrefabsToLoad [4] = "SpacePoints/data_ccnumu_r5189e665.json.spacepoints_3cm.json"; nPrefabs++;
			namePrefabsToLoad [5] = "SpacePoints/data_ccnumu_r5192e1218.json.spacepoints_3cm.json"; nPrefabs++;
			namePrefabsToLoad [6] = "SpacePoints/data_ccnumu_r5208_e5108.json.spacepoints_3cm.json"; nPrefabs++;
			namePrefabsToLoad [7] = "SpacePoints/data_ccnumu_r5607_e2873.json.spacepoints_3cm.json"; nPrefabs++;
			namePrefabsToLoad [8] = "SpacePoints/data_ccnumu_r5820_e585.json.spacepoints_3cm.json"; nPrefabs++;
			namePrefabsToLoad [9] = "SpacePoints/data_ccnumu_r5823_e6135.json.spacepoints_3cm.json"; nPrefabs++;

		}

		if (isGame) {
			Debug.Log ("It is game.");
			evtContainer = GameObject.Find ("EventsPrefab_simulation");
			Debug.Log ("This should be EventsPrefab_...: " + evtContainer.name);
			foreach (Transform child in evtContainer.transform) {
				Debug.Log ("The name of the child is " + child.name);
				prefabsToLoad [nPrefabs] = child.gameObject;
				nPrefabs++;
			}
			Debug.Log ("Event prefabs found: " + (nPrefabs + 1));

		}

		// Start the scene loading the first event prefab. 
		// Then go on with the other prefabs as soon as the user clicks on next or previous event.
		if (!isGame)prefabsToLoad [currentPrefab] = (GameObject)Instantiate (Resources.Load (namePrefabsToLoad [0]));
		prefabsToLoad[currentPrefab].SetActive(true);

			
	}

	void Start () {

		// ****************************
		// Listing prefabs looking in the Resources folder - You must know what prefab to load!
		// ****************************
		/*
		prefabsToLoad[0] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_5.json")); nPrefabs++; prefabsToLoad[0].SetActive(false);
		prefabsToLoad[1] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json")); nPrefabs++; prefabsToLoad[1].SetActive(false);
		prefabsToLoad[2] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_12.json")); nPrefabs++; prefabsToLoad[2].SetActive(false);
		prefabsToLoad[3] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_13.json")); nPrefabs++; prefabsToLoad[3].SetActive(false);
		prefabsToLoad[4] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_16.json")); nPrefabs++; prefabsToLoad[4].SetActive(false);

		// ****************************
		// Start the scene loading the first event prefab. 
		// Then go on with the other prefabs as soon as the user clicks on next or previous event.
		// ****************************
		prefabsToLoad[currentPrefab].SetActive(true);
		*/
		// Start the scene loading the first event prefab. 
		// Then go on with the other prefabs as soon as the user clicks on next or previous event.
		//eventPrefabs[0] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json__track22_trackParent"));
		//eventPrefabs[1] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json__track22_trackParent"));
		//eventPrefabs[2] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json__track22_trackParent"));
		//eventPrefabs[3] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json__track22_trackParent"));

		//GameObject[] allObjects = UnityEngine.Object.FindObjectsOfType<GameObject>();
		//foreach(GameObject go in allObjects)
		//	print(go+" is an object") ;

		// Get the Next Event button and the selectable
		GameObject canvas = GameObject.Find("cardboard_RFPS");
		foreach (Transform child in canvas.transform) {
			if (child.gameObject.name == "FloorCanvas") {
				foreach (Transform child2 in child.gameObject.transform) {
					if (child2.gameObject.name == "Panel") {
						foreach (Transform child3 in child2.gameObject.transform) {
							if (child3.gameObject.name == "Next Event Button") {
								nextEventButton = child3.gameObject;
								button = nextEventButton.GetComponent<Selectable>();
							}
						}
					}
				}
			}
		}

	}
	
	void Update () {
		
	}

	
	public void ToEventMenu() {
		SceneManager.LoadScene(EventMenuScene);
	}
	
	public void LoadNext(){

		// Remove current event
		prefabsToLoad[currentPrefab].SetActive(false);
		if (!isGame) Object.Destroy (prefabsToLoad[currentPrefab]);


		// Verify this is not the last event available, in that case, re-start from beginning
		if (currentPrefab == nPrefabs-1)
			currentPrefab = 0;
		else
			currentPrefab++;

		Debug.Log ("currentPrefab is " + currentPrefab);
		Debug.Log ("nPrefabs is " + nPrefabs);

		// Load the event
		//evtContainer.SetActive(true);
		if (!isGame) prefabsToLoad[currentPrefab] = (GameObject)Instantiate (Resources.Load (namePrefabsToLoad [currentPrefab]));
		prefabsToLoad[currentPrefab].SetActive(true);

		//Trying to stop the player now (this is not used anymore --Marco)
		GameObject cardboard_RFPS = GameObject.Find("cardboard_RFPS");
		cardboard_RFPS.GetComponent<carboardAutoWalk>().stopIt = true;

		if (isGame) {
			// If plaiyng with cardboard
			// Also set the Next Event button to not clickable
			// It will become clickable when the user finds the right track

			button.interactable = false;
		}
	
	}
	
	public void LoadPrevious(){

		// Remove current event
		prefabsToLoad[currentPrefab].SetActive(false);
		if (!isGame) Object.Destroy (prefabsToLoad[currentPrefab]);

		// Verify this is not the first event available, in that case, go to the last one
		if (currentPrefab == 0)
			currentPrefab = nPrefabs-1;
		else
			currentPrefab--;

		// Load the event
		if (!isGame) prefabsToLoad[currentPrefab] = (GameObject)Instantiate (Resources.Load (namePrefabsToLoad [currentPrefab]));
		prefabsToLoad[currentPrefab].SetActive(true);

		//Trying to stop the player now (this is not used anymore --Marco)
		GameObject cardboard_RFPS = GameObject.Find("cardboard_RFPS");
		cardboard_RFPS.GetComponent<carboardAutoWalk>().stopIt = true;

	}

	public void stopPlayer() {

		//Trying to stop the player now
		GameObject cardboard_RFPS = GameObject.Find("cardboard_RFPS");
		Debug.Log ("the name is " + cardboard_RFPS.name);
		//cardboard_RFPS.GetComponent<cardboardAutoWalk> ().stopIt;
		Component[] components = new Component[100];
		components = cardboard_RFPS.GetComponents<Component>();
		foreach (Component comp in components) {
			Debug.Log("The component name is " + comp.GetType());

		}
		cardboard_RFPS.GetComponent<carboardAutoWalk>().stopIt = true;


	}


	public void OkIconOn() {

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
											if (child5.name == "PanelOk") {
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
