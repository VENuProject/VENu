#pragma strict
import UnityEngine.UI;

public var sb : Slider;
var txtBox : Text;



function Update () {
	txtBox.GetComponent.<Text>().text = Mathf.Floor(100 * sb.value) + "%";
}