using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class mainMenuScript : MonoBehaviour {

	public GameObject savedEventPanel;
	public GameObject webEventPanel;
	public GameObject settingsPanel;
	public GameObject aboutPanel;
	public GameObject exitPanel;

	public GameObject buttonPanel;
	public GameObject ARButton;


	void Start(){
		//Default: Local event type. This is changed when 'Online Events' button is pressed.
		PlayerPrefs.SetString("EventSource", "local");
#if MOBILE_INPUT
		ARButton.SetActive(true);
#else
		ARButton.SetActive(false);
#endif
		HidePanels();
		ShowSavedEvents();
	}

	public void HidePanels(){
		savedEventPanel.SetActive(false);
		webEventPanel.SetActive(false);
		settingsPanel.SetActive(false);
		aboutPanel.SetActive(false);
		exitPanel.SetActive(false);
	}

	public void ShowSavedEvents(){
		//Make sure the game scene knows which set of events are being loaded
		PlayerPrefs.SetString("EventSource", "local");
		HidePanels();
		savedEventPanel.SetActive(true);
	}

	public void ShowWebEvents(){
		//Make sure the game scene knows which set of events are being loaded
		PlayerPrefs.SetString("EventSource", "web");
		HidePanels();
		webEventPanel.SetActive(true);
	}

	public void ShowSettings(){
		HidePanels();
		settingsPanel.SetActive(true);
	}

	public void ShowAbout(){
		HidePanels();
		aboutPanel.SetActive(true);
	}

	public void ShowExit(){
		HidePanels();
		exitPanel.SetActive(true);
	}

	public void ARMode(){
		//load AR scene
		Application.LoadLevel(3);
	}
}
