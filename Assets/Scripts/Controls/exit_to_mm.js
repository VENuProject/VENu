#pragma strict
	// Quits the player when the user hits escape
	function Update () {
		if (Input.GetKey ("escape")) {
			Application.LoadLevel("Main_Menu");
		}
	}