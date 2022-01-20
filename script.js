let answer;
let inputArr=[];
let isNegative=false;


const mapButton = () =>{
    let calcButtons = document.querySelector('#my-btns');
    let btns = document.createElement('div');
    btns.setAttribute('class','btns');
    let btnArray=[1,2,3,'+',4,5,6,'-',7,8,9,'x',0,'.','C','/','+/-','='];
    for(let i=0; i<btnArray.length; i++){
        btns.innerText=btnArray[i];
        btns.setAttribute('id',btnArray[i])
        calcButtons.appendChild(btns.cloneNode(true));
    }

    let divs = document.querySelectorAll('.btns');  
    for( item of divs){
        item.addEventListener('click', (e) => {
            let input=e.target.id;
            let capturedInput=document.querySelector('#user-input');
            let number = capturedInput.innerText;
            let sign =document.querySelector('#sign');

            if(/[0123456789.]/.test(input)){
               capturedInput.innerText+=input; 
            }
            else if(input == '+/-'){ 
                 isNegative = !isNegative;
                 sign.innerText = isNegative ? '-':'';  
                 console.log(sign)  
            }
            else if(/[+-/x=]/.test(input)){
                shouldCalculate(sign.innerText + number, input);
                sign.innerText='';
            }
            else{
               capturedInput.innerText='';
            }
        })
    }
    document.querySelector('#C').addEventListener('dblclick',(e) => {
        inputArr=[];
        document.querySelector('#answer').innerText=''

    })
}

const shouldCalculate = (number,operator) =>{
    if(inputArr.length == 1){
        if(operator == '='){
            return
        }
        inputArr.push(operator);
        document.querySelector('#answer').innerText=inputArr.join('');
        return
    }
    if(number==""){
        return
    }
    if(inputArr.length == 0){
        inputArr.push(number,operator);
        document.querySelector('#answer').innerText=inputArr.join('');
        document.querySelector('#user-input').innerText='';
        return
    }
    if(number==''){
        return
    }
    inputArr.push(number);
    switch(inputArr[1]){
        case '+':
           answer = Add(Number(inputArr[0]),Number(inputArr[2]));
          break;
          case 'x':
           answer = Multiply(Number(inputArr[0]),Number(inputArr[2]));
          break;
          case '/':
           answer = Divide(Number(inputArr[0]),Number(inputArr[2]));
          break;
          case '-':
           answer = Subtract(Number(inputArr[0]),Number(inputArr[2]));
          break;
    }
    inputArr= operator == "=" ?[answer.toFixed(3)]:[answer.toFixed(3),operator];
    document.querySelector('#answer').innerText=inputArr.join('');
    document.querySelector('#user-input').innerText='';
    
   

}
const getInput = () =>{

}

const Add = (num1,num2) => num1 + num2;
const Divide = (num1,num2) => num1 / num2;
const Subtract = (num1,num2) => num1 - num2;
const Multiply = (num1,num2) => num1 * num2;


mapButton();




