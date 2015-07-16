#pragma strict

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

function Start () {

}

function Update () {

}
