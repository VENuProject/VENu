#pragma strict

import System.IO;
import UnityEngine.WWW;
import UnityEngine.UI;

public var EventButton : GameObject;
public var ButtonsGroup : GameObject;

//public var electronPanel : GameObject;
//public var pi0Panel : GameObject;
//public var protonPanel : GameObject;
//public var muminusPanel : GameObject;
//public var gammaPanel : GameObject;

var url1 = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252Fprod";
var url2Array = new Array("_bnblike_electron", "_bnblike_pi0", "_bnblike_proton", "_bnblike_muminus", "_bnb_like_gamma");
var url3 = "_uboone%252F";
var url4Array = new Array("1691317_", "1691318_", "1831337_", "1695054_", "1831485_");
var url5Array = [[0,2,3,4,5], [0,1,2,3,4], [1,3,4,5,6], [0,1,3,4,5], [0,2,3,4,5]];
var url6 = "%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";
var buttons;

function Start () {
	
	for(var particle = 0; particle < url2Array.length; particle++){
        var partButtons = new Array();
		for(var event = 0; event < url5Array[particle].length; event++){
            partButtons.Push( url1 + url2Array[particle] + url3 + url4Array[particle] + url5Array[particle][event] + url6 );
		}
	}
}