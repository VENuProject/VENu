// facebookApp.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk

using UnityEngine;
using System.Collections;
using System.Collections.Generic;

using Facebook.Unity;


public class facebookApp : MonoBehaviour {

	void Awake () {

		if (!FB.IsInitialized) {
			// Initialize the Facebook SDK
			FB.Init(InitCallback, OnHideUnity);
		} else {
			// Already initialized, signal an app activation App Event
			FB.ActivateApp();
		}

	}

	private void InitCallback ()
	{
		if (FB.IsInitialized) {
			// Signal an app activation App Event
			FB.ActivateApp();
			// Continue with Facebook SDK
			// ...
		} else {
			Debug.Log("Failed to Initialize the Facebook SDK");
		}
	}

	private void OnHideUnity (bool isGameShown)
	{
		if (!isGameShown) {
			// Pause the game - we will need to hide
			Time.timeScale = 0;
		} else {
			// Resume the game - we're getting focus again
			Time.timeScale = 1;
		}
	}
		
	public void ShareToFacebook() {

		// Facebook Login
		List<string> perms = new List<string>(){"public_profile", "email", "user_friends"};
		FB.LogInWithReadPermissions(perms, AuthCallback);

		// Facebook Sharing
		FB.ShareLink(
			contentURL:         new System.Uri ("http://www2.physics.ox.ac.uk"),
			contentTitle:       "I just fund all the neutrino events in VENu!",
			contentDescription: "VENu helped me learn about neutrino physics.",
			//photoURL:           new System.Uri ("http://www2.physics.ox.ac.uk"),
			callback:           ShareCallback
		);
		/*FB.FeedShare(
			toId: "",
			link: new System.Uri ("http://www2.physics.ox.ac.uk"),
			linkName: "Oxford Physics",
			linkCaption: "University of Oxford - Physics Department",
			linkDescription: "VENu is great!",
			picture: new System.Uri ("https://example.com/myapp/assets/1/larch.jpg"),
			mediaSource: "",
			callback: ShareCallback
		);*/

	}

	private void AuthCallback (ILoginResult result) {
		if (FB.IsLoggedIn) {
			// AccessToken class will have session details
			var aToken = Facebook.Unity.AccessToken.CurrentAccessToken;
			// Print current access token's User ID
			Debug.Log(aToken.UserId);
			// Print current access token's granted permissions
			foreach (string perm in aToken.Permissions) {
				Debug.Log(perm);
			}
		} else {
			Debug.Log("User cancelled login");
		}
	}

	private void ShareCallback (IShareResult result) {
		if (result.Cancelled || !System.String.IsNullOrEmpty(result.Error)) {
			Debug.Log("ShareLink Error: "+result.Error);
		} else if (!System.String.IsNullOrEmpty(result.PostId)) {
			// Print post identifier of the shared content
			Debug.Log(result.PostId);
		} else {
			// Share succeeded without postID
			Debug.Log("ShareLink success!");
		}
	}


	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
