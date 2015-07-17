#pragma strict

var toolTipText = "";
private var guiStyleFore : GUIStyle; 
private var guiStyleBack : GUIStyle;
private var currentToolTipText = "";

function OnMouseDown () {
    Deselect();
    var ln : LineRenderer = gameObject.transform.parent.GetComponent.<LineRenderer>();
    ln.SetColors(Color.yellow, Color.yellow);
}
function Deselect() {
    var objects = GameObject.FindGameObjectsWithTag("track");
    var objectCount = objects.length;
    for (var obj : GameObject in objects) {
        var ln : LineRenderer = obj.GetComponent.<LineRenderer>();
        ln.SetColors(Color.green, Color.cyan);
    }
}

function Start() { 
    toolTipText = "test";
    guiStyleFore = new GUIStyle(); 
    guiStyleFore.normal.textColor = Color.white;
    guiStyleFore.alignment = TextAnchor.UpperLeft; 
    guiStyleFore.wordWrap = true; 
    guiStyleBack = new GUIStyle(); 
    guiStyleBack.normal.textColor = Color.black;
    guiStyleBack.alignment = TextAnchor.UpperLeft ; 
    guiStyleBack.wordWrap = true; 
}

function OnMouseEnter () {
    //Deselect();
    var ln : LineRenderer = gameObject.transform.parent.GetComponent.<LineRenderer>();
    ln.SetColors(Color.yellow, Color.yellow);

     var tt : String;
     tt += gameObject.transform.parent.name + "\n";
     tt += "Phi: 999" + "\n" + "Theta: 999" + "\n" + "Length: 999" + "\n" + "Range: 999" + "\n" + 
           "PIDA: 999" + "\n" + "IDTruth: 999" + "\n" + "Origin: 999" + "\n" + "NHits: 999";
     currentToolTipText = tt;
}

function OnMouseExit () { 
    Deselect();
    currentToolTipText = ""; 
}

function OnGUI() { 
    if (currentToolTipText != "") { 
        var x = Event.current.mousePosition.x; 
        var y = Event.current.mousePosition.y; 
        if (x + 100 > Screen.width) {
            GUI.Box(Rect(x-110,Mathf.Clamp(y+6,0,Screen.height - 160),100,160),"");
            GUI.Label(Rect(x-105,Mathf.Clamp(y+8,0,Screen.height - 160),100,160), currentToolTipText, guiStyleBack); 
            GUI.Label(Rect(x-106,Mathf.Clamp(y+9,0,Screen.height - 160),100,160), currentToolTipText, guiStyleFore); 
        }
        else {
            GUI.Box(Rect(x+10,Mathf.Clamp(y+6,0,Screen.height - 160),100,160),"");
            GUI.Label(Rect(x+15,Mathf.Clamp(y+8,0,Screen.height - 160),100,160), currentToolTipText, guiStyleBack); 
            GUI.Label(Rect(x+14,Mathf.Clamp(y+9,0,Screen.height - 160),100,160), currentToolTipText, guiStyleFore); 
        }
       
    } 
} 

function Update () {

}
