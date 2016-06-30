#pragma strict

import System.IO;
import UnityEngine;
import System.Collections;
import UnityEngine.UI;


public class showEventsCardboard extends MonoBehaviour 
{


	public var savedEventButtonPanel : GameObject;  // the panel that contains the button that allows to show the saved events
	public var savedEventPanel : GameObject;        // the panel that contains the saved events
	public var eventSizePanel : GameObject;         // the panel that contain the choice between different event sizes
	public var cetegories : GameObject;             // cetegories inside savedEventPanel


	function Start () {
	
	}
	
	function Update () {

	}

	function GoHome () {

		savedEventPanel.SetActive(false);
		// Destroy all the created buttons
		var childs : int = cetegories.transform.childCount;
		for (var i = childs - 1; i >= 0; i--){
			Destroy(cetegories.transform.GetChild(i).gameObject);
		}
		eventSizePanel.SetActive(false);
		savedEventButtonPanel.SetActive(true);

	}

	function ShowEventSizePanel(){
		eventSizePanel.SetActive(true);
		savedEventButtonPanel.SetActive(false);
	}

	function ShowSavedEvents(fileType: int){

		savedEventPanel.GetComponent(localFileGathererCardboard).fileType = fileType;
		Debug.Log("marco: "+savedEventPanel.GetComponent(localFileGathererCardboard).fileType);
		//Make sure the game scene knows which set of events are being loaded
		PlayerPrefs.SetString("EventSource", "local");
		savedEventPanel.SetActive(true);
		savedEventButtonPanel.SetActive(false);
		eventSizePanel.SetActive(false);
	}
}