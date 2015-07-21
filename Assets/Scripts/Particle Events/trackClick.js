#pragma strict

import Tooltip;

var tooltipObject : GameObject;
var tooltipParent : GameObject;
var myCanvas : GameObject;

function Deselect () {
    var objects = GameObject.FindGameObjectsWithTag("trackSelected");
    var objectCount = objects.length;
    for (var obj : GameObject in objects) {
        var ln : LineRenderer = obj.GetComponent.<LineRenderer>();
        ln.SetColors(Color.cyan, Color.cyan);
        obj.tag = "track";
        tooltipObject.transform.SetParent(tooltipParent.transform);
    }
}

function OnMouseDown () { 
    if (gameObject.transform.parent.tag != "trackSelected") {
        Deselect();
        var ln : LineRenderer = gameObject.transform.parent.GetComponent.<LineRenderer>();        
        ln.SetColors(Color.red, Color.yellow);
        gameObject.transform.parent.tag = "trackSelected";  
       // var obj = GameObject.Find("ToolTip");
        var v = values(gameObject.transform.parent.name, 
            9.9, 9.9, 9.9, 9.9, 
            9.9, 9.9, 9.9, 9.9);
        tooltipObject.SendMessage("DispText", v);
        tooltipObject.transform.position.x = Screen.width / 2.0;
        tooltipObject.transform.SetParent(myCanvas.transform);
    }
    else {
        Deselect();
    }
}

function Update () {

}

function Start() { 
    tooltipObject = GameObject.Find("ToolTip");
    tooltipParent = GameObject.Find("TooltipParent");
    myCanvas = GameObject.Find("Canvas");
}