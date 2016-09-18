// MainMenuApp.js
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk


#pragma strict

@Tooltip("How many seconds the Cardboard instruction screen should last.")
public var waitSec : int;

function Start () {

  Screen.orientation = ScreenOrientation.Portrait;

  var canvas = GameObject.Find("MenuCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "MenuPanel")          child.gameObject.SetActive(true);
    if(child.gameObject.name == "LoadCardboardPanel") child.gameObject.SetActive(false);
    if(child.gameObject.name == "DisplayPanel")       child.gameObject.SetActive(false);

  }


}

function Update () {

}

function goToEventDisplay() {

  Screen.orientation = ScreenOrientation.LandscapeLeft;
  var canvas = GameObject.Find("MenuCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "LoadDisplayPanel"){
      child.gameObject.SetActive(true);
    }
  }
  Application.LoadLevel("DisplayApp");

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



