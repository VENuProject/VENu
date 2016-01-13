#pragma strict

//Attached to event menu canvas
//searches StreamingAssets folder for .json files and adds buttons to the menu

import System.IO;
import UnityEngine.WWW;
import UnityEngine.UI;

public var jsonFilesPath;
public var EventButton : GameObject;
public var ButtonsGroup : GameObject;
public var displayLevel : String;

var _urlArray = new Array() ;
var _partArray = new Array("_bnblike_electron","_bnblike_pi0","_bnblike_proton","_bnblike_muminus","_bnb_like_gamma") ; //new Array() ; AMCLEAN added new Array(...)
var _evtArray = new Array("1691317_"         ,"1691318_"    ,"1831337_"       ,"1695054_"        ,"1831485_"       ) ;   //AMCLEAN added new Array(...)

//Make evtNArray the carrier of the event numbers for each particle.  Let's add 5 events per particle for now
//Some events online are empty, so the below were selected specifically as filled events for corresponding particles
var _evtNArray= new Array(0,2,3,4,5,	      0,1,2,3,4,     1,3,4,5,6,	       0,1,3,4,5,        0,2,3,4,5        ) ; 

//Keep button and part array separate for now for future ease of adding particles that don't begin with "bnb_like" to partArray
var _buttonArray = new Array("electron"      ,"pi0"          ,"proton"         ,"muminus"	,"gamma"          ) ;

function Start () {

	if (Application.platform == RuntimePlatform.Android){
	
//		var jsonFilesPath = "jar:file://" + Application.dataPath + "!/assets";
//		    var www : WWW = new WWW(jsonFilesPath); //AMCLEAN add
//   			yield www; // AMCLEAN add

		//until I can get this working on android, hardcoded for now

		AddButton("prod_bnblike_proton_uboone.json");
		AddButton("prod_eminus_0.1-2.0GeV_isotropic.json");
		AddButton("prod_eminus_0.5-5.0GeV_25degf_uboone.json");
		AddButton("prodgenie_bnb_intrinsic_nue_uboone.json");
	}
	else {

		var k = 0; 
		//Loop through particle/event arrays 
		for(var i = 0; i< _partArray.length; i++) {
		    var _url = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252Fprod"+_partArray[i]+"_uboone%252F"+_evtArray[i];

		    //Add 5 url-events per particle 
		    for(var j = 0; j < 5; j++ ){
			var _url2 = _url + _evtNArray[k+j].ToString()+"%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";
			_urlArray.Push(_url2) ;
			}
		    //Keep track of location in evtNArray ;
		    k += j ; 
		
		    //Add a button for each particle
		    AddButton(_buttonArray[i]) ;
		    }
		
	
//		jsonFilesPath = Application.streamingAssetsPath; //this works fine on iOS
//		var dir = new DirectoryInfo(jsonFilesPath);
//		var filesInfo = dir.GetFiles("*.json");
//		for (file in filesInfo)
//			AddButton(file.Name);
//		Debug.Log("found " + filesInfo.Length + " json files");
	}
	
#if MOBILE_INPUT
	
	ButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(30f, 30f);
	
#else
	
	ButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(60f, 60f);
	
#endif
}

function AddButton (file : String){
	var newButton : GameObject;
	newButton = Instantiate(EventButton);
	newButton.transform.SetParent(ButtonsGroup.transform, false);
	newButton.GetComponentInChildren(UnityEngine.UI.Text,true).text = file;
	newButton.GetComponent(eventButtonScript).fileName = file;
	newButton.GetComponent(eventButtonScript).levelToLoad = displayLevel;
	//custom graphics for each file?
	//other button customization?
}
