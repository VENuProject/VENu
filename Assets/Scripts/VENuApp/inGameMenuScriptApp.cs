// inGameMenuScriptApp.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk


using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine.UI;
using UnityEngine.SceneManagement;


public class inGameMenuScriptApp: MonoBehaviour {
	
	public string EventMenuScene;
	public string GameMenuScene;
	
	//for animation
	private enum menuState {isIn, slidingOut, isOut, slidingIn};
	private menuState state;
	private float inPos;
	private float outPos;
	private float startTime;
	private bool showData, showSimulation, isGame;
	private RectTransform me;
	const float slideSpeed = 3;
	public RectTransform buttonsGroup;
	public GameObject slideButton;

	int nPrefabs = 0;
	int currentPrefab = 0;
	GameObject[] prefabsToLoad = new GameObject[100];
	string[] namePrefabsToLoad = new string[100];
	GameObject evtContainer;


	void Awake() {

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


		if (SceneManager.GetActiveScene ().name == "GameTutorialApp" || SceneManager.GetActiveScene ().name == "GamePlayApp") {
			isGame = true;
			showSimulation = showData = false;
		}


		if (isGame) {
			
			evtContainer = GameObject.Find ("EventsPrefab_simulation");

			Debug.Log ("This should be EventsPrefab_...: " + evtContainer.name);
			foreach (Transform child in evtContainer.transform) {
				Debug.Log ("The name of the child is " + child.name);
				prefabsToLoad [nPrefabs] = child.gameObject;
				nPrefabs++;
			}
			Debug.Log ("Event prefabs found: " + nPrefabs + 1);


			/*
			if(SceneManager.GetActiveScene ().name == "GameTutorialApp") {
				namePrefabsToLoad [0] = "Tracks/prodgenie_bnb_nu_uboone_new_1.json_testGame"; nPrefabs++;
				namePrefabsToLoad [1] = "Tracks/prodgenie_bnb_nu_uboone_new_2.json_testGame"; nPrefabs++;
				namePrefabsToLoad [2] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_game_final_10.json"; nPrefabs++;
				namePrefabsToLoad [3] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_game_final_12.json"; nPrefabs++; 
			}
			if(SceneManager.GetActiveScene ().name == "GamePlayApp") {
				namePrefabsToLoad [0] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_game_final_2.json"; nPrefabs++;
				namePrefabsToLoad [1] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_game_final_6.json"; nPrefabs++;
				namePrefabsToLoad [2] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_game_final_7.json"; nPrefabs++;
				namePrefabsToLoad [3] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_game_final_8.json"; nPrefabs++; 
				namePrefabsToLoad [4] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_game_final_9.json"; nPrefabs++; 
				namePrefabsToLoad [5] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_game_final_10.json"; nPrefabs++; 
				namePrefabsToLoad [6] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_game_final_12.json"; nPrefabs++; 
			}*/

		}


		if (showSimulation) {/*
			evtContainer = GameObject.Find ("EventsPrefab_simulation");

			Debug.Log ("This should be EventsPrefab_...: " + evtContainer.name);
			foreach (Transform child in evtContainer.transform) {
				Debug.Log ("The name of the child is " + child.name);
				prefabsToLoad [nPrefabs] = child.gameObject;
				nPrefabs++;
			}
			Debug.Log ("Event prefabs found: " + nPrefabs + 1);*/

			namePrefabsToLoad [0] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_5.json"; nPrefabs++;
			namePrefabsToLoad [1] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_16.json"; nPrefabs++;
			namePrefabsToLoad [2] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_13.json"; nPrefabs++;
			namePrefabsToLoad [3] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_12.json"; nPrefabs++; 
			namePrefabsToLoad [4] = "Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json"; nPrefabs++;
		}

		if (showData) {
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

			/*prefabsToLoad [0] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccpi0_r5975e4262.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [0].SetActive (false);
			prefabsToLoad [1] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccnumu_r5153e2919.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [1].SetActive (false);
			prefabsToLoad [2] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccnumu_r5153e2929.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [2].SetActive (false);
			prefabsToLoad [3] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccnumu_r5155e6623.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [3].SetActive (false);
			prefabsToLoad [4] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccnumu_r5189e665.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [4].SetActive (false);
			prefabsToLoad [5] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccnumu_r5192e1218.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [5].SetActive (false);
			prefabsToLoad [6] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccnumu_r5208_e5108.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [6].SetActive (false);
			prefabsToLoad [7] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccnumu_r5607_e2873.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [7].SetActive (false);
			prefabsToLoad [8] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccnumu_r5820_e585.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [8].SetActive (false);
			prefabsToLoad [9] = (GameObject)Instantiate (Resources.Load ("SpacePoints/data_ccnumu_r5823_e6135.json.spacepoints_3cm.json"));
			nPrefabs++;
			prefabsToLoad [9].SetActive (false);*/

		}



		// Start the scene loading the first event prefab. 
		// Then go on with the other prefabs as soon as the user clicks on next or previous event.
		if (!isGame) prefabsToLoad [currentPrefab] = (GameObject)Instantiate (Resources.Load (namePrefabsToLoad [currentPrefab]));
		prefabsToLoad[currentPrefab].SetActive(true);

	}
		
	void Start () {
		
		me = GetComponent<RectTransform>();
		
		#if MOBILE_INPUT
		me.sizeDelta = new Vector2(360, me.sizeDelta.y);
		foreach(LayoutElement child in buttonsGroup.GetComponentsInChildren<LayoutElement>()){
			child.minHeight = 60;
		}
		#else
		me.sizeDelta = new Vector2(320, me.sizeDelta.y);
		foreach(LayoutElement child in transform.GetComponentsInChildren<LayoutElement>()){
			child.minHeight = 70;
		}
		#endif
		
		state = menuState.isIn;
		inPos = -(me.rect.width / 2);
		outPos = (me.rect.width / 2);
		me.anchoredPosition = new Vector2(inPos, 0);
		
	}
	
	void Update () {
		
		if(state == menuState.slidingOut){
			me.anchoredPosition = Vector2.Lerp (new Vector2(inPos, 0), new Vector2(outPos, 0), (Time.time - startTime) * slideSpeed);
			//slideButton.GetComponent<RectTransform>().eulerAngles = Vector3.Lerp(new Vector3(0, 0, 0), new Vector3(0, 180, 0), (Time.time - startTime) * slideSpeed);
			if (me.anchoredPosition == new Vector2(outPos, 0))
				state = menuState.isOut;
		}
		else if(state == menuState.slidingIn){
			me.anchoredPosition = Vector2.Lerp (new Vector2(outPos, 0), new Vector2(inPos, 0), (Time.time - startTime) * slideSpeed);
			//slideButton.GetComponent<RectTransform>().eulerAngles = Vector3.Lerp(new Vector3(0, 180, 0), new Vector3(0, 0, 0), (Time.time - startTime) * slideSpeed);
			if (me.anchoredPosition == new Vector2(inPos, 0))
				state = menuState.isIn;
		}
		
	}
	
	public void SlideMenu() {
		if(state == menuState.isIn){
			state = menuState.slidingOut;
			slideButton.GetComponent<RectTransform>().eulerAngles = new Vector3(0, 0, 0); //AMCLEAN changed (0,0,180) to (0,0,0)
			startTime = Time.time;
		}	
		else if(state == menuState.isOut){
			state = menuState.slidingIn;
			slideButton.GetComponent<RectTransform>().eulerAngles = new Vector3(0, 0, 0);
			startTime = Time.time;
		}
	}


	public void ToEventMenu() {
		SceneManager.LoadScene(EventMenuScene);
	}

	public void ToGameMenu() {
		SceneManager.LoadScene(GameMenuScene);
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
		//if (showSimulation) evtContainer.SetActive(true);
		if (!isGame) prefabsToLoad[currentPrefab] = (GameObject)Instantiate (Resources.Load (namePrefabsToLoad [currentPrefab]));
		prefabsToLoad[currentPrefab].SetActive(true);
		//Resources.UnloadUnusedAssets ();



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
		//Resources.UnloadUnusedAssets ();

	}


	public void ToggleTracks() {

		Debug.Log ("I'm here.  " + prefabsToLoad [currentPrefab].activeInHierarchy + "   " + namePrefabsToLoad [currentPrefab]);

		if(prefabsToLoad [currentPrefab].activeInHierarchy) prefabsToLoad [currentPrefab].SetActive (false);
		else if(!prefabsToLoad [currentPrefab].activeInHierarchy) prefabsToLoad [currentPrefab].SetActive (true);

	}
	/*



	
	public void ToEventMenu() {
		SceneManager.LoadScene(EventMenuScene);
	}
	
	public void LoadNext(){
		string currentEvent = PlayerPrefs.GetString("File To Load");
		DirectoryInfo dir = new DirectoryInfo(Application.streamingAssetsPath);
		FileInfo[] filesInfo = dir.GetFiles("*.json");
		int currentIndex = -1;
		
		for(int i = 0; i < filesInfo.Length; i++)
			if(filesInfo[i].Name == currentEvent)
				currentIndex = i;
		
		//if(currentIndex == filesInfo.Length - 1){
		//	//no more files!
		//	Debug.Log("No more files!");
		//}
		if(currentIndex == -1){
			//don't know where we are. did File To Load not get set?
			Debug.Log("file not found!");
			
		}
		else{
			PlayerPrefs.SetString("File To Load", filesInfo[(currentIndex + 1) % filesInfo.Length].Name);
			Debug.Log("loading file " + PlayerPrefs.GetString("File To Load"));
			SceneManager.LoadScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene().buildIndex);
			//the file is loaded elsewhere. All that script needs is the name of the new file.
		}
	}
	
	public void LoadPrevious(){
		string currentEvent = PlayerPrefs.GetString("File To Load");
		DirectoryInfo dir = new DirectoryInfo(Application.streamingAssetsPath);
		FileInfo[] filesInfo = dir.GetFiles("*.json");
		int currentIndex = -1;
		
		for(int i = 0; i < filesInfo.Length; i++)
			if(filesInfo[i].Name == currentEvent)
				currentIndex = i;
		
		//if(currentIndex == filesInfo.Length - 1){
		//	//no more files!
		//	Debug.Log("No more files!");
		//}
		if(currentIndex == -1){
			//don't know where we are. did File To Load not get set?
			Debug.Log("file not found!");
			
		}
		else{
			PlayerPrefs.SetString("File To Load", filesInfo[(currentIndex -1) % filesInfo.Length].Name);
			Debug.Log("loading file " + PlayerPrefs.GetString("File To Load"));
			//SceneManager.LoadScene(Application.loadedLevel);
			SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
			//the file is loaded elsewhere. All that script needs is the name of the new file.
		}
	}
	*/
}
