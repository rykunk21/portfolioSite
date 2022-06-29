function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function animation(obj, titles){
    while (true){
        for (const title of titles){
            await delay(3000)
            for (let i=obj.innerHTML.length; i>=0; i--){
                obj.innerHTML = obj.innerHTML.substr(0,i);
                await delay(50);
            }
            for (let i = 0; i<title.length; i++){
                obj.innerHTML += title.at(i);
                await delay(100);
            }
        }
    }    
}


const titles = [
    'a Blockchain Developer', 'a Problem Solver' ,'a Web Developer', 'a Drone Pilot', 'an Engineer' 
]

var title = document.getElementById('position-title');

animation(title, titles);

