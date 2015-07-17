using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System.Collections.Generic;




public class Tooltip : MonoBehaviour {

	public Text c1;
	public Text c2;
	public Text c3;

	public struct values {
		public string name;
		public float phi;
		public float theta;
		public float length;
		public float range;
		public float pida;
		public float idtruth;
		public float origin;
		public float nhits;
	}


	void Start () {

		gameObject.SetActive(false);

	}
	

	void Update () {

	}

	public void DispText(values v){
		c1.text = v.name + "\n" + "Phi: " + v.phi;
		gameObject.SetActive(true);

	}

	public void Hide(){
		gameObject.SetActive(false);
	}
}
