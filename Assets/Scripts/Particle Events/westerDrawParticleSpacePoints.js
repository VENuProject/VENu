//Script for drawing sprites

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

//Returns the magnitude of "uncollinearity" -> 0.0 is perfectly collinear
function Collinear(pt1 : Vector3, pt2 : Vector3, pt3: Vector3) {
    //Determine if the points are collinear using Magnitude(AB x AC) = 0 => Collinear
    var side1 = pt2 - pt1; //AB
    var side2 = pt3 - pt1; //AC

    var crossprod = Vector3.Cross(side1, side2); // AB x AC
    var dist = Vector3.Distance(crossprod,Vector3.zero);  // Magnitude(AB x AC)

    return dist;         
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
    //Determines whether collinear points are skipped for redundancy (true) or if all points are drawn (false)
    var checkCollinear : boolean = true;

    //Choose to draw the particle sprites (true) or not (false)
    var drawParticleSprites : boolean = false;

    //Stores the name of the tracking algorithm to use
    var trackAlgoName : String = "recob::Tracks_costrkcc__Reco3D";

    //This number determines how "uncollinear" points are allowed to be (smaller => more points)
    var threshold : float = 0.01;
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
    P("The event number is: ");
    P(N["record"]["header"]["event"].ToString(""));

    P("The first wire is: ");
    P(N["record"]["hits"]["recob::Hits_cccluster__Reco2D"][0]["wire"].ToString(""));

    //Print the total number of tracks
    P("Total Tracks: " + totalTracks);
    //--------------In-Game Log Output--------------

    //Loop over tracks: Decide which points to draw, then draw points and connection lines.
    for (var trackIndex : int = 0; trackIndex < totalTracks; trackIndex++) {   
        //Create a line renderer for each track

        var nil = new GameObject();
        var lr : LineRenderer;
        nil.AddComponent.<LineRenderer>();
        lr = nil.GetComponent.<LineRenderer>();
        lr.useWorldSpace = false;
        lr.material = new Material (Shader.Find("Particles/Additive"));
        lr.SetWidth(0.1, 0.1);
        lr.SetColors(Color.cyan, Color.green);

        //Stores the points to be drawn
        var spacePointsArray : Array = new Array();

        //Loop over points in the track, define the first two points outside the loop as initial conditions
        var totalPoints : int = N["record"]["tracks"][trackAlgoName][trackIndex]["points"].Count;

        var pt1 : Vector3 = Vector3(0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0][0].AsFloat,  //x
                                    0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0][1].AsFloat,  //y
                                   -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0][2].AsFloat); //z
        var pt2 : Vector3 = Vector3(0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1][0].AsFloat,
                                    0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1][1].AsFloat,
                                   -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1][2].AsFloat);

        //Always draw the first spacepoint
        spacePointsArray.Push(pt1);

        //Draw the second point too if the collinearity algorithm is turned off
        if (!checkCollinear) {
            spacePointsArray.Push(pt2);
        }

        //Loop over the remaining points in the track
        for (var spacePointIndex : int = 2; spacePointIndex < totalPoints; spacePointIndex++) {
            var vec : Vector3 = Vector3(
                0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][0].AsFloat,
                0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][1].AsFloat,
               -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][2].AsFloat);

            //Run the collinear algorithm if the boolean is set to 'true'
            if (checkCollinear) {
                //If the next point is collinear, move the current endpoint to the new point without drawing anything
                if (Collinear(pt1, pt2, vec) <= threshold) {
                    pt2 = vec;
                }
                else {
                    spacePointsArray.Push(pt2);
                    pt1 = pt2;
                    pt2 = vec;
                }
            }
            //...Otherwise add every point to the array
            else {
                spacePointsArray.Push(vec);
            }
        }

        //Ensure that the end point of each trail gets drawn (only relevant for collinearity algorithm)
        if (checkCollinear) {
            spacePointsArray.Push(pt2);
        }
        
        //Ensure the line renderer expects the correct amount of points 
        lr.SetVertexCount(spacePointsArray.Count);
        drawnPoints += spacePointsArray.Count;
        
        //Draw all lines and points stored in the space point array
        for (var drawPointIndex : int = 0; drawPointIndex < spacePointsArray.Count; drawPointIndex++) {
            var pt : Vector3 = spacePointsArray[drawPointIndex];
            if (drawParticleSprites) {
                PlacePoint(pt);
            }
            lr.SetPosition(drawPointIndex, transform.position + pt);
        } 
    } //End loop over tracks 
    P("Drawn Points: " + drawnPoints);
} //End Draw()

function Awake() {
    if(PlayerPrefs.HasKey("File To Load")) {
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
