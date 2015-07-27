#pragma strict

//Attached to event menu canvas
//searches StreamingAssets folder for .json files and adds buttons to the menu

import System.IO;
import UnityEngine.WWW;
import UnityEngine.UI;

public var jsonFilesPath;
public var EventButton : GameObject;
//public var ButtonsGroup : GameObject;
public var displayLevel : String;

//AMCLEAN add
public var electronsButtonsGroup : GameObject;
public var pi0ButtonsGroup : GameObject;
public var protonsButtonsGroup : GameObject;
public var muminusButtonsGroup : GameObject;
public var gammaButtonsGroup : GameObject;




var _urlArray = new Array() ;
var _partArray = new Array("_bnblike_electron","_bnblike_pi0","_bnblike_proton","_bnblike_muminus","_bnb_like_gamma") ; //new Array() ; AMCLEAN added new Array(...)
var _evtArray = new Array("1691317_"         ,"1691318_"    ,"1831337_"       ,"1695054_"        ,"1831485_"       ) ;   //AMCLEAN added new Array(...)

//Make evtNArray the carrier of the event numbers for each particle.  Let's add 5 events per particle for now
//Some events online are empty, so the below were selected specifically as filled events for corresponding particles
//var _evtNArray= new Array(0,2,3,4,5,	      0,1,2,3,4,     1,3,4,5,6,	       0,1,3,4,5,        0,2,3,4,5        ) ; 
var _evtNArray= new Array(0,2,3,4,5);//AMCLEAN add



//Keep button and part array separate for now for future ease of adding particles that don't begin with "bnb_like" to partArray
//var _buttonArray = new Array("electron"      ,"pi0"          ,"proton"         ,"muminus"	,"gamma"          ) ;

function Start () 
{
		var k = 0; 
		//Loop through particle/event arrays 
		for(var i = 0; i< _partArray.length;) {
		   var _url = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252Fprod"+_partArray[i]+"_uboone%252F"+_evtArray[i];

		    //Add 5 url-events per particle 
		    for(var j = 0; j < 5; j++ ){
			var _url2 = _url + _evtNArray[k+j].ToString()+"%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";
			_urlArray.Push(_url2) ;
	/*		
			if (i == 0)
			{
				addElectronButton(_evtNArray[j]);
			}
			else if (i ==1)
			{
				addPi0Button(_evtNArray[j]);
			}
			else if (i == 2)
			{
				addProtonButton(_evtNArray[j]);
			}
			else if (i == 3)
			{
				addMuminusButton(_evtNArray[j]);
			}
			else if (i == 4)
			{
				addGammaButton(_evtNArray[j]);
			}
			else
			{
				return;
			}
			*/
		    //Keep track of location in evtNArray ;

		    //Add a button for each particle
		    //AddButton(_buttonArray[i]) ;
		    //AMCLEAN add

		    i = i+1;
		   // AddButton(_evtNArray[i]);
		    }
		
	
//		jsonFilesPath = Application.streamingAssetsPath; //this works fine on iOS
//		var dir = new DirectoryInfo(jsonFilesPath);
//		var filesInfo = dir.GetFiles("*.json");
//		for (file in filesInfo)
//			AddButton(file.Name);
//		Debug.Log("found " + filesInfo.Length + " json files");
/*	for (url in _urlArray)
	{
		addElectronButton(_url.Name);
	}
	*/
	
	
#if MOBILE_INPUT
	
	electronsButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(30f, 30f);
	pi0ButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(30f, 30f);
	muminusButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(30f, 30f);
	gammaButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(30f, 30f);
	
#else
	
	electronsButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(60f, 60f);
	pi0ButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(60f, 60f);
	muminusButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(60f, 60f);
	gammaButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(60f, 60f);
	
#endif
}
/*
function addElectronButton(_url2 : String)
	{
	var newButton : GameObject;
	newButton = Instantiate(EventButton);
	newButton.transform.SetParent(electronsButtonsGroup.transform, false);
	newButton.GetComponentInChildren(UnityEngine.UI.Text).text = _url2;
	newButton.GetComponent(EventButtonScript).fileName = _url2;
	newButton.GetComponent(EventButtonScript).levelToLoad = displayLevel;
	}
	
function addPi0Button(_url2 : String)	
	{
	var newButton : GameObject;
	newButton = Instantiate(EventButton);
	newButton.transform.SetParent(pi0ButtonsGroup.transform, false);
	newButton.GetComponentInChildren(UnityEngine.UI.Text).text = _url2;
	newButton.GetComponent(EventButtonScript).fileName = _url2;
	newButton.GetComponent(EventButtonScript).levelToLoad = displayLevel;
	}
	
function addProtonButton(_url2 : String)	
	{
	var newButton : GameObject;
	newButton = Instantiate(EventButton);
	newButton.transform.SetParent(protonButtonsGroup.transform, false);
	newButton.GetComponentInChildren(UnityEngine.UI.Text).text = _url2;
	newButton.GetComponent(EventButtonScript).fileName = _url2;
	newButton.GetComponent(EventButtonScript).levelToLoad = displayLevel;
	}
	
function addMuminusButton(_url2 : String)
	{
	var newButton : GameObject;
	newButton = Instantiate(EventButton);
	newButton.transform.SetParent(muminusButtonsGroup.transform, false);
	newButton.GetComponentInChildren(UnityEngine.UI.Text).text = _url2;
	newButton.GetComponent(EventButtonScript).fileName = _url2;
	newButton.GetComponent(EventButtonScript).levelToLoad = displayLevel;
	}
	
function addGammaButton(_url2 : String)
	{
	var newButton : GameObject;
	newButton = Instantiate(EventButton);
	newButton.transform.SetParent(gammaButtonsGroup.transform, false);
	newButton.GetComponentInChildren(UnityEngine.UI.Text).text = _url2;
	newButton.GetComponent(EventButtonScript).fileName = _url2;
	newButton.GetComponent(EventButtonScript).levelToLoad = displayLevel;
	}
	//custom graphics for each file?
	//other button customization?
	*/

}