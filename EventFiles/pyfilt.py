#!/usr/bin/env python

import json, sys
from math import *

inputfile=sys.argv[1]
space=float(sys.argv[2])
tracksstr=sys.argv[3]
spstr=sys.argv[4]

print "Opening", inputfile

with open(inputfile) as f:
  indict=json.loads(f.read())

outdict1={}
outdict1['record']={}
outdict1['record']['tracks']={}
outdict1['record']['tracks'][tracksstr]=[]
for trk in indict['record']['tracks'][tracksstr]:
  outdict1['record']['tracks'][tracksstr].append({'points':[]})
  for pt in trk['points']:
    outdict1['record']['tracks'][tracksstr][-1]['points'].append({'x':pt['x'], 'y':pt['y'], 'z':pt['z']})

with open(inputfile+".tracks.json", "w") as f:
  f.write(json.dumps(outdict1))
  
outdict2={}
outdict2['record']={}
outdict2['record']['spacepoints']={}
outdict2['record']['spacepoints'][spstr]=[]
first=True
storedsps=0
for sp in indict['record']['spacepoints'][spstr]:
  d=0
  if not first:
    b=sp['xyz']
    d=sqrt((a[0]-b[0])*(a[0]-b[0]) + (a[1]-b[1])*(a[1]-b[1]) + (a[2]-b[2])*(a[2]-b[2]))
    #print d
  
  if first or d>space:
    outdict2['record']['spacepoints'][spstr].append({'xyz':sp['xyz']})
    a=sp['xyz']
    storedsps+=1
    
  if first:
    a=sp['xyz']
    
  first=False
    
print "Stored %d spacepoints." % storedsps
with open(inputfile+".spacepoints_%dcm.json"%space, "w") as f:
  f.write(json.dumps(outdict2))
