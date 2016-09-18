// inGameMenuScriptCardboardApp2.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk



using UnityEngine;
using System.Collections;
using System.IO;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class inGameMenuScriptCardboardApp2: MonoBehaviour {
	
	//private GameObject[] eventPrefabs = new GameObject[10];
	int nPrefabs = 0;
	int currentPrefab = 0;
	GameObject[] prefabsToLoad = new GameObject[100];
	GameObject evtContainer;

	public string EventMenuScene;


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





	}

	void Start () {

		// ****************************
		// Listing prefabs looking in the Resources folder - You must know what prefab to load!
		// ****************************
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
		SceneManager.LoadScene(EventMenuScene);
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
		//evtContainer.SetActive(true);
		prefabsToLoad[currentPrefab].SetActive(true);

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

		/*
		foreach (Transform child in cardboard_RFPS.transform)
		{
			Debug.Log ("The name of the child is " + child.name);
			if (child.name == "FloorCanvas") {
				foreach (Transform child2 in child.transform)
				{
					Debug.Log ("The name of the child is " + child.name);
					if (child2.name == "Panel") {
						//child2.gameObject.GetComponent<inGameMenuScriptCardboardApp2>().
					}
				}
			}
		}
*/
	
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
}
