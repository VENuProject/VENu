using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;
using System.Collections.Generic;

public class mytest : MonoBehaviour {

	// Use this for initialization
	void Start () {

		//launchOnboardingDialog ();
		Cardboard cardbd = new Cardboard ();
		cardbd.ShowSettingsDialog ();
	    //CardboardiOSDevice cardboardiOS  = new CardboardiOSDevice();
		//cardboardiOS.DoOnboardingDialog();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	//[DllImport("__Internal")]
	//private static extern void launchOnboardingDialog();
}


