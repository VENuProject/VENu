using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class OnlineEventsMenu : MonoBehaviour {

	public GameObject electronPanel;
	public GameObject pi0Panel;
	public GameObject protonPanel;
	public GameObject muminusPanel;
	public GameObject gammaPanel;
	
	
	void Start(){
		HidePanels();
		ShowElectronEvents();
	}

	void HidePanels(){
		electronPanel.SetActive(false);
		pi0Panel.SetActive(false);
		protonPanel.SetActive(false);
		muminusPanel.SetActive(false);
		gammaPanel.SetActive(false);
	}
	
	public void ShowElectronEvents(){
		HidePanels();
		electronPanel.SetActive(true);
	}
	
	public void ShowPi0Events(){
		HidePanels();
		pi0Panel.SetActive(true);
	}

	public void ShowProtonEvents(){
		HidePanels();
		protonPanel.SetActive(true);
	}
	
	public void ShowMuminusEvents(){
		HidePanels();
		muminusPanel.SetActive(true);
	}
	
	public void ShowGammaEvents(){
		HidePanels();
		gammaPanel.SetActive(true);
	}



}