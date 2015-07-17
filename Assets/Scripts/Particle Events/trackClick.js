#pragma strict

//var toolTipC1Text = "";
//var toolTipC2Text = "";
//var toolTipC3Text = "";
private var guiStyleFore : GUIStyle; 
private var guiStyleBack : GUIStyle;
//private var currentToolTipC1Text = "";
//private var currentToolTipC2Text = "";
//private var currentToolTipC3Text = "";

//function OnMouseDown () {
//    Deselect();
//    var ln : LineRenderer = gameObject.transform.parent.GetComponent.<LineRenderer>();
//    ln.SetColors(Color.yellow, Color.yellow);
//}

function Deselect() {
    var objects = GameObject.FindGameObjectsWithTag("trackSelected");
    var objectCount = objects.length;
    for (var obj : GameObject in objects) {
        var ln : LineRenderer = obj.GetComponent.<LineRenderer>();
        ln.SetColors(Color.green, Color.cyan);
        obj.tag = "track";
        //Debug.Log(obj.name + " deselected.");
    }
}

function Start() { 

    guiStyleFore = new GUIStyle(); 
    guiStyleFore.normal.textColor = Color.white;
    guiStyleFore.alignment = TextAnchor.UpperLeft; 
    guiStyleFore.wordWrap = true; 
    guiStyleBack = new GUIStyle(); 
    guiStyleBack.normal.textColor = Color.black;
    guiStyleBack.alignment = TextAnchor.UpperLeft ; 
    guiStyleBack.wordWrap = true; 

}

function OnMouseDown () {
   
    if (gameObject.transform.parent.tag != "trackSelected") {
        Deselect();
        var ln : LineRenderer = gameObject.transform.parent.GetComponent.<LineRenderer>();
        ln.SetColors(Color.yellow, Color.yellow);
        
        gameObject.transform.parent.tag = "trackSelected";
        //Debug.Log(gameObject.transform.parent.name + " selected.");
        
      /*  
        var ttc1 : String;
        var ttc2 : String;
        var ttc3 : String;
        
        ttc1 += gameObject.transform.parent.name + "\n";
        ttc1 += "Phi: 999" + "\n" + "Theta: 999" + "\n";
        ttc2 += "Length: 999" + "\n" + "Range: 999" + "\n" + "PIDA: 999" + "\n";
        ttc3 += "IDTruth: 999" + "\n" + "Origin: 999" + "\n" + "NHits: 999";
        
         currentToolTipC1Text = ttc1;
         currentToolTipC2Text = ttc2;
         currentToolTipC3Text = ttc3;
       */
     }
     else {
         Deselect();
     }
}

//function OnMouseExit () { 
//    Deselect();
//    currentToolTipC1Text = ""; 
//    currentToolTipC2Text = ""; 
//    currentToolTipC3Text = ""; 
//}
/*
function OnGUI() { 

    if (currentToolTipC1Text != "") { 
        //var x = Event.current.mousePosition.x; 
        //var y = Event.current.mousePosition.y; 
        //if (x + 100 > Screen.width) {
        GUI.Box(Rect((Screen.width - 450)/ 2.0,Screen.height-70,450,70),"");
        GUI.Label(Rect((Screen.width - 450)/ 2.0 + 5,Screen.height-60,150,70), currentToolTipC1Text, guiStyleBack); 
        GUI.Label(Rect((Screen.width - 450)/ 2.0 + 5,Screen.height-60,150,70), currentToolTipC1Text, guiStyleFore); 
            
        GUI.Label(Rect((Screen.width - 450)/ 2.0 + 155,Screen.height-60,150,70), currentToolTipC2Text, guiStyleBack); 
        GUI.Label(Rect((Screen.width - 450)/ 2.0 + 155,Screen.height-60,150,70), currentToolTipC2Text, guiStyleFore); 
            
        GUI.Label(Rect((Screen.width - 450)/ 2.0 + 305,Screen.height-60,150,70), currentToolTipC3Text, guiStyleBack); 
        GUI.Label(Rect((Screen.width - 450)/ 2.0 + 305,Screen.height-60,150,70), currentToolTipC3Text, guiStyleFore); 
        //}
        //else {
        //    GUI.Box(Rect(x+10,Mathf.Clamp(y+6,0,Screen.height - 160),100,160),"");
        //    GUI.Label(Rect(x+15,Mathf.Clamp(y+8,0,Screen.height - 160),100,160), currentToolTipText, guiStyleBack); 
        //    GUI.Label(Rect(x+14,Mathf.Clamp(y+9,0,Screen.height - 160),100,160), currentToolTipText, guiStyleFore); 
        //}
       
    } 
} 
*/
function Update () {

}
