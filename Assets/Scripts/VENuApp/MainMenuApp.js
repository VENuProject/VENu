// MainMenuApp.js
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk


#pragma strict

function Start () {

  Screen.orientation = ScreenOrientation.Portrait;

}

function Update () {

}

function goToEventDisplay() {

  PlayerPrefs.SetInt("UseCardboard", 0);
  Screen.orientation = ScreenOrientation.LandscapeLeft;
  Application.LoadLevel("DisplayApp");

}

function goToCardboardEventDisplayMain() { 

  PlayerPrefs.SetInt("UseCardboard", 1);
  Screen.orientation = ScreenOrientation.LandscapeLeft;
  var canvas = GameObject.Find("MenuCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "LoadCardboardPanel"){
      child.gameObject.SetActive(true);
    }
  }
  yield WaitForSeconds (2.5);

  Application.LoadLevel("DisplayCardboardApp");
  //Application.LoadLevel("DisplayVRtemp");
}

function goToCardboardEventDisplay() {
     StartCoroutine(goToCardboardEventDisplayMain()); //need to start a coroutine to use WaitForSeconds.
     Debug.Log ("Starten!");
 }

function goToAugumentedRealityDisplay() {

  Application.LoadLevel("MyAR");

}

function goToLearnScene() {

  Application.LoadLevel("LearnApp");

}

function goToCreditsScene() {

  Application.LoadLevel("CreditsApp");

}

function goToMainMenuScene() {

  Application.LoadLevel("MainMenuApp");

}

