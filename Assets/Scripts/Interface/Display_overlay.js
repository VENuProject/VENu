 #pragma strict
 
 private var rect : Rect;
 var image : Texture2D;
 
 function Update () 
 {
     rect = new Rect(0, 0, Screen.width, Screen.height);
 }
 
 function OnGUI()
 {
    GUI.DrawTexture(rect, image, ScaleMode.ScaleAndCrop);
 }