using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class venuCardboard : MonoBehaviour {

	public string MenuScene;

	// Use this for initialization
	void Start () {

		GetComponent<Cardboard>().OnBackButton += ()=>{SceneManager.LoadScene(MenuScene); };
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
