using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class MainMenuScript : MonoBehaviour {

	public GameObject savedEventPanel;
	public GameObject webEventPanel;
	public GameObject settingsPanel;
	public GameObject aboutPanel;
	public GameObject exitPanel;


	void Start(){
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
		HidePanels();
		savedEventPanel.SetActive(true);
	}

	public void ShowWebEvents(){
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
