#pragma strict

public var fadeSpeed : float = 1.5f;            // Speed that the screen fades to and from black.


private var sceneStarting : boolean = true;     // Whether or not the scene is still fading in.


function Awake ()
{
    // Set the texture so that it is the the size of the screen and covers it.
    GetComponent.<GUITexture>().pixelInset = new Rect(0f, 0f, Screen.width, Screen.height);
}


function Update ()
{
    // If the scene is starting...
    if(sceneStarting)
        // ... call the StartScene function.
        StartScene();
}


function FadeToClear ()
{
    // Lerp the colour of the texture between itself and transparent.
    GetComponent.<GUITexture>().color = Color.Lerp(GetComponent.<GUITexture>().color, Color.clear, fadeSpeed * Time.deltaTime);
}


function FadeToBlack ()
{
    // Lerp the colour of the texture between itself and black.
    GetComponent.<GUITexture>().color = Color.Lerp(GetComponent.<GUITexture>().color, Color.black, fadeSpeed * Time.deltaTime);
}


function StartScene ()
{
    // Fade the texture to clear.
    FadeToClear();
    
    // If the texture is almost clear...
    if(GetComponent.<GUITexture>().color.a <= 0.05f)
    {
        // ... set the colour to clear and disable the GUITexture.
        GetComponent.<GUITexture>().color = Color.clear;
        GetComponent.<GUITexture>().enabled = false;
        
        // The scene is no longer starting.
        sceneStarting = false;
    }
}


public function EndScene ()
{
    // Make sure the texture is enabled.
    GetComponent.<GUITexture>().enabled = true;
    
    // Start fading towards black.
    FadeToBlack();
    
    // If the screen is almost black...
    if(GetComponent.<GUITexture>().color.a >= 0.95f)
        // ... reload the level.
        Application.LoadLevel(0);
}