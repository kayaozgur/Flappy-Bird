function oyun() {

const canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 300;
canvas.style.backgroundColor = 'white';
canvas.style.border = 'solid';

const c = canvas.getContext('2d');

let aralik = 70; 
let yercekimi = 1.5;
let topX = canvas.width/4;
let topY = canvas.height/2;
let topRadius = 5; 
let skor = 0;

let engel = [];

engel[0] = {
    x : canvas.width,
    y : 0,
    width : 20,
    height : Math.floor(Math.random() * canvas.height - 40)
};
               
document.addEventListener("keydown", function() { 
    yercekimi = -1.5;
   
});   
document.addEventListener("keyup", function() { 
    yercekimi = 1;
   
}); 



function draw() {

 
    c.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < engel.length; i++) {
        c.fillStyle = 'black';
        c.fillRect(engel[i].x, engel[i].y, engel[i].width, engel[i].height);
        c.fillRect(engel[i].x, engel[i].y + engel[i].height + aralik, engel[i].width, canvas.height - engel[i].height - aralik);

        engel[i].x --;

        if(engel[i].x == 350) {
           
            engel.push( {
                x: canvas.width,
                y: 0,
                width: 20,
                height : Math.floor(Math.random() * canvas.height - 40)
            });
        }

        if(topX + topRadius >= engel[i].x && topX - topRadius <= engel[i].x + engel[i].width && topY - topRadius <= engel[i].y + engel[i].height ||
            topX + topRadius >= engel[i].x && topX - topRadius <= engel[i].x + engel[i].width && topY + topRadius >= engel[i].y + aralik+ engel[i].height ||
            topY - topRadius <= 0 || topY + topRadius >= canvas.height) {
            location.reload()
        }

        if(engel[i].x == topX - engel[i].width - topRadius -5) {
            skor++;
        } 
    }

    c.beginPath();
    c.arc(topX,topY, topRadius, Math.PI * 2,false);
    c.fill();
    c.stroke();

    topY += yercekimi;
   
    c.fillStyle = 'black';
    c.font = '20px Arial';
    c.fillText('Skor : ' + skor, 10, 20);


    requestAnimationFrame(draw);
}

draw();

}