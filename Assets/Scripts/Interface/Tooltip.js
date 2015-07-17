#pragma strict

import UnityEngine.UI;


public class values {
	public var name : String;
	public var phi : float;
	public var theta : float;
	public var length : float;
	public var range : float;
	public var pida : float;
	public var idtruth : float;
	public var origin : float;
	public var nhits : float;
	
	public function values(name:String, phi:float, theta:float, length:float, 
			range:float, pida:float, idtruth:float, origin:float, nhits:float){
		this.name = name;
		this.phi = phi;
		this.theta = theta;
		this.length = length;
		this.range = range;
		this.pida = pida;
		this.idtruth = idtruth;
		this.origin = origin;
		this.nhits = nhits;
	}
}

public var title : UI.Text;
public var c1 : UI.Text;
public var c2 : UI.Text;
public var c3 : UI.Text;

function Start () {
	gameObject.SetActive(false);
	var testvals = new values("testing", 1, 2, 3, 4, 5, 6, 7, 8);
	DispText(testvals);
}

public function DispText(v : values){
	title.text = v.name;
	c1.text = "Phi: " + v.phi + "\n" + "Theta: " + v.theta;
	c2.text = "Length: " + v.length + "\n" + "Range: " + v.range + "\n" + "PIDA: " + v.pida;
	c3.text = "IDTruth: " + v.idtruth + "\n" + "Origin: " + v.origin + "\n" + "NHits: " + v.nhits;
	gameObject.SetActive(true);
}

public function Hide(){
	gameObject.SetActive(false);
}