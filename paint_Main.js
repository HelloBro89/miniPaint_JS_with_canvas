//      ------ HTML creation  --------
let way = document.body;
let wayCanvas = document.createElement('canvas')
way.prepend(wayCanvas);

wayCanvas.setAttribute('id', 'myCanvas');

let findCanvas = document.getElementById('myCanvas');

findCanvas.setAttribute('width', 600);
findCanvas.setAttribute('height', 500);
findCanvas.setAttribute('style', 'border:1px solid #0bcddb73; background: #eee')

let c = document.getElementById('myCanvas');
let ctx = c.getContext('2d');

let findDiv = document.createElement('div');
way.prepend(findDiv);

findDiv.innerHTML = 'координаты Canvas';


//     --------------------BUTTON --------------------


//     ------------------- FIGURE --------------------


//                         CIRCLE
let circle = document.createElement('input');
way.append(circle);
circle.value = 'circle';
circle.type = 'button';
circle.style.cssText = `margin-left: 20px;
  margin-top: 30px;
  width: 43px;
  text-align: center;
  `;

circle.addEventListener('click', () => {
    checkCircle = 'on';
    checkRec = 'off';
    findCanvas.addEventListener('mousedown', startCoor);

})

//                         TRIANGLE

let triangle = document.createElement('input');
way.append(triangle);
triangle.value = 'triangle';
triangle.type = 'button';
triangle.style.cssText = `margin-left: 20px;
  margin-top: 30px;
  width: 70px;
  text-align: center;
  `;

triangle.addEventListener('click', () => {
    checkTriangle = 'on';
    checkRec = 'off';
    checkCircle = 'off';
    findCanvas.addEventListener('mousedown', startCoor);
});


//                         RECTANGLE

let rectangle = document.createElement('input');
way.append(rectangle);
rectangle.value = 'rectangle';
rectangle.type = 'button';
rectangle.style.cssText = `margin-left: 20px;
  margin-top: 30px;
  width: 70px;
  text-align: center;
  `;

rectangle.addEventListener('click', () => {
    checkRec = 'on';
    checkCircle = 'off';
    checkTriangle = 'off';
    findCanvas.addEventListener('mousedown', startCoor);
});


//                                  LINE

let lineS = document.createElement('input');
way.append(lineS);
lineS.value = 'line';
lineS.type = 'button';
lineS.style.cssText = `margin-left: 20px;
  margin-top: 30px;
  width: 70px;
  text-align: center;
  `;

lineS.addEventListener('click', () => {
    checkTriangle = 'off';
    checkRec = 'off';
    checkCircle = 'off';
    findCanvas.addEventListener('mousedown', startCoor);
})


//  ---------------------- COLOR ---------------------------------


//                          RED

let buttonRed = document.createElement('input');
way.append(buttonRed);

buttonRed.type = 'button';
buttonRed.style.marginLeft = '50px';
buttonRed.style.marginTop = '10px';
buttonRed.value = 'color';
buttonRed.style.backgroundColor = 'red';

buttonRed.onclick = () => lineColor = 'red';


//                          BLACK

let buttonBlack = document.createElement('input');
way.append(buttonBlack);
buttonBlack.type = 'button';
buttonBlack.value = 'color';
buttonBlack.style.cssText = `margin-left: 10px;
  margin-top: 10px;
  width: 43px;
  color: white;
  background-color: black; 
  text-align: center;
  `;

buttonBlack.onclick = () => lineColor = 'black';


//    ----------------   EVENT CREATION --------------------
let x = Number();
let y = Number();
let x1 = Number();
let y1 = Number();


let canvasX = findCanvas.getBoundingClientRect().x;
let canvasY = findCanvas.getBoundingClientRect().y;

let lineColor = 'black';

let indLine = [];
let indRect = [];
let indCircle = [];
let indTriangle = [];

let checkCircle = 'off';
let checkRec = 'off';
let checkTriangle = 'off';

let saveMass = [];

class Coordinates {
    constructor(x, y, x1, y1, lineColor) {
        this.pointX = x;
        this.pointY = y;
        this.pointX1 = x1;
        this.pointY1 = y1;
        this.col = lineColor;
    }


    drawLine() {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.col;
        ctx.moveTo(this.pointX, this.pointY);
        ctx.lineTo(this.pointX1, this.pointY1);
        ctx.stroke();
    }

    drawTriangle() {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.col;
        ctx.moveTo(this.pointX, this.pointY);
        ctx.lineTo(this.pointX1, this.pointY);
        ctx.lineTo((this.pointX + this.pointX1) / 2, this.pointY1);
        ctx.lineTo(this.pointX, this.pointY);
        ctx.stroke();
    }

    drawRectangle() {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.col;
        ctx.rect(this.pointX, this.pointY, this.pointX1 - this.pointX, this.pointY1 - this.pointY);
        ctx.stroke();

    }

    drawCircle() {
        ctx.beginPath();
        ctx.arc(this.pointX, this.pointY, Math.hypot(this.pointX1 - this.pointX, this.pointY1 - this.pointY), 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.col;
        ctx.stroke();
    }
}

let point = new Coordinates(x, y, x1, y1, lineColor);

function change() {
    point = new Coordinates(x, y, x1, y1, lineColor);
}

findCanvas.addEventListener('click', (e) => {
    findDiv.innerHTML = (e.clientX - canvasX) + ':' + (e.clientY - canvasY);
})

//    ----------------------------------------------------------------------
//-------------------------------------Start -----------------------------------------
//----------------------------------------------------------------------

findCanvas.addEventListener('mousedown', startCoor);

function startCoor(e) {

    if (event.which === 1) {
        x = e.clientX - canvasX;
        y = e.clientY - canvasY;

        findCanvas.addEventListener('mousemove', setCoordinates);
    }
}

function recovery() {

    for (let i = 0; i <= saveMass.length; i++) {

        if (indLine.includes(i)) {
            point = new Coordinates(saveMass[i].pointX, saveMass[i].pointY, saveMass[i].pointX1, saveMass[i].pointY1, saveMass[i].col);
            point.drawLine();

        } else if (indCircle.includes(i)) {
            point = new Coordinates(saveMass[i].pointX, saveMass[i].pointY, saveMass[i].pointX1, saveMass[i].pointY1, saveMass[i].col);
            point.drawCircle();

        } else if (indRect.includes(i)) {
            point = new Coordinates(saveMass[i].pointX, saveMass[i].pointY, saveMass[i].pointX1, saveMass[i].pointY1, saveMass[i].col);
            point.drawRectangle();

        } else if (indTriangle.includes(i)) {
            point = new Coordinates(saveMass[i].pointX, saveMass[i].pointY, saveMass[i].pointX1, saveMass[i].pointY1, saveMass[i].col);
            point.drawTriangle();
        }
    }
}

function setCoordinates(e) {

    ctx.clearRect(0, 0, 600, 500);

    x1 = e.clientX - canvasX;
    y1 = e.clientY - canvasY;

    recovery();

    change();

    if (checkRec === 'off' && checkCircle === "off" && checkTriangle === 'off') {
        point.drawLine();
    }

    if (checkCircle === 'on') {
        point.drawCircle();
    }

    if (checkRec === 'on') {

        point.drawRectangle();
    }
    if (checkTriangle === 'on') {
        point.drawTriangle();
    }
}

findCanvas.addEventListener('mouseup', finish);

function finish(e) {

    if (event.which === 1) {

        findCanvas.removeEventListener('mousemove', setCoordinates);

        x1 = e.clientX - canvasX;
        y1 = e.clientY - canvasY;

        change();

        if (x !== x1 || y !== y1) {

            saveMass.push(point);

            if (checkRec === 'off' && checkCircle === 'off' && checkTriangle === 'off') {

                indLine.push(saveMass.length - 1);
                point.drawLine();

            }

            if (checkCircle === 'on') {

                indCircle.push(saveMass.length - 1);
                point.drawCircle();
            }

            if (checkRec === 'on') {

                indRect.push(saveMass.length - 1);
                point.drawRectangle();
            }
            if (checkTriangle === 'on') {
                indTriangle.push(saveMass.length - 1);
                point.drawTriangle();
            }
        }
    }
}

findCanvas.addEventListener('contextmenu', clearLastLine);

function clearLastLine() {


    if (indLine[indLine.length - 1] === saveMass.length - 1) {
        indLine.pop();

    } else if (indRect[indRect.length - 1] === saveMass.length - 1) {
        indRect.pop();
    } else if (indCircle[indCircle.length - 1] === saveMass.length - 1) {
        indCircle.pop();
    } else {
        indTriangle.pop();
    }

    ctx.clearRect(0, 0, 600, 500);

    saveMass.pop(point);

    recovery();
    event.preventDefault();
}