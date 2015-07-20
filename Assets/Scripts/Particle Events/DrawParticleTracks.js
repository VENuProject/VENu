//Script for drawing tracks
//    Call filterJSON to create a point array from a parsed JSON string,
//    this calls drawTracksFromArray() for each track filetered.

#pragma strict

import SimpleJSON;
import System.IO;
import System.Linq;

var dot : GameObject;
var fileName : String;
private var m_InGameLog = "";
private var m_Position = Vector2.zero;

function P(aText : String) {
    m_InGameLog += aText + "\n";
}


function PlacePoint(pt1 : Vector3) {
    var clone : GameObject;
    clone = Instantiate(dot, transform.position, transform.rotation);
    clone.transform.position = transform.position + pt1;
    clone.transform.localScale = Vector3(0.1,0.1,0.1);
}

//Returns the magnitude of "uncollinearity" (0 is perfectly collinear)
function Collinear(pt1 : Vector3, pt2 : Vector3, pt3: Vector3) {
    //Determine if the points are collinear using Magnitude(AB x AC) = 0 => Collinear
    var side1 = pt2 - pt1; //AB
    var side2 = pt3 - pt1; //AC

    var crossprod = Vector3.Cross(side1, side2); // AB x AC
     
    return Vector3.Distance(crossprod,Vector3.zero);  // Magnitude(AB x AC)         
}

function filterJSON(N : JSONNode, threshold : double, trackAlgoName : String) {
    //Stores the final number of points in the array
    var drawnPoints : int = 0;
    var totalTracks : int = N["record"]["tracks"][trackAlgoName].Count;
    
    //Loop over tracks: Decide which points to draw, then draw points and connection lines.
    for (var trackIndex : int = 0; trackIndex < totalTracks; trackIndex++) {   
        //Stores the points to be drawn
        var spacePointsArray : Array = new Array();
          
/*
        for(var key : int = 0; key < N["record"]["spacepoints"]["recob::SpacePoints_cluster3d__RecoStage1"].Count; key++){
	        var clone : GameObject;
	 	    clone = Instantiate(dot , transform.position, transform.rotation);
    	    clone.transform.position = transform.position + Vector3(0.1*N["record"]["spacepoints"]["recob::SpacePoints_cluster3d__RecoStage1"][key]["xyz"][0].AsFloat,
    	                                                            0.1*N["record"]["spacepoints"]["recob::SpacePoints_cluster3d__RecoStage1"][key]["xyz"][1].AsFloat,
    	                                                           -0.1*N["record"]["spacepoints"]["recob::SpacePoints_cluster3d__RecoStage1"][key]["xyz"][2].AsFloat);
    	    clone.transform.localScale = Vector3(0.05,0.05,0.05);  
        }
*/
          
        //Loop over points in the track, define the first two points outside the loop as initial conditions
        var totalPoints : int = N["record"]["tracks"][trackAlgoName][trackIndex]["points"].Count;

        var pt1 : Vector3 = Vector3(
            0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0][0].AsFloat,
            0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0][1].AsFloat,
           -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0][2].AsFloat);
        var pt2 : Vector3 = Vector3(
            0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1][0].AsFloat,
            0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1][1].AsFloat,
           -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1][2].AsFloat);
              
        //Always include the first point
        spacePointsArray.Push(pt1); 
   
        //Loop over the remaining points in the track
        for (var spacePointIndex : int = 2; spacePointIndex < totalPoints; spacePointIndex++) {
            var vec : Vector3 = Vector3(
                0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][0].AsFloat,
                0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][1].AsFloat,
               -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][2].AsFloat);

            //If the next point is collinear, move the current endpoint to the new point without drawing anything
            //Also always include the final point.
            if (Collinear(pt1, pt2, vec) <= threshold && spacePointIndex != totalPoints - 1) {
                pt2 = vec;
            }
            else {
                spacePointsArray.Push(pt2);
                pt1 = pt2;
                pt2 = vec;
            }
        }
        drawTracksFromArray(trackIndex, spacePointsArray);
        drawnPoints += spacePointsArray.length;
    }
    //P("Drawn Points: " + drawnPoints);
}

function drawTracksFromArray(index : int, arr : Array) {
    //Create a gameobject to hold box collider children and a line renderer
    var trackObject = new GameObject();
    trackObject.transform.position = Vector3.zero; 
    trackObject.transform.rotation = Quaternion.identity;
    trackObject.name = "track" + index;
    trackObject.tag = "track";
           
    //Add the linerenderer to the object
    var lr : LineRenderer = trackObject.AddComponent.<LineRenderer>();
    lr.castShadows = false;
    lr.useWorldSpace = true; //Don't set 0,0 to the parent GameObject's position
    lr.material = new Material(Shader.Find("Mobile/Particles/Additive"));
    lr.SetWidth(0.1, 0.1);
    lr.SetColors(Color.cyan, Color.cyan); 
    
    var pt0 : Vector3 = arr[0];
    
    lr.SetVertexCount(arr.length);
    lr.SetPosition(0, transform.position + pt0);
    PlacePoint(pt0);
    for (var i : int = 1; i < arr.length; i++) {
        var pt1 : Vector3 = arr[i - 1];
        var pt2 : Vector3 = arr[i];
        lr.SetPosition(i,  transform.position + pt2);
        PlacePoint(pt1);
        
        //Make a game object for each segment to store on-click behavior and a box collider
        //Put this child object at the midpoint between the current two points
        var segmentObject = new GameObject();
        segmentObject.layer = 11;
        segmentObject.AddComponent(trackClick); 
        segmentObject.name = "segment" + i;
        segmentObject.transform.parent = trackObject.transform;
        segmentObject.transform.position = (transform.position + pt1 + transform.position + pt2) / 2.0;
        
        var bc : BoxCollider;
//        bc.isTrigger = true;  
        var boxColliderOffset : float = 0.4; //height and width of box collider
        bc = segmentObject.AddComponent.<BoxCollider>();
        bc.transform.LookAt(transform.position + pt2);
        bc.center = Vector3.zero;
        bc.size.z = Vector3.Distance(pt1, pt2); //z is forward vector
        bc.size.x = boxColliderOffset;
        bc.size.y = boxColliderOffset;
    }
}

function Awake() {
    if(PlayerPrefs.HasKey("File To Load") && PlayerPrefs.GetString("File To Load") != "") {
        fileName = PlayerPrefs.GetString("File To Load");
    }
    else {
        Debug.Log("<color=purple>PlayerPrefs not Initialized. Using default event.</color>");
        fileName = "prod_eminus_0.1-2.0GeV_isotropic.json";
    }
}

function Start() {
    //Read in from a file (different paths for different platforms)
    var jsonString="";

    if (Application.platform == RuntimePlatform.Android) {
        var url="jar:file://" + Application.dataPath + "!/assets/" + fileName;
        var www : WWW = new WWW(url);
        yield www;
        jsonString = www.text;
    }
    else {
        var sr = new StreamReader(Application.streamingAssetsPath  + "/" + fileName);
        jsonString = sr.ReadToEnd();
        sr.Close();
    }
    
    //Filter and draw the tracks from the JSON file.
    //Parameter 2 is the filter threshold, and parameter 3 is the algorithm name found in the JSON file.
    filterJSON(JSONNode.Parse(jsonString), -1, "recob::Tracks_cctrack__RecoStage1");
}

function OnGUI() {
    m_Position = GUILayout.BeginScrollView(m_Position);
    GUILayout.Label(m_InGameLog);
    GUILayout.EndScrollView();
}
