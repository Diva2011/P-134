img = "";
status = "";
objects = [];
alarm = "";

function preload()
{
    img = loadImage('bedroom2.webp');
    alarm = loadSound('alarm.mp3');
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";   
} 


function modelLoaded()
{
    console.log('Model is initialized!');
    status = true;
}

function gotResults(error,results){
    if(error){
        console.log(error);
    } else{
        console.log(results);
        objects = results;
    }

}

function draw()
{
    image(video,0,0,380,380);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);

        for(i=0 ; i< objects.length ; i++)
        {
            console.log('test');

            if(objects[i].label == 'person')
            {
                document.getElementById('status').innerHTML = "Baby detected";
                alarm.stop();
            } else
             {
                document.getElementById('status').innerHTML = "Baby not detected";
                alarm.play();             
            }  

            if(objects[i].length == 0)
            {
                document.getElementById('status').innerHTML = "Baby not detected";
                alarm.play();
            }

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y - 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

