using UnityEngine;
using System.Collections;
using UnityEngine.UI;



public class OnlineEventsMenu : MonoBehaviour {

	public GameObject electronPanel;
	public GameObject pi0Panel;
	public GameObject protonPanel;
	public GameObject muminusPanel;
	public GameObject gammaPanel;

    public GameObject buttonsGroup;
	
    string url1 = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252Fprod";
    string[] url2Array = new Array("_bnblike_electron", "_bnblike_pi0", "_bnblike_proton", "_bnblike_muminus", "_bnb_like_gamma");
    string url3 = "_uboone%252F";
    string[] url4Array = new Array("1691317_", "1691318_", "1831337_", "1695054_", "1831485_");
    int[][] url5Array = [[0,2,3,4,5], [0,1,2,3,4], [1,3,4,5,6], [0,1,3,4,5], [0,2,3,4,5]];
    string url6 = "%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";
	
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