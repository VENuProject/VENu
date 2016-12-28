// MainMenuApp.js
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk


#pragma strict

@Tooltip("How many seconds the Cardboard instruction screen should last.")
public var waitSec : int;

var showSimulation : boolean;
var showData : boolean;


function Start () {

  Screen.orientation = ScreenOrientation.Portrait;

  //PlayerPrefs.DeleteAll(); // Reset all player preferences

  var scene = SceneManager.GetActiveScene();
  if (scene.name == "MainMenuApp"){	
    var canvas = GameObject.Find("MenuCanvas");
    for (var child : Transform in canvas.transform)
    {
      if(child.gameObject.name == "MenuPanel")          child.gameObject.SetActive(true);
      if(child.gameObject.name == "LoadCardboardPanel") child.gameObject.SetActive(false);
      if(child.gameObject.name == "DisplayPanel")       child.gameObject.SetActive(false);
    }
  }

}

function Update () {

}

function doShowSimulation() {

  showSimulation = true;
  showData = false;

}

function doShowData() {

  showSimulation = false;
  showData = true;

}

function changeToLandscapeLeft() {

  Screen.orientation = ScreenOrientation.LandscapeLeft;

}

function goToEventDisplay() {

  //Screen.orientation = ScreenOrientation.LandscapeLeft;

  if (showSimulation) PlayerPrefs.SetInt ("ShowSimulationOrData", 0);
  if (showData)       PlayerPrefs.SetInt ("ShowSimulationOrData", 1);

  var canvas = GameObject.Find("MenuCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "LoadDisplayPanel" && showSimulation){
      //Screen.orientation = ScreenOrientation.LandscapeLeft;
      child.gameObject.SetActive(true);
    }
    if(child.gameObject.name == "LoadDisplayPanel_RealData" && showData){
      //Screen.orientation = ScreenOrientation.LandscapeLeft;
      child.gameObject.SetActive(true);
    }
  }
  Application.LoadLevel("DisplayApp");

}

function goToCardboardHelp() {

Screen.orientation = ScreenOrientation.LandscapeLeft;

var canvas = GameObject.Find("MenuCanvas");
  for (var child : Transform in canvas.transform) {
    if(child.gameObject.name == "CardboardExplanationPanel"){
      child.gameObject.SetActive(true);
    }
  }

}

function deactivateCardboardHelp() {

var canvas = GameObject.Find("MenuCanvas");
  for (var child : Transform in canvas.transform) {
    if(child.gameObject.name == "CardboardExplanationPanel"){
      child.gameObject.SetActive(false);
    }
  }

}

function goToCardboardEventDisplayMain() { 

  Screen.orientation = ScreenOrientation.LandscapeLeft;
  var canvas = GameObject.Find("MenuCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "LoadCardboardPanel"){
      child.gameObject.SetActive(true);
    }
  }
  yield WaitForSeconds (waitSec);

  Application.LoadLevel("DisplayCardboardApp");
}

function goToCardboardEventDisplay() {
  if (showSimulation) PlayerPrefs.SetInt ("ShowSimulationOrData", 0);
  if (showData)       PlayerPrefs.SetInt ("ShowSimulationOrData", 1);

     StartCoroutine(goToCardboardEventDisplayMain()); //need to start a coroutine to use WaitForSeconds.
     Debug.Log ("Starten!");
 }

function goToDisplayMenu() {

  var canvas = GameObject.Find("MenuCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "DisplayPanel"){
      child.gameObject.SetActive(true);
    }
  }

}

function goToAugumentedRealityDisplay() {

  Application.LoadLevel("MyAR");

}

function goToLearnScene() {

  Application.LoadLevel("LearnApp");

}

function goToFeedbackScene() {

  Application.LoadLevel("FeedbackApp");

}


function goToCreditsScene() {

  Application.LoadLevel("CreditsApp");

}

function goToGameMenuScene() {

  Application.LoadLevel("GameMenuApp");

}

function goToMainMenuScene() {

  Application.LoadLevel("MainMenuApp");

}

function goToGame() {

  Screen.orientation = ScreenOrientation.LandscapeLeft;

  var canvas = GameObject.Find("MainCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "StartTutorialPanel"){
      child.gameObject.SetActive(true);
    }
  }
  yield WaitForSeconds (waitSec);

  Application.LoadLevel("DisplayApptestGame");

}


function quit() {

  Application.Quit();

}


