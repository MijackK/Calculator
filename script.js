let answer;
let inputArr=[];
let isNegative=false;
let capturedInput=document.querySelector('#user-input');
let sign =document.querySelector('#sign');

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
            let number = capturedInput.innerText;
            let floatingPoint = capturedInput.innerText.match(/\./g);


            if(/[0123456789.]/.test(input)){
                if(input =='.' && floatingPoint)
                return
                if(input== '.' && number==''){
                    capturedInput.innerText = '0'+ input;
                    return
                }
                capturedInput.innerText+=input; 
            }
            else if(input == '+/-'){ 
                 isNegative = !isNegative;
                 sign.innerText = isNegative ? '-':'';  
            }
            else if(/[+-/x=]/.test(input)){
                if(number == '.' || number =='')
                return
                shouldCalculate(sign.innerText + number, input);
                sign.innerText='';
            }
            else{
               capturedInput.innerText=capturedInput.innerText.slice(0,capturedInput.innerText.length-1);
            }
        })
    }
    document.querySelector('#clear').addEventListener('click',(e) => {
        inputArr=[];
        document.querySelector('#answer').innerText=''
        capturedInput.innerText='';
    })
}

let addKeyboardEvents = () => {

    let calcBody = document.querySelector('body'); 
    calcBody.addEventListener('keydown',(e)=>{
        let input=e.key;
        let number = capturedInput.innerText;
        let floatingPoint = capturedInput.innerText.match(/\./g);
     
        if(/[0123456789.]/.test(input)){
            if(input =='.' && floatingPoint)
            return
            if(input== '.' && number==''){
                capturedInput.innerText = '0'+ input;
                return
            }
           capturedInput.innerText+=input; 
        }
        else if(input == '_'){ 
             isNegative = !isNegative;
             sign.innerText = isNegative ? '-':'';  
        }
        else if(/[+-/*=]/.test(input)){
            if(number == '.' || number =='')
            return
            shouldCalculate(sign.innerText + number, input);
            sign.innerText='';
        }
        else if(input =="Backspace"){
           capturedInput.innerText=capturedInput.innerText.slice(0,capturedInput.innerText.length-1); ;
        }
       
    })
}

const shouldCalculate = (number,operator) =>{
    
    operator= operator == '*'? 'x': operator;

    if(inputArr.length == 1){
        if(operator == '='){
            return
        }
        inputArr.push(operator);
        document.querySelector('#answer').innerText=inputArr.join('');
        return
    }
   
    if(number=="" ){
        if(inputArr.length == 2 && operator != '='){
            inputArr[1]=operator;
            document.querySelector('#answer').innerText=inputArr.join('');
        }
        return
    }
    if(inputArr.length == 0){
        if(operator == '='){
            return
        }
        inputArr.push(number,operator);
        document.querySelector('#answer').innerText=inputArr.join('');
        document.querySelector('#user-input').innerText='';
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
              if(inputArr[2] == '0'){
                document.querySelector('#answer').innerText ='That\'s illegal';
                document.querySelector('#user-input').innerText='';
                inputArr.pop();
                return;
              }
           answer = Divide(Number(inputArr[0]),Number(inputArr[2]));
          break;
          case '-':
           answer = Subtract(Number(inputArr[0]),Number(inputArr[2]));
          break;
    }
    inputArr= operator == "=" ?[answer.toFixed(1)]:[answer.toFixed(1),operator];
    document.querySelector('#answer').innerText=inputArr.join('');
    document.querySelector('#user-input').innerText='';
}
const Add = (num1,num2) => num1 + num2;
const Divide = (num1,num2) => num1 / num2;
const Subtract = (num1,num2) => num1 - num2;
const Multiply = (num1,num2) => num1 * num2;

mapButton();
addKeyboardEvents();




