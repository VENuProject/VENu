//trackClick.js
//Written by: Thomas Wester
//Handles track selection, displaying tooltip.

#pragma strict

import tooltip;

var tooltipObject : GameObject;

function Deselect () {
    //Not sure how to hold a reference to all the tracks, so using FindGameObjectsWithTag
    var objects = GameObject.FindGameObjectsWithTag("trackSelected");
    var objectCount = objects.length;
    
    //Unhighlight any selected tracks, and set their layer to "track"
    for (var obj : GameObject in objects) {
        var ln : LineRenderer = obj.GetComponent.<LineRenderer>();
        ln.SetColors(Color.cyan, Color.cyan);
        obj.tag = "track";
        //tooltipObject.transform.SetParent(tooltipParent.transform);
        tooltipObject.SetActive(false);
    }
}

function OnMouseOver () { 
    //Check for left-click or single touch, make sure there's no UI element in front
    if (Input.GetMouseButtonDown(0) && !EventSystems.EventSystem.current.IsPointerOverGameObject()) {
        if (gameObject.transform.parent.tag != "trackSelected") {
            //Deselect any other active tracks and display the tooltip
            Deselect();
            tooltipObject.SetActive(true);
            
            //Highlight the track
            var ln : LineRenderer = gameObject.transform.parent.GetComponent.<LineRenderer>();        
            ln.SetColors(Color.red, Color.yellow);
            
            gameObject.transform.parent.tag = "trackSelected";  
            var v = getInfo();
            
            tooltipObject.SendMessage("DispText", v);
        }
        else {
            Deselect();
        }
    }
}

function getInfo () {
    //Get the values to display on the tooltip
    var nHits : int = gameObject.transform.parent.childCount;
    var origin : Vector3 = gameObject.transform.parent.GetChild(0).position;
    var length : float = 0f;
    
    var seg : GameObject = gameObject.transform.parent.GetChild(0).gameObject;
    var bc = seg.GetComponent.<BoxCollider>();
    
    var unitRotation : Vector3 = Vector3.Normalize(seg.transform.rotation.eulerAngles);
     
    //The segment object's origin is at the midpoint of the endpoints, so subtract half a length
    origin -= seg.transform.forward *  bc.size.z / 2f;
    
    //Sum up the lengths of each segment object's box colliders to get the total length.
    for (var i : int = 0; i < nHits; i++) {
        seg = gameObject.transform.parent.GetChild(i).gameObject;
        bc = seg.GetComponent.<BoxCollider>();
        length += bc.size.z;
    }
    
    //Capitalize the first letter of the track name, and add a space between the number. E.g. "track0" -> "Track 0"
    var name : String = gameObject.transform.parent.name;
    name = name.Substring(0, 1).ToUpper() + name.Substring(1, name.Length - 2) + " " 
        + name.Substring(name.Length - 1, 1);
    
    var v = values(name, 0f, 0f, Mathf.Round(length * 100) / 100, 0f, 0f, 0f, origin.ToString(), nHits + 1);
    
    return v;
}

function Update () {

}

//Avoid using GameObject.Find by adding a reference. Also allows tooltipObject to be enabled/disabled.
function SetTooltipRef(tt : GameObject){
	tooltipObject = tt;
}

function Start() { 

}