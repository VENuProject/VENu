#pragma strict

function OnMouseDown () {
    var ln : LineRenderer = gameObject.GetComponent.<LineRenderer>();
    ln.SetColors(Color.yellow, Color.yellow);
}

function Start () {

}

function Update () {

}
