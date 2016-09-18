using UnityEngine;
using System.Collections;

public class feedbackApp : MonoBehaviour {

	// Use this for initialization
	void Start () {
		SendEmail ();
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void SendEmail() {
		StartCoroutine(SendEmailMain()); // need to start a coroutine to use WaitForSeconds.
	}

	IEnumerator SendEmailMain() {
		yield return new WaitForSeconds(2);
		string email = "marco.deltutto@physics.ox.ac.uk";
		string subject = MyEscapeURL("VENu Feedback");
		string body = MyEscapeURL("Please write your feedback here.\r\nThank you,\nThe VENu Team");
		Application.OpenURL("mailto:" + email + "?subject=" + subject + "&body=" + body);
	}

	string MyEscapeURL(string url) {
		return WWW.EscapeURL(url).Replace("+","%20");
	}
}
