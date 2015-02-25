#pragma strict
var tr : Transform;
 
 
function Start () {
    tr = transform;
}
 
 
function Update () {
    tr.Rotate(0.0, 90.0*Time.deltaTime, 0.0);
}