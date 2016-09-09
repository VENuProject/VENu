#!/usr/bin/env bash

outdir=./jsonout

p() {
  url1=$2
  curl "$url1" > $outdir/${1}.json
  ./pyfilt.py $outdir/${1}.json 3
  
}



p data_ccpi0_r5975e4262 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=26&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F59%252F75%252FPhysicsRun-2016_4_18_19_14_2-0005975-00085_20160419T061144_bnb_20160502T103309_merged_20160502T141946_reco1_20160502T194515_reco2.root&options=_tilesize2400_"

#p data_ccnumu_r5153e2919 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=8&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F51%252F53%252FPhysicsRun-2016_2_25_12_29_52-0005153-00058_20160228T005626_bnb_20160228T022611_merged_20160409T201728_reco1_20160412T223933_reco2.root&options=_tilesize2400_"

#p data_ccnumu_r5153e2929 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=18&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F51%252F53%252FPhysicsRun-2016_2_25_12_29_52-0005153-00058_20160228T005626_bnb_20160228T022611_merged_20160409T201728_reco1_20160412T223933_reco2.root&options=_tilesize2400_"

#p data_ccnumu_r5155e6623 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=34&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F51%252F55%252FPhysicsRun-2016_2_25_22_30_8-0005155-00132_20160303T125622_bnb_20160303T213712_merged_20160409T210232_reco1_20160412T220117_reco2.root&options=_tilesize2400_"

#p data_ccnumu_r5189e665 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=6&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F51%252F89%252FPhysicsRun-2016_2_28_4_28_53-0005189-00023_20160304T051541_bnb_20160304T082628_merged_20160409T173838_reco1_20160412T222700_reco2.root&options=_NORAW__NOCAL__tilesize2400_"

#p data_ccnumu_r5192e1218 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=12&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F51%252F92%252FPhysicsRun-2016_2_28_9_35_3-0005192-00025_20160301T121234_bnb_20160301T153659_merged_20160409T165354_reco1_20160412T222717_reco2.root&options=_NORAW__NOCAL__tilesize2400_"

#p data_ccnumu_r5208_e5108 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=5&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F52%252F08%252FPhysicsRun-2016_2_29_10_29_44-0005208-00102_20160301T000913_bnb_20160301T034028_merged_20160512T225525_reco1_20160513T013611_reco2.root&options=_NORAW__NOCAL__tilesize2400_"

#p data_ccnumu_r5607_e2873 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=9&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F56%252F07%252FPhysicsRun-2016_3_27_5_29_27-0005607-00057_20160327T141955_bnb_20160328T231624_merged_20160409T102206_reco1_20160411T114339_reco2.root&options=_NORAW__NOCAL__tilesize2400_"

#p data_ccnumu_r5820_e585 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=43&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F58%252F20%252FPhysicsRun-2016_4_7_20_48_20-0005820-00011_20160408T040322_bnb_20160408T062331_merged_20160409T091541_reco1_20160409T150857_reco2.root&options=_NORAW__NOCAL__tilesize2400_"

#p data_ccnumu_r5823_e6135 "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=43&filename=%252Fpnfs%252Fuboone%252Fdata%252Fuboone%252Freconstructed%252Freco_outbnb%252Freco2%252Fprod_v05_08_00%252F00%252F00%252F58%252F23%252FPhysicsRun-2016_4_7_23_53_4-0005823-00122_20160408T090300_bnb_20160408T104311_merged_20160409T094600_reco1_20160409T145805_reco2.root&options=_NORAW__NOCAL__tilesize2400_"

