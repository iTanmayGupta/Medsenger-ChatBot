class Medsenger {
    constructor() {
        this.injury = {skin: {burn: ['burn', 'swelling'], rashes: ['rash', 'itching']}, headache: {migrane: ['pain', 'regularly']}};
        this.dis_type;
        this.skin = ["sikn","iskn","skinn","sskin",'sjin'];
        this.possible = [];
    }
    
    disease_type(data){
        var dis = data.toString().split(','); //array of number referring to injury type
        for(var i = 0; i < dis.length; i++){
            dis[i]=dis[i].toLowerCase().trim();
            if(this.skin.includes(dis[i])){
                dis[i] = "skin";
            }
        }
        this.dis_type = dis;
        
        // add smart reader for spelling autocorrect
    }
    
    symptom_des(data) {
        var symptom = data.toString();
        var lst_symp = symptom.split(' ');
        var i = 0;
        var f = true;
        var key;
        while(f && i < this.dis_type.length){
            if(this.injury[this.dis_type[i]]!=null){
                for(key in this.injury[this.dis_type[i]]){
                    var counter = 0;
                    for(var j = 0; j < lst_symp.length; j++){
                        if(this.injury[this.dis_type[i]][key].includes(lst_symp[j].trim())){
                            counter+=1;
                        }
                    }
                    if(counter/this.injury[this.dis_type[i]][key].length >= 0.5){
                        console.log(counter/this.injury[this.dis_type[i]][key].length);
                        this.possible.push(key);
                    }
                }
            }
            i++;
        }
        console.log("Possible diseases: "+this.possible);
    }
}

module.exports = Medsenger;