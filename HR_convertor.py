import json
import math

with open("history.data","r") as f:
    data = []
    for line in f: 
        data.append(line)

    info = data[5].split()
    print info

    ## need : "model_number","star_age", "star_mass", "log_Teff", "log_L", "log_R"
    need_list = ["model_number","star_age", "star_mass", "log_Teff", "log_L", "log_R"]
    
    ## find the elemet index from info list
    index = []
    for element in need_list:
        index.append(info.index(element))


    data_length = len(data)

    ## keep only the interesting data
    ## change log_R to R in data
    interesting_data = []
    for i in range(6,data_length):
        data_split = data[i].split()
        interesting_data.append([int(data_split[index[0]]), float(data_split[index[1]]), float(data_split[index[2]]),
            float(data_split[index[3]]), float(data_split[index[4]]), 10. ** (float(data_split[index[5]]))])
    
    ## change log_R to R in need_list
    need_list[5] = "R"

    json_data = {
        "info": need_list,
        "points": interesting_data
    }
    
with open('HR1.json', 'w') as f:
    json.dump(json_data, f, indent=True)