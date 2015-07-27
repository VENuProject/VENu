using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class OnlineEventsMenu : MonoBehaviour {

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
	
	void Start(){

        #if MOBILE_INPUT
        
        buttonsGroup.GetComponent<GridLayoutGroup>().cellSize = new Vector2(120f, 120f);
        buttonsGroup.GetComponent<GridLayoutGroup>().spacing = new Vector2(8, 8);
        
        #else
        
        ButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(75f, 75f);
        ButtonsGroup.GetComponent(GridLayoutGroup).spacing = Vector2(8, 8);
        
        #endif

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
            Destroy(buttonsGroup.transform.GetChild(i).gameObject);
    }
	
	public void ShowElectronEvents(){
        ClearButtons();
        foreach(string file in buttons[0])
            AddButton(file);
	}
	
	public void ShowPi0Events(){
        ClearButtons();
        foreach(string file in buttons[1])
            AddButton(file);
	}

	public void ShowProtonEvents(){
        ClearButtons();
        foreach(string file in buttons[2])
            AddButton(file);
	}
	
	public void ShowMuminusEvents(){
        ClearButtons();
        foreach(string file in buttons[3])
            AddButton(file);
	}
	
	public void ShowGammaEvents(){
        ClearButtons();
        foreach(string file in buttons[4])
            AddButton(file);
	}

    void AddButton (string file){
        GameObject newButton;
        newButton = Instantiate(EventButton);
        newButton.transform.SetParent(buttonsGroup.transform, false);
        newButton.SendMessage("SetData", file);
        newButton.SendMessage("SetLevelToLoad", displayLevel);
        string[] btntxt = file.Split(new string[]{url1, url3, url6}, System.StringSplitOptions.RemoveEmptyEntries);
        string txt = string.Empty;
        foreach(string t in btntxt)
            txt += t;
        newButton.SendMessage("SetText", txt);
    }
}