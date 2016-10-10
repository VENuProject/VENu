// gameMenuApp.js
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk


#pragma strict

@Tooltip("How many seconds to read instructions.")
public var waitSec : int;

//public var tutorialExplanationPanels : GameObject[];
var tutorialExplanationPanels =  Array ();




function Start () {

  var scene = SceneManager.GetActiveScene();
  if (scene.name == "GamePlayApp" || scene.name == "GameTutorialApp") Screen.orientation = ScreenOrientation.LandscapeLeft;
  else Screen.orientation = ScreenOrientation.Portrait;
  Debug.Log("The active scene name is " + scene.name);

  // Get the tutorial panels and put them in GameObjects, we will activate these panels later
  var canvas = GameObject.Find("MainCanvas");
  if (canvas != null) {
    for (var child : Transform in canvas.transform)
    {
      if(child.gameObject.name == "TutorialPanel_NuBeam"){
        tutorialExplanationPanels.Push(child.gameObject);
      }
      if(child.gameObject.name == "TutorialPanel_NuCrossSection"){
        tutorialExplanationPanels.Push(child.gameObject);
      }
      if(child.gameObject.name == "TutorialPanel_NuInteraction"){
        tutorialExplanationPanels.Push(child.gameObject);
      }
      if(child.gameObject.name == "TutorialPanel_NuEventShape"){
        tutorialExplanationPanels.Push(child.gameObject);
      }
      if(child.gameObject.name == "TutorialPanel_Cosmics"){
        tutorialExplanationPanels.Push(child.gameObject);
      }
    }
  }

  if (scene.name == "GameMenuApp"){
   Debug.Log("tutorialExplanationPanels[0]" + tutorialExplanationPanels[0]);
   Debug.Log("tutorialExplanationPanels[1]" + tutorialExplanationPanels[1]);
   Debug.Log("tutorialExplanationPanels[2]" + tutorialExplanationPanels[2]);
   Debug.Log("tutorialExplanationPanels[3]" + tutorialExplanationPanels[3]);
   Debug.Log("tutorialExplanationPanels[4]" + tutorialExplanationPanels[4]);
  }

   // *******************
   // We need to check if the user coming back to tutorial because he previously started it and then decide to learn something
   // *******************
   if (PlayerPrefs.HasKey("LearnFromTutorial")) {
    if(PlayerPrefs.GetInt("LearnFromTutorial") == 1) {
      // The user is learning from the tutorial, understand what subject and load the relative panel immediately.
      // Reset the preference
      PlayerPrefs.SetInt("LearnFromTutorial", 0); // 0=false;  1=true
      if (PlayerPrefs.HasKey("LearnFromTutorialSubject")) {
      if (PlayerPrefs.GetString("LearnFromTutorialSubject") == "NuBeam")         goToTutorialExplanation(0);
      if (PlayerPrefs.GetString("LearnFromTutorialSubject") == "NuCrossSection") goToTutorialExplanation(1);
      if (PlayerPrefs.GetString("LearnFromTutorialSubject") == "NuInteraction")  goToTutorialExplanation(2);
      if (PlayerPrefs.GetString("LearnFromTutorialSubject") == "Cosmics")        goToTutorialExplanation(4);

      }
    }
  }

}


function Update () {
 
}


function WaitAndStop(panel : GameObject) {
        panel.SetActive (true);
		yield WaitForSeconds(waitSec);
		panel.SetActive (false);

	}

function goToTutorialMain () {

Screen.orientation = ScreenOrientation.LandscapeLeft;

  var canvas = GameObject.Find("MainCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "StartTutorialPanel"){
      child.gameObject.SetActive(true);
    }
  }
  yield WaitForSeconds (waitSec);

  Application.LoadLevel("GameTutorialApp");

}

function goToTutorial() {

    StartCoroutine(goToTutorialMain()); //need to start a coroutine to use WaitForSeconds.

}

function goToTutorialDirectly() {

  goToTutorialMain();

}

function goToTutorialExplanation(panel : int){

  Screen.orientation = ScreenOrientation.LandscapeLeft;

  var canvas = GameObject.Find("MainCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "MainPanel"){
      child.gameObject.SetActive(false);
    }
  }

  for (var i : int = 0; i < 5; i++){
    var temp : GameObject = tutorialExplanationPanels[i];
    if (i != panel) temp.SetActive(false);
    if (i == panel) temp.SetActive(true);

  }
}

function abortTutorial() {

  for (var i : int = 0; i < 5; i++){
    var temp : GameObject = tutorialExplanationPanels[i];
    temp.SetActive(false);
  }

  var canvas = GameObject.Find("MainCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "MainPanel"){
      child.gameObject.SetActive(true);
    }
  }
  Screen.orientation = ScreenOrientation.Portrait;

}


function goToRealGameMain() {

  Screen.orientation = ScreenOrientation.LandscapeLeft;

  var canvas = GameObject.Find("MainCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "StartGamePanel"){
      child.gameObject.SetActive(true);
    }
  }
  yield WaitForSeconds (waitSec);

  Application.LoadLevel("GamePlayApp");

}


function goToRealGame() {

  var canvas = GameObject.Find("MainCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "MainPanel"){
      child.gameObject.SetActive(false);
    }
  }

  StartCoroutine(goToRealGameMain()); //need to start a coroutine to use WaitForSeconds.
}

function goToRealGameDirectly() {

  goToRealGameMain();

}



function removePanel(){

  var canvas = GameObject.Find("GameCanvas");
  for (var child : Transform in canvas.transform)
  {
    if(child.gameObject.name == "PanelNext"){
      child.gameObject.SetActive(false);
    }
    if(child.gameObject.name == "PanelNextWithCosmics"){
      child.gameObject.SetActive(false);
    }
    if(child.gameObject.name == "PanelContinueSearch"){
      child.gameObject.SetActive(true);
    }
  }

}


function goToLearnNuBeam() {

  PlayerPrefs.SetInt("LearnFromTutorial", 1); // 0=false;  1=true
  PlayerPrefs.SetString("LearnFromTutorialSubject", "NuBeam");
  Application.LoadLevel("LearnApp");

}

function goToLearnNuCrossSection() {

  PlayerPrefs.SetInt("LearnFromTutorial", 1); // 0=false;  1=true
  PlayerPrefs.SetString("LearnFromTutorialSubject", "NuCrossSection");
  Application.LoadLevel("LearnApp");

}

function goToLearnNuInteraction() {

  PlayerPrefs.SetInt("LearnFromTutorial", 1); // 0=false;  1=true
  PlayerPrefs.SetString("LearnFromTutorialSubject", "NuInteraction");
  Application.LoadLevel("LearnApp");

}

function goToLearnCosmics() {

  PlayerPrefs.SetInt("LearnFromTutorial", 1); // 0=false;  1=true
  PlayerPrefs.SetString("LearnFromTutorialSubject", "Cosmics");
  Application.LoadLevel("LearnApp");

}
