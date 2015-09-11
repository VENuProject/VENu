﻿using UnityEngine;
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
	public GameObject exitButton;

	void Start(){

#if MOBILE_INPUT
		ARButton.SetActive(true);
		exitButton.SetActive(false);
#else
		ARButton.SetActive(false);
		exitButton.SetActive(true);
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
