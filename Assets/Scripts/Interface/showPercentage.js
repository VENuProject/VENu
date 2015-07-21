#pragma strict
import UnityEngine.UI;

public var sb : Slider;
var txtBox : Text;



function Update () {
	txtBox.GetComponent.<Text>().text = sb.value.ToString();
	}