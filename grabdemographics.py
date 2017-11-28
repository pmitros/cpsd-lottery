# This will make demographics plots.
# Grab html2img from my github repo (pmitros)
# Make a 'processing' directory
# Run this script.
# Run ls |xargs -iXX convert XX -crop 882x290+243+606 ../public/img/XX
# in that directory.

# This could be cleaned up and integrated, but I think this is a one-off run
# for now. 

import yaml

school_info = yaml.load(open("public/schools.yaml"))

for school in school_info:
    print "python html2img.py --url='http://profiles.doe.mass.edu/general/general.aspx?topNavID=1&leftNavId=100&orgcode={org}&orgtypecode=6' --minwidth=1280 --output='processing/{school}.png'".format(school=school, org=school_info[school]["Code"])
