// prefabMaker.cs
//
// created by Marco Del Tutto, marco.deltutto@physics.ox.ac.uk
//
// adapted from drawTracks.js by Thomas Wester
//
// Info: attach this script to the wirePlane prefab inside TPC10. 
//       Toggle it off once done, so you don't generate prefabs everytime. 
//       Prefabs will be saved in the Resources directory.

#pragma strict

import UnityEngine;
import System.Collections;
import System.IO;
import SimpleJSON;

#if UNITY_EDITOR
import UnityEditor;
#endif

@Tooltip("The red scaling dot.")
var dot : GameObject;
@Tooltip("Select this if you want to make prefabs out of reconstructed tracks.")
var makeTracks : boolean;
@Tooltip("Select this if you want to make prefabs out of space points.")
var makeSpacePoints : boolean;
@Tooltip("Sets the maximum number of points used for the prefab, only if you are in makeSpacePoints option.")
var maxPoints : float;



//Returns the magnitude of "uncollinearity" (0 is perfectly collinear)
function Collinear(pt1 : Vector3, pt2 : Vector3, pt3: Vector3) {
  //Determine if the points are collinear using Magnitude(AB x AC) = 0 => Collinear
  var side1 = pt2 - pt1; //AB
  var side2 = pt3 - pt1; //AC
  
  var crossprod = Vector3.Cross(side1, side2); // AB x AC
  
  return Vector3.Distance(crossprod,Vector3.zero);  // Magnitude(AB x AC)
}


function Start () {
  
  var emptyObj: Object;
  
  #if UNITY_EDITOR
    
    
  // ***********************
  // Get the files
  // ***********************
  var jsonFilesPath = Application.dataPath + "/StreamingAssets";
  var dir : DirectoryInfo = new DirectoryInfo(jsonFilesPath);
  var filesInfo = dir.GetFiles("prodgenie_bnb_nu_cosmic_uboone_*.json");
  Debug.Log("Found " + filesInfo.Length + " json prodgenie bnb+cosmics files");

  // ***********************
  // File loop
  // ***********************
  for (var i : int = 0; i < filesInfo.Length; i++) {
    Debug.Log("File name " + filesInfo[i].Name + ".");
    var filePath = jsonFilesPath + "/" + filesInfo[i].Name;
    Debug.Log("filePath " + filePath + ".");
    var sr = new StreamReader(filePath);
    var jsonString = sr.ReadToEnd();
    sr.Close();
    
    var N = JSONNode.Parse(jsonString);


    // ***********************
    // Working with spacePoints
    // ***********************
    var spacePointParent : GameObject = new GameObject();
    if(makeSpacePoints) {

      var spacePointAlgoName : String = "recob::SpacePoints_pandoraCosmic__DataApr2016RecoStage2";//"recob::SpacePoints_trackkalmanhit__RecoStage2";

      //var spacePointsArray = new Array ();
      var totalPts = N["record"]["spacepoints"][spacePointAlgoName].Count;
      Debug.Log("totalPts is " + totalPts + ".");


      //Calculate the proper iterator so that certain points can be skipped (for performance reasons)
      var iter : float = totalPts / maxPoints;
    
      //If the event has fewer points than the maximum number allowed, draw all of them.
      if (iter < 1.0) {
          iter = 1.0;
      }

      for(var key : float = 0.0; key < totalPts; key += iter){
	    var clone : GameObject;
	    
	    //Round the loop variable here (to get an index) to minimize rounding error in the loop.
	    var roundKey : int = Mathf.Round(key);
	    
	 	clone = Instantiate(dot , transform.position, transform.rotation);
    	clone.transform.position = transform.position + Vector3(
    	    0.1*N["record"]["spacepoints"][spacePointAlgoName][roundKey]["xyz"]["x"].AsFloat,
    	    0.1*N["record"]["spacepoints"][spacePointAlgoName][roundKey]["xyz"]["y"].AsFloat,
           -0.1*N["record"]["spacepoints"][spacePointAlgoName][roundKey]["xyz"]["z"].AsFloat);
    	clone.transform.localScale = Vector3(0.01,0.01,0.01);//Vector3(0.005,0.005,0.005);
    	clone.gameObject.layer = 10;
    	clone.transform.SetParent(spacePointParent.transform);
	    //spacePointsArray.Push(clone);	
      }
    
    } // if make spacePoints

    // ***********************
    // Working with tracks
    // ***********************
    var trackParent : GameObject = new GameObject();
    if(makeTracks) {
    
    var threshold : double =  -1f;
    var drawnPoints : int = 0;
    var trackAlgoName = "recob::Tracks_pandoraCosmic__DataApr2016RecoStage2";//"recob::Tracks_pandoraCosmicKHit__RecoStage2";
    var totalTracks : int = N["record"]["tracks"][trackAlgoName].Count;

    /* Empty the trackParent object before continuing
    for (var child : Transform in trackParent.transform) {
        Debug.Log("child name is " + child.name);
    	Destroy(child.gameObject);
 	}*/

    
    //Loop over tracks: Decide which points to draw, then draw points and connection lines.
    Debug.Log("<color=purple>Number of tracks: </color> " + totalTracks);
    for (var trackIndex : int = 0; trackIndex < totalTracks; trackIndex++) {
      //Stores the endpoints of each track segment to be drawn
      var spacePointsArray : Array = new Array();
      
      //Loop over points in the track, define the first two points outside the loop as initial conditions
      var totalPoints : int = N["record"]["tracks"][trackAlgoName][trackIndex]["points"].Count;
      //Debug.Log("<color=purple>Number of points: </color> " + totalPoints);
      
      var pt1 : Vector3 = Vector3(
                                  0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0]["x"].AsFloat,
                                  0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0]["y"].AsFloat,
                                  -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][0]["z"].AsFloat);
      var pt2 : Vector3 = Vector3(
                                  0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1]["x"].AsFloat,
                                  0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1]["y"].AsFloat,
                                  -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][1]["z"].AsFloat);
      
      //Always include the first point
      spacePointsArray.Push(pt1);
      
      //Loop over the remaining points in the track
      //Default value is -1f, so the collinearity will never be checked (i.e., all points are drawn for each track)
      for (var spacePointIndex : int = 2; spacePointIndex < totalPoints; spacePointIndex++) {
        var vec : Vector3 = Vector3(
                                    0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex]["x"].AsFloat,
                                    0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex]["y"].AsFloat,
                                    -0.1*N["record"]["tracks"][trackAlgoName][trackIndex]["points"][spacePointIndex]["z"].AsFloat);
        
        //If the next point is collinear, move the current endpoint to the new point without drawing anything
        //Also always include the final point.
        if (Collinear(pt1, pt2, vec) <= threshold && spacePointIndex != totalPoints - 1) {
          pt2 = vec;
        }
        else {
          if (spacePointIndex + 1 < totalPoints) {
            spacePointsArray.Push(pt2);
          }
          pt1 = pt2;
          pt2 = vec;
        }
      }
      
      //Always push the last point. There might be an off-by-one error here because I think it's possible for
      //this last point to get added twice because of the above loop. Not a huge problem though.
      spacePointsArray.Push(pt2);
      
      
      //drawTracksFromArray(trackIndex, spacePointsArray);
      drawnPoints += spacePointsArray.length;
      
      
      
      
      var index : int = trackIndex;
      var arr : Array = spacePointsArray;
      
      //Create a gameobject to hold box collider children and a line renderer
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
      lr.SetWidth(0.5, 0.5); //m
      lr.SetColors(Color.cyan, Color.cyan);
      lr.gameObject.layer = 11;
      
      var pt0 : Vector3 = arr[0];
      
      lr.SetVertexCount(arr.length);
      lr.SetPosition(0, transform.position + pt0);
      //m PlacePoint(pt0, trackObject);
      for (var ii : int = 1; ii < arr.length; ii++) {
        var ipt1 : Vector3 = arr[ii - 1];
        var ipt2 : Vector3 = arr[ii];
        
        lr.SetPosition(ii,  transform.position + ipt2);
        
        
        //m PlacePoint(ipt2, trackObject);
        /*m
        //Make a game object for each segment to store on-click behavior and a box collider
        //Put this child object at the midpoint between the current two points
        var segmentObject = new GameObject();
        segmentObject.layer = 11;
        segmentObject.AddComponent(trackClick);
        //segmentObject.SendMessage("SetTooltipRef", tooltip);
        //Wasn't able to get this working. Meant to scale collider boxes with camera distance.
        //segmentObject.AddComponent(ScaleColliderRelativeToCamera);
        segmentObject.name = "segment" + ii;
        segmentObject.transform.parent = trackObject.transform;
        segmentObject.transform.position = (transform.position + ipt1 + transform.position + ipt2) / 2.0;
        
        var bc : BoxCollider;
        var boxColliderOffset : float = 0.4; //height and width of box collider
        bc = segmentObject.AddComponent.<BoxCollider>();
        bc.transform.LookAt(transform.position + ipt2);
        bc.center = Vector3.zero;
        bc.size.z = Vector3.Distance(ipt1, ipt2); //z is forward vector
        bc.size.x = boxColliderOffset;
        bc.size.y = boxColliderOffset;
        */
      }
    } // tracks loop

   } // if make tracks




    // ***********************
    // Creating the prefab
    // ***********************
    var fileName = filesInfo[i].Name;
    if(makeTracks){
      var fileLocation = "Assets/Resources/Tracks/" + fileName + ".prefab";
      emptyObj = PrefabUtility.CreateEmptyPrefab(fileLocation);
      PrefabUtility.ReplacePrefab(trackParent , emptyObj, ReplacePrefabOptions.ConnectToPrefab);
      Debug.Log("Prefab created: " + fileLocation);
      Destroy(trackParent);
    }
    if(makeSpacePoints){
      fileLocation = "Assets/Resources/SpacePoints/" + fileName + ".prefab";
      emptyObj = PrefabUtility.CreateEmptyPrefab(fileLocation);
      PrefabUtility.ReplacePrefab(spacePointParent , emptyObj, ReplacePrefabOptions.ConnectToPrefab);
      Debug.Log("Prefab created: " + fileLocation);
      Destroy(spacePointParent);
    }
  } // files loop
  #endif
}


function PlacePoint(pt1 : Vector3, trackParent : GameObject) {
  var clone : GameObject;
  clone = Instantiate(dot, transform.position, transform.rotation);
  clone.transform.position = transform.position + pt1;
  clone.transform.localScale = Vector3(0.005,0.005,0.005);
  clone.transform.SetParent(trackParent.transform);
  
}

function Update () {
  
}