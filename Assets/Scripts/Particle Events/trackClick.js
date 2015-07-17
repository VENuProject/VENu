#pragma strict

function Deselect () {
    var objects = GameObject.FindGameObjectsWithTag("trackSelected");
    var objectCount = objects.length;
    for (var obj : GameObject in objects) {
        var ln : LineRenderer = obj.GetComponent.<LineRenderer>();
        ln.SetColors(Color.green, Color.cyan);
        obj.tag = "track";
    }
}

function OnMouseDown () { 
    if (gameObject.transform.parent.tag != "trackSelected") {
        Deselect();
        var ln : LineRenderer = gameObject.transform.parent.GetComponent.<LineRenderer>();        
        ln.SetColors(Color.yellow, Color.yellow);
        gameObject.transform.parent.tag = "trackSelected";  
    }
    else {
        Deselect();
    }
}

function Update () {

}

function Start() { 
 
}