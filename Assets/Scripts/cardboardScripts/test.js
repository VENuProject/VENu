#pragma strict

import System.IO;
import UnityEngine.WWW;
import UnityEngine.UI;
import UnityEngine.Sprite;


public var gameObj: GameObject;

function Start () {

Debug.Log("fileType is " + gameObj.GetComponent(localFileGathererCardboard).EventButton);

        var allComponents : Component[];
		allComponents = gameObj.GetComponents (Component);
		for (var component : Component in allComponents) {
			Debug.Log("the component type is " + component.GetType());
			if(component.GetType()==localFileGathererCardboard)
			Debug.Log("OK! ");
			Debug.Log("fileType is " + gameObj.GetComponent(localFileGathererCardboard).EventButton);
		}

}

function Eccoci() {
  Debug.Log("Eccoci! ");
}

function Update () {

}