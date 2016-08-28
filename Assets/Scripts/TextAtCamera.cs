//Created by Oliver Lykken'
//This script allows the info canvases to face the player while thye are active

using UnityEngine;
using System.Collections;

public class TextAtCamera : MonoBehaviour {

    public GameObject[] infoCanvases;
    public Transform camera;

    // Use this for initialization
    void Start()
    {
        camera = Camera.main.transform;
    }

    // Update is called once per frame
    void Update()
    {
        infoCanvases = GameObject.FindGameObjectsWithTag("InfoCanvas");
        foreach (GameObject infoCanvas in infoCanvases)
        {
            infoCanvas.transform.LookAt(camera.position);
            infoCanvas.transform.Rotate(0.0f, 180.0f, 0.0f);
        }
    }
}
