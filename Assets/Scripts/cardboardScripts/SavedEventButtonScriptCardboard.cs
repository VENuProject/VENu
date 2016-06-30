using UnityEngine;
using System.Collections;
using UnityEngine.UI;


public class SavedEventButtonScriptCardboard : MonoBehaviour {



	public GameObject Canvas; 

	public GameObject savedEventButtonPanel; // the panel that contains the button that allows to show the saved events
	public GameObject savedEventPanel;       // the panel that contains the saved events
	public GameObject eventSizePanel;        // the panel that contain the choice between different event sizes


	// Use this for initialization
	void Start () {
	
	}
		
	// Update is called once per frame
	void Update () {
	
	}

	public void ShowEventSizePanel(){
		eventSizePanel.SetActive(true);
		savedEventButtonPanel.SetActive(false);
	}

	public void ShowSavedEvents(int fileType){
		
		//savedEventPanel.GetComponent<localFileGathererCardboard>();
		//Debug.Log ("marco: " + localFileGathererCardboard.test);
		//Debug.Log("marco: "+savedEventPanel.GetComponent<localFileGathererCardboard>().fileType);
		//LocalFileGathererCardboard.fileType = fileType;  
		//Make sure the game scene knows which set of events are being loaded
		PlayerPrefs.SetString("EventSource", "local");
		savedEventPanel.SetActive(true);
		savedEventButtonPanel.SetActive(false);
		eventSizePanel.SetActive(false);
	}


}
