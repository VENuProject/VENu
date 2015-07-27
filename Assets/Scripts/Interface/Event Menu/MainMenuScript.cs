using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class MainMenuScript : MonoBehaviour {

	public GameObject savedEventPanel;
	public GameObject webEventPanel;
	public GameObject settingsPanel;
	public GameObject aboutPanel;
	public GameObject exitPanel;
	//AMCLEAN add
	public GameObject electronPanel;
	public GameObject pi0Panel;
	public GameObject muminusPanel;
	public GameObject gammaPanel;


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
//		electronPanel.SetActive(false);
//		pi0Panel.SetActive(false);
//		muminusPanel.SetActive(false);
//		gammaPanel.SetActive(false);
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

	public void ShowElectronEvents(){
		HidePanels ();
		ShowWebEvents ();
		electronPanel.SetActive (true);
	}

	public void ShowPi0Events(){
		HidePanels ();
		ShowWebEvents ();
		pi0Panel.SetActive (true);
	}

	public void ShowMuminusEvents(){
		HidePanels ();
		ShowWebEvents ();
		muminusPanel.SetActive (true);
	}

	public void ShowGammaEvents(){
		HidePanels ();
		ShowWebEvents ();
		gammaPanel.SetActive (true);
	}
	public void ARMode(){
		//load AR scene
		Application.LoadLevel(3);
	}
}
