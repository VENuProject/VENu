#pragma strict
import UnityEngine.UI;

public var scrollbar : UnityEngine.UI.Slider;
public var player : Transform;
var currentpos : Vector3;

function Start () {

}

function HeightControl () {
//	player.position = transform.position;
	player.position = currentpos + Vector3.up * scrollbar.value * 11 ;
}

function LateUpdate ()
{
	currentpos = Vector3(player.transform.localPosition.x, 0, player.transform.localPosition.z);
	HeightControl();	
}