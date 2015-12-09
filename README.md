# VENu

This is the repository for the MicroBooNE VR project. 

The author of this README.md (Ben) stresses that this is one of the first GitHub repositories he has setup. Some of the instructions may not quite work. Please let him know if something's wrong!


## Requirements

You'll need to install usually the latest version of Unity (see below). You'll also need the computer graphics program Blender. 

## A word about Unity versions

Git and Unity don't really get along all that well. In order to make them better bedfellows, it's recommended that everyone working uses the same version of Unity. The repository currently uses version 5.2.3.

Unity 5.2.3 can be downloaded here: https://unity3d.com/get-unity/download/archive

Additional notes: Unity relies on a system of linked scripts and gameobjects. Some of these will save and be uploaded to git without a problem, but do not be surprised if you pull the repository, open it in Unity and find "missing referenced script/object" warnings. You will have to drag the appropriate script or prefab back to the corresponding field in the editor. Again, this is a side effect of using git with Unity--certain settings aren't always saved, so be careful!

## Check out the code

These instructions will demonstrate how you can check the code out and run it with Unity. You do not need a GitHub account to do this. To checkout the project on a Mac, do the following:

    git clone https://github.com/bcarls/VENu

This will create a directory with the Unity project in it. To periodically update, perform the following:

    git pull origin master

## Committing to the repository 

[Thomas Wester] We would ideally like to have the master branch of VENu always working. This means work done on VENu should, by default, go to the Development branch so that testing can be done there and then can be merged into the master branch later once the development branch is stable. You can switch branches using:

    git checkout Development

In order to commit changes to the repository, you need to get a GitHub account. Secondly, email Ben and give him your GitHub username. He will add you as a contributor and you will be able to make commits. If you have only changed existing files, you can commit to your local git repository with:

    git commit -m "This is a test commit"
    
Now, if you have added any new files to your working directory that you would like to commit do the following:

    git add .
    git commit -m "This is a test commit"
    
If you happen to delete files and would like to commit the change, do this instead:

    git add --all
    git commit -m "This is a test commit"

Remember that git creates a local repository in you local directory. The add and commit commands above only send changes to that local repository. If you want the changes moved to the master branch at the origin repository (what's at https://github.com/bcarls/VENu), you need to perform the following:

    git push origin master
    
When people run the pull command above to update their version, they will see your changes and be able to use them. 

