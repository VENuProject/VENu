﻿#pragma strict
import UnityEngine.UI;

public var sb : Slider;
var txtBox : Text;



function Update () {
	txtBox.GetComponent.<Text>().text = (10 * sb.value) + "%";
	var perc : int = sb.value;
	PlayerPrefs.SetInt("DrawPercentage",perc);
}