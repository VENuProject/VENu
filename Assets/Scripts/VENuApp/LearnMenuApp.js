// LearnMenuApp.js
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk


#pragma strict

@Tooltip("How many seconds the Cardboard instruction screen should last.")
public var waitSec : int;

var backToTutorialButton : GameObject;

function Start () {

  Screen.orientation = ScreenOrientation.Portrait;

  // *******************
  // We need to check if the user is learing from the main manu of from the tutorial
  // *******************
  if (PlayerPrefs.HasKey("LearnFromTutorial") && PlayerPrefs.GetInt("LearnFromTutorial") == 1) {
    //if(PlayerPrefs.GetInt("LearnFromTutorial") == 1) {
      // *******************
      // The user is learning from the tutorial, understand what subject and load the relative panel immediately.
      // *******************
      if (PlayerPrefs.HasKey("LearnFromTutorialSubject")) {
        var canvas = GameObject.Find("LearnCanvases");
        var panel : GameObject;
        if (PlayerPrefs.GetString("LearnFromTutorialSubject") == "NuBeam") {

          // Load canvas with the rigth explanation
          goToCanvasNuBeam();

          for (var child : Transform in canvas.transform)
          {
            if(child.gameObject.name == "LearnCanvasNuBeam")
              panel = child.gameObject;
          }

          // Create a button that allows the user to go back to the tutorial
          createBackToTutorialButton(canvas, panel);

        }
        if (PlayerPrefs.GetString("LearnFromTutorialSubject") == "NuCrossSection") {

          // Load canvas with the rigth explanation
          goToCanvasCrossSection();

          canvas = GameObject.Find("LearnCanvases");
          for (var child : Transform in canvas.transform)
          {
            if(child.gameObject.name == "LearnCanvasCrossSection")
              panel = child.gameObject;
          }

          // Create a button that allows the user to go back to the tutorial
          createBackToTutorialButton(canvas, panel);

        }
        if (PlayerPrefs.GetString("LearnFromTutorialSubject") == "NuInteraction") {

          // Load canvas with the rigth explanation
          goToCanvasNuInteractions();

          canvas = GameObject.Find("LearnCanvases");
          for (var child : Transform in canvas.transform)
          {
            if(child.gameObject.name == "LearnCanvasNuInteractions")
              panel = child.gameObject;
          }

          // Create a button that allows the user to go back to the tutorial
          createBackToTutorialButton(canvas, panel);

        }
        if (PlayerPrefs.GetString("LearnFromTutorialSubject") == "Cosmics") {

          // Load canvas with the rigth explanation
          goToCanvasCosmics();

          canvas = GameObject.Find("LearnCanvases");
          for (var child : Transform in canvas.transform)
          {
            if(child.gameObject.name == "LearnCanvasCosmics")
              panel = child.gameObject;
          }

          // Create a button that allows the user to go back to the tutorial
          createBackToTutorialButton(canvas, panel);

        }
      }
    //}
  } 
  else {
    // *******************
    // The user is learning  from the main manu, start normally.
    // *******************
    var menucanvas = GameObject.Find("MenuCanvas");
    for (var child : Transform in menucanvas.transform)
    {
        child.gameObject.SetActive(true);
    }
    var learncanvas = GameObject.Find("LearnCanvases");
    for (var child : Transform in learncanvas.transform)
    {
        child.gameObject.SetActive(false);
    }   
  }
}

function Update () {

}

function goBackToTutorial() {

  Application.LoadLevel("GameMenuApp");

}

function createBackToTutorialButton(canvas: GameObject, panel : GameObject) {
// This function creates a button that allows the user to go back to the tutorial

          var button = new GameObject ("button", CanvasRenderer, Image, Button);
          button.transform.parent = panel.transform;
          button.transform.localScale = Vector3(0.1F, 0.1F, 0.1F);
          button.transform.localPosition = Vector3(0, 0, 0);
          button.GetComponent(RectTransform).sizeDelta = new Vector2(2500, 1000);
          button.GetComponent(RectTransform).anchorMin = new Vector2(1, 0);
          button.GetComponent(RectTransform).anchorMax = new Vector2(1, 0);
          button.GetComponent(RectTransform).pivot     = new Vector2(1, 0);
          var text = new GameObject ("text", CanvasRenderer, Text);
          text.transform.parent = button.transform;
          text.transform.localScale = Vector3(1, 1, 1);
          text.transform.localPosition = Vector3(0, 0, 0);
          text.GetComponent(RectTransform).anchorMin = new Vector2(0, 0);
          text.GetComponent(RectTransform).anchorMax = new Vector2(1, 1);
          text.GetComponent(RectTransform).pivot     = new Vector2(0.5, 0.5);
          text.GetComponent(RectTransform).offsetMin.x = 0; // Left
          text.GetComponent(RectTransform).offsetMax.x = 0; // Rigth
          text.GetComponent(RectTransform).offsetMax.y = 0; // Top
          text.GetComponent(RectTransform).offsetMin.y = 0; // Bottom

          button.GetComponentInChildren.<Text>().text      = "Back to tutorial";
          button.GetComponentInChildren.<Text>().fontSize  = 260;
          button.GetComponentInChildren.<Text>().color     = Color.black;
          button.GetComponentInChildren.<Text>().font      = Resources.GetBuiltinResource(typeof(Font), "Arial.ttf") as Font;
          button.GetComponentInChildren.<Text>().alignment = TextAnchor.MiddleCenter;

          button.GetComponent(Image).color = Color(0.26F, 0.91F, 0.37F, 1.0F); //green

          button.GetComponent(Button).onClick.AddListener( function() {goBackToTutorial();}  );

}

function goToLearnMenu () {

  // No matter what you're doing, you asked to go to the menu
  PlayerPrefs.SetInt("LearnFromTutorial",0);
  // Start again
  Start();

}

function DeactivateMenu () {

  var menucanvas = GameObject.Find("MenuCanvas");
  for (var child : Transform in menucanvas.transform)
  {
    if(child.gameObject.name == "ButtonsListPanel"){
      child.gameObject.SetActive(false);
    }
    if(child.gameObject.name == "BackgroundPanel"){
      child.gameObject.SetActive(false);
    }
  }  

}


function goToCanvasNu() {

  // Deactivate the button list...
  DeactivateMenu();

  // ...and activate the scrollable text
  var learncanvas = GameObject.Find("LearnCanvases");
  for (var child : Transform in learncanvas.transform)
  {
    if(child.gameObject.name == "LearnCanvasNu"){
      child.gameObject.SetActive(true);
    }
  }  
}

function goToCanvasOrigin() {

  // Deactivate the button list...
  DeactivateMenu();

  // ...and activate the scrollable text
  var learncanvas = GameObject.Find("LearnCanvases");
  for (var child : Transform in learncanvas.transform)
  {
    if(child.gameObject.name == "LearnCanvasOrigin"){
      child.gameObject.SetActive(true);
    }
  }  
}

function goToCanvasNuBeam() {

  // Deactivate the button list...
  DeactivateMenu();

  // ...and activate the scrollable text
  var learncanvas = GameObject.Find("LearnCanvases");
  for (var child : Transform in learncanvas.transform)
  {
    if(child.gameObject.name == "LearnCanvasNuBeam"){
      child.gameObject.SetActive(true);
    }
  }  
}

function goToCanvasCrossSection() {

  // Deactivate the button list...
  DeactivateMenu();

  // ...and activate the scrollable text
  var learncanvas = GameObject.Find("LearnCanvases");
  for (var child : Transform in learncanvas.transform)
  {
    if(child.gameObject.name == "LearnCanvasCrossSection"){
      child.gameObject.SetActive(true);
    }
  }  
}

function goToCanvasNuInteractions() {

  // Deactivate the button list...
  DeactivateMenu();

  // ...and activate the scrollable text
  var learncanvas = GameObject.Find("LearnCanvases");
  for (var child : Transform in learncanvas.transform)
  {
    if(child.gameObject.name == "LearnCanvasNuInteractions"){
      child.gameObject.SetActive(true);
    }
  }  
}

function goToCanvasCosmics() {

  // Deactivate the button list...
  DeactivateMenu();

  // ...and activate the scrollable text
  var learncanvas = GameObject.Find("LearnCanvases");
  for (var child : Transform in learncanvas.transform)
  {
    if(child.gameObject.name == "LearnCanvasCosmics"){
      child.gameObject.SetActive(true);
    }
  }  
}

function goToCanvasFermilab() {

  // Deactivate the button list...
  DeactivateMenu();

  // ...and activate the scrollable text
  var learncanvas = GameObject.Find("LearnCanvases");
  for (var child : Transform in learncanvas.transform)
  {
    if(child.gameObject.name == "LearnCanvasFermilab"){
      child.gameObject.SetActive(true);
    }
  }  
}

function goToCanvasMicroBooNE() {

  // Deactivate the button list...
  DeactivateMenu();

  // ...and activate the scrollable text
  var learncanvas = GameObject.Find("LearnCanvases");
  for (var child : Transform in learncanvas.transform)
  {
    if(child.gameObject.name == "LearnCanvasMicroBooNE"){
      child.gameObject.SetActive(true);
    }
  }  
}

function goToCanvasTPC() {

  // Deactivate the button list...
  DeactivateMenu();

  // ...and activate the scrollable text
  var learncanvas = GameObject.Find("LearnCanvases");
  for (var child : Transform in learncanvas.transform)
  {
    if(child.gameObject.name == "LearnCanvasTPC"){
      child.gameObject.SetActive(true);
    }
  }  
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
  yield WaitForSeconds (waitSec);

  Application.LoadLevel("DisplayCardboardApp");
}




