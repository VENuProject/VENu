#pragma strict

function OnMouseDown () {
    Debug.Log("Box Clicked!");
    var ln : LineRenderer = gameObject.GetComponent.<LineRenderer>();
    ln.SetColors(Color.yellow, Color.yellow);
}

function Start () {

}

function Update () {

}
