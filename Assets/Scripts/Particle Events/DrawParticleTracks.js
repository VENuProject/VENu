//Script for drawing sprites

#pragma strict

import SimpleJSON;
import System.IO;
import System.Linq;

var dot : GameObject;
var fileName : String;
private var m_InGameLog = "";
private var m_Position = Vector2.zero;

//Stores the GameObjects associated with each point and their track numbers
//Global in scope so it can be used by update functions
var trackPointArray : Array = new Array();
 
//Custom object for storing properties of track points
//class trackPoint {
  //  public var trackNum : int;
  //  public var obj : GameObject;
  //  public function trackPoint(n : int, o : GameObject) {
   //     trackNum = n;
   //     obj = o;
   // }
//}

function P(aText : String) {
    m_InGameLog += aText + "\n";
}

//Returns the magnitude of "uncollinearity" -> 0.0 is perfectly collinear
function Collinear(pt1 : Vector3, pt2 : Vector3, pt3: Vector3) {
    //Determine if the points are collinear using Magnitude(AB x AC) = 0 => Collinear
    var side1 = pt2 - pt1; //AB
    var side2 = pt3 - pt1; //AC

    var crossprod = Vector3.Cross(side1, side2); // AB x AC
     
    return Vector3.Distance(crossprod,Vector3.zero);  // Magnitude(AB x AC)         
}

//Places a sprite at pt1
function PlacePoint(pt1 : Vector3) {
    var clone : GameObject;
    clone = Instantiate(dot, transform.position, transform.rotation);
    clone.transform.position = transform.position + pt1;
    clone.transform.localScale = Vector3(0.1,0.1,0.1);
}

function Draw() {
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

    //--------------Parameters--------------
    //Stores the name of the tracking algorithm to use
    var trackAlgoName : String = "recob::Tracks_trackkalsps__Reco3D";

    //This number determines how "uncollinear" points are allowed to be (smaller => more points)
    var threshold : float = 0.005;
    //--------------Parameters--------------


    //--------------Storage Variables--------------
    //Stores the JSON data
    var N = JSONNode.Parse(jsonString);

    //Get the total number of tracks
    var totalTracks : int = N["record"]["tracks"][trackAlgoName].Count;

    //Stores the number of points actually drawn
    var drawnPoints : int = 0;
    //--------------Storage Variables--------------


    //--------------In-Game Log Output--------------
    P("The event number is: " + N["record"]["header"]["event"].ToString(""));
    P("Total Tracks: " + totalTracks);
    //--------------In-Game Log Output--------------

    //Loop over tracks: Decide which points to draw, then draw points and connection lines.
    for (var trackIndex : int = 0; trackIndex < totalTracks; trackIndex++) {   
        //Stores the points to be drawn
        var spacePointsArray : Array = new Array();
        
        var trackObject = new GameObject();
        //Put this object at the origin so components are easy to add
        trackObject.transform.position = Vector3.zero;
        trackObject.transform.rotation = Quaternion.identity;
        trackObject.name = "track" + trackIndex.ToString();
        trackObject.tag = "track";
        
        //Add the linerenderer to this object
        var lr : LineRenderer = trackObject.AddComponent.<LineRenderer>();
        lr.castShadows = false;
        lr.useWorldSpace = true; //Don't set 0,0 to the parent GameObject's position
        lr.material = new Material(Shader.Find("Mobile/Particles/Additive"));
        lr.SetWidth(0.1, 0.1);
        lr.SetColors(Color.blue, Color.blue); 
        lr.SetVertexCount(1);
          
        //Loop over points in the track, define the first two points outside the loop as initial conditions
        var totalPoints : int = N["record"]["tracks"][trackAlgoName][trackIndex]["points"].Count;

        var pt1 : Vector3 = Vector3(
            0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0][0].AsFloat,  //x
            0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0][1].AsFloat,  //y
           -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0][2].AsFloat); //z
        var pt2 : Vector3 = Vector3(
            0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1][0].AsFloat,
            0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1][1].AsFloat,
           -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1][2].AsFloat);


        
        //Always draw the first spacepoint
        spacePointsArray.Push(pt1); 
        lr.SetPosition(0, transform.position + pt1);

        //Loop over the remaining points in the track
        for (var spacePointIndex : int = 2; spacePointIndex < totalPoints; spacePointIndex++) {
            var vec : Vector3 = Vector3(
                0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][0].AsFloat,
                0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][1].AsFloat,
               -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][2].AsFloat);

            //If the next point is collinear, move the current endpoint to the new point without drawing anything
            //Also always draw the final point.
            if (Collinear(pt1, pt2, vec) <= threshold && spacePointIndex != totalPoints - 1) {
                pt2 = vec;
            }
            else {
                spacePointsArray.Push(pt2);
               
                //Add the next segment to the line renderer
                lr.SetVertexCount(spacePointsArray.length);
                lr.SetPosition(spacePointsArray.length - 1, transform.position + pt2);
                   
                //Add a box collider around the current segment
                //Box colliders can't be rotated, so must add it to a rotated child object
                var segmentObject = new GameObject();
                //Add clicking script for selecting tracks
                segmentObject.AddComponent(trackClick); 
                segmentObject.name = "segment" + (spacePointsArray.length - 2).ToString();
                segmentObject.transform.parent = trackObject.transform;
                
                //Put this child object at the midpoint between the current two points
                segmentObject.transform.position = (transform.position + pt1 + transform.position + pt2) / 2.0;
                var bc : BoxCollider;           
                var boxColliderOffset : float = 0.4; //height and width of box collider
                bc = segmentObject.AddComponent.<BoxCollider>();
                bc.transform.LookAt(transform.position + pt2);
                bc.center = Vector3.zero;
                bc.size.z = Vector3.Distance(pt1, pt2); //z is forward vector
                bc.size.x = boxColliderOffset;
                bc.size.y = boxColliderOffset;
                
                pt1 = pt2;
                pt2 = vec;
            }
        }
        
        drawnPoints += spacePointsArray.Count;

    } //End loop over tracks 
    P("Drawn Points: " + drawnPoints);
} //End Draw()

function Awake() {
    if(PlayerPrefs.HasKey("File To Load") && PlayerPrefs.GetString("File To Load") != "") {
        fileName = PlayerPrefs.GetString("File To Load");
    }
    else {
        Debug.Log("<color=orange>PlayerPrefs not Initialized. Using default event.</color>");
        fileName = "complicated_event.json";
    }
}
function Start() {
    Draw(); 
}

function OnGUI() {
    m_Position = GUILayout.BeginScrollView(m_Position);
    GUILayout.Label(m_InGameLog);
    GUILayout.EndScrollView();
}
