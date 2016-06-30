//Script for drawing tracks
//    Call filterJSON to create a point array from a parsed JSON string,
//    this calls drawTracksFromArray() for each track filetered.
//Written by Thomas Wester

#pragma strict

import SimpleJSON;
import System.IO;
import System.Linq;

var dot : GameObject;
var fileName : String;
private var m_InGameLog = "";
private var m_Position = Vector2.zero;
var trackAlgoName : String;
public var tooltip : GameObject;
public var trackParent : GameObject;

function P(aText : String) {
    m_InGameLog += aText + "\n";
}

function PlacePoint(pt1 : Vector3) {
    var clone : GameObject;
    clone = Instantiate(dot, transform.position, transform.rotation);
    clone.transform.position = transform.position + pt1;
    clone.transform.localScale = Vector3(0.005,0.005,0.005);
    clone.transform.SetParent(trackParent.transform);
    Debug.Log("<color=purple>Place dot called </color>");
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
    Debug.Log("<color=purple>Got to here at least 4 </color>");
    var drawnPoints : int = 0;
    Debug.Log("<color=purple>BEFORE trackAlgoName: </color> " + trackAlgoName);
    trackAlgoName = "recob::Tracks_pandoraCosmicKHit__RecoStage2";
    Debug.Log("<color=purple>AFTER MANUAL SET UP trackAlgoName: </color> " + trackAlgoName);
    var totalTracks : int = N["record"]["tracks"][trackAlgoName].Count;
    Debug.Log("<color=purple>Number of tracks: </color> " + totalTracks);
    
    //Loop over tracks: Decide which points to draw, then draw points and connection lines.
    for (var trackIndex : int = 0; trackIndex < totalTracks; trackIndex++) {   
        //Stores the endpoints of each track segment to be drawn
        var spacePointsArray : Array = new Array();
          
        //Loop over points in the track, define the first two points outside the loop as initial conditions
        var totalPoints : int = N["record"]["tracks"][trackAlgoName][trackIndex]["points"].Count;
        Debug.Log("<color=purple>Number of points: </color> " + totalPoints);

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
        //Default value is -1f, so the collinearity will never be checked (i.e., all points are drawn for each track)
        for (var spacePointIndex : int = 2; spacePointIndex < totalPoints; spacePointIndex++) {
            var vec : Vector3 = Vector3(
                0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][0].AsFloat,
                0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][1].AsFloat,
               -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex][2].AsFloat);

            //If the next point is collinear, move the current endpoint to the new point without drawing anything
            //Also always include the final point.
            if (Collinear(pt1, pt2, vec) <= threshold && spacePointIndex != totalPoints - 1) {
                Debug.Log("<color=purple>if (Collinear(pt1, pt2, vec) <= threshold && spacePointIndex != totalPoints - 1) {</color>");
                pt2 = vec;
            }
            else {
                if (spacePointIndex + 1 < totalPoints) {
                    Debug.Log("<color=purple>if (spacePointIndex + 1 < totalPoints) {</color>");
                    spacePointsArray.Push(pt2);
                }
                pt1 = pt2;
                pt2 = vec;
            }
        }
        
        //Always push the last point. There might be an off-by-one error here because I think it's possible for
        //this last point to get added twice because of the above loop. Not a huge problem though.
        spacePointsArray.Push(pt2);

        Debug.Log("<color=purple>Just before calling drawTracksFromArray.</color>");
        drawTracksFromArray(trackIndex, spacePointsArray);
        Debug.Log("<color=purple>Just after called drawTracksFromArray.</color>");
        drawnPoints += spacePointsArray.length;
    }
    Debug.Log("<color=purple>Got to here at least 5 </color>");
    //P("Drawn Points: " + drawnPoints); //For debugging. Shows the number of endpoints.
}

function drawTracksFromArray(index : int, arr : Array) {
    //Create a gameobject to hold box collider children and a line renderer
    Debug.Log("<color=purple>Got to here at least 6 </color>");
    var trackObject = new GameObject();
    trackObject.transform.position = Vector3.zero; 
    trackObject.transform.rotation = Quaternion.identity;
    trackObject.name = "track" + index;
    trackObject.tag = "track";
    trackObject.transform.parent = trackParent.transform;
           
    //Add the linerenderer to the object
    var lr : LineRenderer = trackObject.AddComponent.<LineRenderer>();
    lr.useWorldSpace = true; //Don't set 0,0 to the parent GameObject's position
    lr.material = new Material(Shader.Find("Mobile/Particles/Additive"));
    lr.SetWidth(0.05, 0.05);
    lr.SetColors(Color.cyan, Color.cyan); 
    lr.gameObject.layer = 11;

    var pt0 : Vector3 = arr[0];
    
    lr.SetVertexCount(arr.length);
    lr.SetPosition(0, transform.position + pt0);
    PlacePoint(pt0);
    for (var i : int = 1; i < arr.length; i++) {
        var pt1 : Vector3 = arr[i - 1];
        var pt2 : Vector3 = arr[i];
        lr.SetPosition(i,  transform.position + pt2);
        PlacePoint(pt2);
        
        //Make a game object for each segment to store on-click behavior and a box collider
        //Put this child object at the midpoint between the current two points
        var segmentObject = new GameObject();
        segmentObject.layer = 11;
        segmentObject.AddComponent(trackClick);
        segmentObject.SendMessage("SetTooltipRef", tooltip);
        //Wasn't able to get this working. Meant to scale collider boxes with camera distance.
        //segmentObject.AddComponent(ScaleColliderRelativeToCamera); 
        segmentObject.name = "segment" + i;
        segmentObject.transform.parent = trackObject.transform;
        segmentObject.transform.position = (transform.position + pt1 + transform.position + pt2) / 2.0;
        
        var bc : BoxCollider;
        var boxColliderOffset : float = 0.4; //height and width of box collider
        bc = segmentObject.AddComponent.<BoxCollider>();
        bc.transform.LookAt(transform.position + pt2);
        bc.center = Vector3.zero;
        bc.size.z = Vector3.Distance(pt1, pt2); //z is forward vector
        bc.size.x = boxColliderOffset;
        bc.size.y = boxColliderOffset;
    }
    Debug.Log("<color=purple>Got to here at least 7 </color>");
}

function Awake() {
	trackAlgoName = PlayerPrefs.GetString("trackAlgorithm");
	//-------------------------------------------------------
	//--- Loading/parsing is now handled by parseEvent.js ---
	//-------------------------------------------------------
}

function Start() {

}

public function toggleTracks(){
	if(trackParent.activeInHierarchy){
		trackParent.SetActive(false);
	}
	else{
		trackParent.SetActive(true);
	}
}

public function drawTracks(node : JSONNode){
    //Changing the second argument to a positive value forces tracks to only draw points deemed "uncollinear"
    //This was used when we tried to reduce the number of points drawn in tracks, but it really pales in 
    //in comparison to the number of spacepoints drawn, so we are just drawing all of the points in each track.
    Debug.Log("<color=purple>Got to here at least 3 </color>");
    filterJSON(node, -1f, trackAlgoName);
    Debug.Log("<color=purple>Got to here at least 8 </color>");
}

function OnGUI() {
    m_Position = GUILayout.BeginScrollView(m_Position);
    GUILayout.Label(m_InGameLog);
    GUILayout.EndScrollView();
}
