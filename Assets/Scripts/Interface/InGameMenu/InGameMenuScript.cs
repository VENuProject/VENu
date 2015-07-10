﻿using UnityEngine;
using System.Collections;

public class InGameMenuScript: MonoBehaviour {

	private bool menuOut = false;
	public Animator anim;

	void Start () {
		//anim.enabled = true;
	}

	void Update () {
		
	}

	void SlideMenu() {
		if (!menuOut)
			anim.Play("InGameMenuSlideIn");
		else 
			anim.Play("InGameMenuSlideOut");
		menuOut = !menuOut;

	}
}