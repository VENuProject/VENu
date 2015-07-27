#pragma strict

import System.IO;
import UnityEngine.WWW;
import UnityEngine.UI;

public var EventButton : GameObject;
public var electronPanel : GameObject;
public var pi0Panel : GameObject;
public var protonPanel : GameObject;
public var muminusPanel : GameObject;
public var gammaPanel : GameObject;

var url1 = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252Fprod";
var url2Array = new Array("_bnblike_electron", "_bnblike_pi0", "_bnblike_proton", "_bnblike_muminus", "_bnb_like_gamma");
var url3 = "_uboone%252F";
var url4Array = new Array("1691317_", "1691318_", "1831337_", "1695054_", "1831485_");

function Start () {
	
	
	
	
	
}