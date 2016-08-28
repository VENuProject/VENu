// Created by Oliver Lykken
// This script allows the informational text to be desplayed when a player looks at part of the detector.
// It is attached to a cube that's a child of the center eye anchor in the OVR Player controller

using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using System.Collections;

public class CrosshairRaycast : MonoBehaviour
{

    Ray ray;
    RaycastHit hit;
    public OVRCameraRig ocamera;
    Transform ctransform;
    private bool isInfo = false;
    private GameObject target;
    private string currentTag;
    public GameObject[] allInfos;
    private GameObject info;

    public float flipTime = 2.0f;
    private float countDown;

    public Material highlight;
    private Material mat;
    private Renderer rend;

    // Use this for initialization
    void Start()
    {
        countDown = flipTime;
    }

    // Update is called once per frame
    void Update()
    {
        Vector3 cameraPosition = ocamera.centerEyeAnchor.position;
        Vector3 cameraForward = ocamera.centerEyeAnchor.forward;

        ray = new Ray(cameraPosition, cameraForward);
        Debug.DrawRay(cameraPosition, cameraForward, Color.blue, 3);

        if (Physics.Raycast(cameraPosition, cameraForward, out hit, 15.0f))
        {
            target = hit.collider.gameObject;
            rend = target.GetComponent<Renderer>();
            info = target.transform.Find("InfoCanvas").gameObject;
            mat = rend.material;
            Debug.Log("current material is: " + mat);
            if (info != null)
            {
                ShowInfo();
                rend.material = highlight;
                Debug.Log("current material is, post Glow: " + rend.material);
                countDown = flipTime;
                Debug.Log("Found an object with tag " + target.tag + " at distance: " + hit.distance);
            }
        }

        if ((hit.collider == null || target.tag != currentTag) && isInfo)
        {
            Debug.Log("Found new target tag " + target.tag + " replacing current tag " + currentTag);
            HideInfo();
            rend.material = mat;
        }

//<<<<<<< Updated upstream
//=======
      /*  if (rend.material != highlight)
        {
            mat = rend.material;
            Debug.Log("current material is: " + mat);
            rend.material = highlight;
            Debug.Log("current material is, post Glow: " + mat);
        }
        if (rend.material == highlight)
        {
            rend.material = mat;
        } */
//>>>>>>> Stashed changes
    }

    private void HideInfo()
    {
        isInfo = false;
        info.GetComponent<Canvas>().enabled = false;
        info.SetActive(false);
    }

    private void ShowInfo()
    {
        isInfo = true;
        info.GetComponent<Canvas>().enabled = true;
        info.SetActive(true);
        currentTag = target.tag;
    }

    private void Glow()
    {
        mat = rend.material;
        while (info.GetComponent<Canvas>().enabled == true) {
            rend.material = highlight;
        }
        Debug.Log("the current mat is" + mat);
    }

    private void NoGlow()
    {
        rend.material = mat;
    }
}

