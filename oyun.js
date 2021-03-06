function oyun() {

    const canvas = document.querySelector('canvas');
    canvas.width = 600;
    canvas.height = 300;
    canvas.style.backgroundColor = 'white';
    canvas.style.border = 'solid';

    const c = canvas.getContext('2d');

    let startBtn = document.getElementById('startBtn');

    let aralik = 70;
    let yercekimi = 1.5;
    let topX = canvas.width / 4;
    let topY = canvas.height / 2;
    let topRadius = 5;
    let skor = 0;
    let seviye = 1;
    let fps = 60;

    let bg = new Image();
    bg.src = 'image/bg.png';

   
    let scorSesi = new Audio();
    scorSesi.src = 'audio/scorSesi.wav';

    let carpmaSesi = new Audio();
    carpmaSesi.src = 'audio/dead.mp3';

    let engel = [];

    engel[0] = {
        x: canvas.width,
        y: 0,
        width: 20,
        height: Math.random() * (canvas.height - aralik) + 1 
    };

    document.addEventListener("keydown", function () {
        yercekimi = -1.5;

    });
    document.addEventListener("keyup", function () {
        yercekimi = 1;

    });



    function draw() {

        startBtn.style.display = 'none';


        c.clearRect(0, 0, canvas.width, canvas.height);

        c.drawImage(bg, 0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < engel.length; i++) {
            c.fillStyle = 'green';
            c.fillRect(engel[i].x, engel[i].y, engel[i].width, engel[i].height);
            c.fillRect(engel[i].x, engel[i].y + engel[i].height + aralik, engel[i].width, canvas.height - engel[i].height - aralik);

            engel[i].x--;

            if (engel[i].x == 350) {

                engel.push({
                    x: canvas.width,
                    y: 0,
                    width: 20,
                    height: Math.random() * (canvas.height - aralik) +1 
                });
            }

            if (topX + topRadius >= engel[i].x && topX - topRadius <= engel[i].x + engel[i].width && topY - topRadius <= engel[i].y + engel[i].height ||
                topX + topRadius >= engel[i].x && topX - topRadius <= engel[i].x + engel[i].width && topY + topRadius >= engel[i].y + aralik + engel[i].height ||
                topY - topRadius <= 0 || topY + topRadius >= canvas.height) {
                carpmaSesi.play();
                clearInterval(game);
                startBtn.style.display = 'initial';
            }

            if (engel[i].x == topX - engel[i].width - topRadius - 5) {
                skor++;
                scorSesi.play();

                if (skor % 5 == 0) {
                    seviye++;
                    fps += 20;

                    clearInterval(game);
                    game = setInterval(draw, 1000 / fps);
                }
            }

        }
    

    c.beginPath();
    c.arc(topX, topY, topRadius, Math.PI * 2, false);
    c.fillStyle = 'red';
    c.fill();
    c.stroke();

    topY += yercekimi;

    c.fillStyle = 'black';
    c.font = '20px Arial';
    c.fillText('Puan   : ' + skor, 10, 20);
    c.fillText('Seviye : ' + seviye, 10, 40);
    // c.fillText('fps : ' + fps, 10, 60);

}

let game = setInterval(draw, 1000 / fps);


}