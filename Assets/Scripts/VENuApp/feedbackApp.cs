using UnityEngine;
using System.Collections;

public class feedbackApp : MonoBehaviour {

	[Tooltip("Seconds to wait before action is taken")]
	public int secondsToWait;

	[Tooltip("Will open a blank email to be sent to the team")]
	public bool openEmail;

	[Tooltip("Will open the contact form in a web-page")]
	public bool openContactForm;

	// Use this for initialization
	void Start () {

		if (openEmail && openContactForm) {
			Debug.LogError ("Only one choice between openEmail and openContactForm is permitted.");
			return;
		}

		if (openEmail)
			SendEmail ();

		if (openContactForm)
			OpenContactForm ();
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void SendEmail() {
		StartCoroutine(SendEmailMain()); // need to start a coroutine to use WaitForSeconds.
	}

	IEnumerator SendEmailMain() {
		yield return new WaitForSeconds(secondsToWait);
		string email = "venu.developers@physics.ox.ac.uk";
		string subject = MyEscapeURL("VENu Feedback");
		string body = MyEscapeURL("Please write your feedback here.\r\nThank you,\nThe VENu Team");
		Application.OpenURL("mailto:" + email + "?subject=" + subject + "&body=" + body);
	}

	string MyEscapeURL(string url) {
		return WWW.EscapeURL(url).Replace("+","%20");
	}


	void OpenContactForm () {
		StartCoroutine (OpenContactFormMain());
	}

	IEnumerator OpenContactFormMain(){
		yield return new WaitForSeconds(secondsToWait);
		Debug.Log ("Opening URL...");
		Application.OpenURL("http://venu.physics.ox.ac.uk");
		Debug.Log ("URL opend");
	}
}
