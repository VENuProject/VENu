#pragma strict
import UnityEngine.UI;

public var scrollbar : UnityEngine.UI.Slider;
public var player : Transform;

function Start () {

}

function HeightControl () {
	player.position = Vector3.up * scrollbar.value * 11;
}

function Update ()
{



}