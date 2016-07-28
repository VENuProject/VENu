// inGameMenuScriptApp.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk



using UnityEngine;
using System.Collections;
using System.IO;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class inGameMenuScriptApp: MonoBehaviour {
	
	//private GameObject[] eventPrefabs = new GameObject[10];
	int nPrefabs = 0;
	int currentPrefab = 0;
	GameObject[] prefabsToLoad = new GameObject[100];
	GameObject evtContainer;


	void Awake() {


		evtContainer = GameObject.Find("EventsPrefab");
		Debug.Log ("This should be EventsPrefab: " + evtContainer.name);
		foreach (Transform child in evtContainer.transform)
		{
			Debug.Log ("The name of the child is " + child.name);
			prefabsToLoad [nPrefabs] = child.gameObject;
			nPrefabs++;
		}
		Debug.Log ("Event prefabs found: " + nPrefabs+1);

		// Start the scene loading the first event prefab. 
		// Then go on with the other prefabs as soon as the user clicks on next or previous event.
		prefabsToLoad[currentPrefab].SetActive(true);



	}

	void Start () {
		
		// Start the scene loading the first event prefab. 
		// Then go on with the other prefabs as soon as the user clicks on next or previous event.
		//eventPrefabs[0] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json__track22_trackParent"));
		//eventPrefabs[1] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json__track22_trackParent"));
		//eventPrefabs[2] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json__track22_trackParent"));
		//eventPrefabs[3] = (GameObject)Instantiate(Resources.Load("Tracks/prodgenie_bnb_nu_cosmic_uboone_10.json__track22_trackParent"));

		//GameObject[] allObjects = UnityEngine.Object.FindObjectsOfType<GameObject>();
		//foreach(GameObject go in allObjects)
		//	print(go+" is an object") ;




	}
	
	void Update () {
		

		
	}

	
	public void ToEventMenu() {
		//SceneManager.LoadScene(EventMenuScene);  // ?????????????????????????????????????
	}
	
	public void LoadNext(){

		// Remove current event
		prefabsToLoad[currentPrefab].SetActive(false);


		// Verify this is not the last event available, in that case, re-start from beginning
		if (currentPrefab == nPrefabs-1)
			currentPrefab = 0;
		else
			currentPrefab++;

		Debug.Log ("currentPrefab is " + currentPrefab);
		Debug.Log ("nPrefabs is " + nPrefabs);

		// Load the event
		evtContainer.SetActive(true);
		prefabsToLoad[currentPrefab].SetActive(true);


	
	}
	
	public void LoadPrevious(){

		// Remove current event
		prefabsToLoad[currentPrefab].SetActive(false);

		// Verify this is not the first event available, in that case, go to the last one
		if (currentPrefab == 0)
			currentPrefab = nPrefabs-1;
		else
			currentPrefab--;

		// Load the event
		prefabsToLoad[currentPrefab].SetActive(true);
		
	}
}
