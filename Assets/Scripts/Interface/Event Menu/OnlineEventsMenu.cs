using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System.Collections.Generic;


public class OnlineEventsMenu : MonoBehaviour {

	public GameObject electronPanel;
	public GameObject pi0Panel;
	public GameObject protonPanel;
	public GameObject muminusPanel;
	public GameObject gammaPanel;

    public GameObject buttonsGroup;
    string url1 = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252Fprod";
    string[] url2Array = new string[]{"_bnblike_electron", "_bnblike_pi0", "_bnblike_proton", "_bnblike_muminus", "_bnb_like_gamma"};
    string url3 = "_uboone%252F";
    string[] url4Array = new string[]{"1691317_", "1691318_", "1831337_", "1695054_", "1831485_"};
    int[][] url5Array = {new int[]{0,2,3,4,5}, new int[]{0,1,2,3,4}, new int[]{1,3,4,5,6}, new int[]{0,1,3,4,5}, new int[]{0,2,3,4,5}};
    string url6 = "%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";
    string[][] buttons;
	
	void Start(){
        buttons = new string[url2Array.Length][];
        for(int particle = 0; particle < url2Array.Length; particle++){
            string[] partButtons = new string[url5Array[particle].Length];
            for(int evn = 0; evn < url5Array[particle].Length; evn++){
                partButtons[evn] =  url1 + url2Array[particle] + url3 + url4Array[particle] + url5Array[particle][evn] + url6 ;
            }
            buttons[particle] = partButtons;
        }
        Debug.Log(buttons.Length);

	}

//	void HidePanels(){
//		electronPanel.SetActive(false);
//		pi0Panel.SetActive(false);
//		protonPanel.SetActive(false);
//		muminusPanel.SetActive(false);
//		gammaPanel.SetActive(false);
//	}

    void ClearButtons(){
        for(int i=0; i<buttonsGroup.transform.childCount; i++)
            Destroy(buttonsGroup.transform.GetChild(i));
    }
	
	public void ShowElectronEvents(){
        ClearButtons();
        foreach(string file in buttons[0])
            AddButton("abutton", file);
	}
	
	public void ShowPi0Events(){
        ClearButtons();
        foreach(string file in buttons[1])
            AddButton("abutton", file);
	}

	public void ShowProtonEvents(){
        ClearButtons();
        foreach(string file in buttons[2])
            AddButton("abutton", file);
	}
	
	public void ShowMuminusEvents(){
        ClearButtons();
        foreach(string file in buttons[3])
            AddButton("abutton", file);
	}
	
	public void ShowGammaEvents(){
        ClearButtons();
        foreach(string file in buttons[4])
            AddButton("abutton", file);
	}

    void AddButton(string Text, string FileName){
        Debug.Log ("adding a button");
    }

}