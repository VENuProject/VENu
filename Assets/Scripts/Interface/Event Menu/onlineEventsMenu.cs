//onlineEventsMenu.js
//Written by: Owen Crawford
//Handles event buttons and event button categories for online JSON files.

using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class onlineEventsMenu : MonoBehaviour {

    public string displayLevel;
    public GameObject EventButton;
    public GameObject buttonsGroup;
    string url1 = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252F";
    string[] url2Array = new string[]{"prod_bnblike_electron", "prod_bnblike_pi0", "prod_bnblike_proton", "prod_bnblike_muminus", "prod_bnb_like_gamma"};
    string url3 = "_uboone%252F";
    string[] url4Array = new string[]{"1691317_", "1691318_", "1831337_", "1695054_", "1831485_"};
    int[][] url5Array = {new int[]{0,2,3,4,5}, new int[]{0,1,2,3,4}, new int[]{1,3,4,5,6}, new int[]{0,1,3,4,5}, new int[]{0,2,3,4,5}};
    string url6 = "%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";
    string[][] buttons;

	WWW argoTest;
	public string argoTestUrl;
	public float argoTimeout;
	float timeTestStarted;
	bool isTrying;
	//bool isConnected; //Not used
	public GameObject connectedPanel;
	public GameObject disconnectPanel;
	
	void Start(){

        #if MOBILE_INPUT
        buttonsGroup.GetComponent<GridLayoutGroup>().cellSize = new Vector2(120f, 120f);
        buttonsGroup.GetComponent<GridLayoutGroup>().spacing = new Vector2(8, 8);
        #else
        buttonsGroup.GetComponent<GridLayoutGroup>().cellSize = new Vector2(75f, 75f);
        buttonsGroup.GetComponent<GridLayoutGroup>().spacing = new Vector2(8, 8);
        #endif

        buttons = new string[url2Array.Length][];
        for(int particle = 0; particle < url2Array.Length; particle++){
            string[] partButtons = new string[url5Array[particle].Length];
            for(int evn = 0; evn < url5Array[particle].Length; evn++){
                partButtons[evn] =  url1 + url2Array[particle] + url3 + url4Array[particle] + url5Array[particle][evn] + url6 ;
            }
            buttons[particle] = partButtons;
		}
		argoTest = new WWW(argoTestUrl);
		timeTestStarted = Time.time;
		//isConnected = false;
		isTrying = true;
		disconnectPanel.SetActive(true);
		connectedPanel.SetActive(false);
		disconnectPanel.GetComponentInChildren<Text>().text = "Connecting to the ARGO web interface...";
		Debug.Log ("Trying to reach Argo...");
	}

	void FixedUpdate(){
		if(isTrying){
			if(Time.time - timeTestStarted <= argoTimeout){
				if(argoTest.isDone && string.IsNullOrEmpty(argoTest.error)){
					//isConnected = true;
					isTrying = false;
					Debug.Log ("connected to Argo!");
					disconnectPanel.SetActive(false);
					connectedPanel.SetActive(true);
					ShowElectronEvents();
				}
			}
			else{
				isTrying = false;
				disconnectPanel.GetComponentInChildren<Text>().text = "Failed to connect to the ARGO web interface. " +
					"Check your internet connection, or check back later if ARGO is offline.";
				Debug.Log("Argo timed out!");
			}
		}
	}

    void ClearButtons(){
        for(int i=0; i<buttonsGroup.transform.childCount; i++)
            Destroy(buttonsGroup.transform.GetChild(i).gameObject);
    }
	
	public void ShowElectronEvents(){
        ClearButtons();
        foreach(string file in buttons[0])
            AddButton(file, 0);
	}
	
	public void ShowPi0Events(){
        ClearButtons();
        foreach(string file in buttons[1])
            AddButton(file, 0);
	}

	public void ShowProtonEvents(){
        ClearButtons();
        foreach(string file in buttons[2])
            AddButton(file, 0);
	}
	
	public void ShowMuminusEvents(){
        ClearButtons();
        foreach(string file in buttons[3])
            AddButton(file, 0);
	}
	
	public void ShowGammaEvents(){
        ClearButtons();
        foreach(string file in buttons[4])
            AddButton(file, 0);
	}

    void AddButton (string file, float size){
        GameObject newButton;
        newButton = Instantiate(EventButton);
        newButton.transform.SetParent(buttonsGroup.transform, false);
        newButton.SendMessage("SetData", file);
        newButton.SendMessage("SetLevelToLoad", displayLevel);
        newButton.SendMessage("SetText", formatBtnText(file));
		newButton.SendMessage("SetFileSize", size);
    }	

	string formatBtnText (string raw) {
		string[] btntxt = raw.Split(new string[]{url1, url3, url6}, System.StringSplitOptions.RemoveEmptyEntries);
		string txt = string.Empty;
		foreach(string t in btntxt) {
			string[] words = t.Split(new string[]{"_"}, System.StringSplitOptions.RemoveEmptyEntries);
		    foreach (string s in words) {
		    	txt += s + "\n";
			}
		}
		txt = txt.Substring(0, txt.Length - 1);
		return txt;
	}
	
}