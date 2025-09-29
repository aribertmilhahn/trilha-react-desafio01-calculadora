import Input from './componets/Input';
import Button from './componets/Button';

import { Container, Content, Row } from './styles';
import { useState } from 'react';

const App = () => {
  const [ currentDisplayedNumber, setCurrentDisplayedNumber ] = useState('0');
  const [ firstNumber, setFirstNumber ] = useState(NaN);
  const [ secondNumber, setSecondNumber ] = useState(NaN);
  const [ resetDisplay, setResetDisplay ] = useState(false);
  const [ operation, setOperation ] = useState('');

  const handleOnClear = () => {
    setCurrentDisplayedNumber('0');
    setFirstNumber(NaN);
    setSecondNumber(NaN);
    setOperation('');
  };

  const handleClearEntry = () => {
    if (isNaN(secondNumber)) {
      setCurrentDisplayedNumber('0');
    } else {
      handleOnClear();
    }
  };

  const handleAddNumber = (number) => {
    if (resetDisplay === true) {
      const newResetDisplayState = false;
      setResetDisplay(newResetDisplayState);
      setCurrentDisplayedNumber(`${number}`);
    } else {
      setCurrentDisplayedNumber(prev => `${prev === '0' ? '' : prev}${number}`);
    }
  };

  const handleNumbersOp = (op) => {
    setOperation(op);
    
    if (isNaN(firstNumber)) {
      const newResetDisplayState = true;
      setResetDisplay(newResetDisplayState);
      const num1 = Number(currentDisplayedNumber);
      setFirstNumber(num1);
    } else {
      setSecondNumber(NaN);
    }
  };

  const handlePercentOp = () => {
    if (operation === '') {
      const newResetDisplayState = true;
      setResetDisplay(newResetDisplayState);
      setFirstNumber(0);
      setCurrentDisplayedNumber('0');
    } else {
      const newResetDisplayState = true;
      setResetDisplay(newResetDisplayState);
      const num1 = firstNumber;
      const percent = Number(currentDisplayedNumber) * num1 / 100;
      setCurrentDisplayedNumber(String(percent));
    } 
  }

  const negate = () => {
    let num1 = firstNumber;
    let num2 = secondNumber;
    const num = Number(currentDisplayedNumber) * (-1);
    if (isNaN(num2)) {
      setCurrentDisplayedNumber(String(num));
    } else {
      num1 = num1 * (-1);
      setFirstNumber(num1);
      setCurrentDisplayedNumber(String(num1));
    }
  }

  const handleEquals = () => {
    const newResetDisplayState = true;
    setResetDisplay(newResetDisplayState);

    if (operation === '') {
      const num1 = Number(currentDisplayedNumber);
      setFirstNumber(num1);
    } else {
      let num1 = firstNumber;
      let num2 = secondNumber;
      
      if (isNaN(num2)) {
        num2 = Number(currentDisplayedNumber);
        setSecondNumber(num2);
      }

      let result = calculateOperation(operation, num1, num2);
      setCurrentDisplayedNumber(String(result));
      setFirstNumber(result);
    }
  };

  const calculateOperation = (op, num1, num2) => {
    let result = 0;
    switch (op) {
      case '+':
        result = num1 + num2;
        break;
        
      case '-':
        result = num1 - num2;
        break;

      case 'x':
        result = num1 * num2;
        break;

      case '/':
        result = num1 / num2;
        break;
          
      default:
        break;
    }
    return result;
  }

  return (
    <Container>
      <Content>
        <Input value={currentDisplayedNumber} />
        <Row>
          <Button label='%' onClick={handlePercentOp}/>
          <Button label='CE' onClick={handleClearEntry}/>
          <Button label='C' onClick={handleOnClear}/>
          <Button label='/' onClick={() => handleNumbersOp('/')}/>
        </Row>
        <Row>
          <Button label='7' onClick={() => handleAddNumber('7')}/>
          <Button label='8' onClick={() => handleAddNumber('8')}/>
          <Button label='9' onClick={() => handleAddNumber('9')}/>
          <Button label='x' onClick={() => handleNumbersOp('x')}/>
        </Row>
        <Row>
          <Button label='4' onClick={() => handleAddNumber('4')}/>
          <Button label='5' onClick={() => handleAddNumber('5')}/>
          <Button label='6' onClick={() => handleAddNumber('6')}/>
          <Button label='-' onClick={() => handleNumbersOp('-')}/>
        </Row>
        <Row>
          <Button label='1' onClick={() => handleAddNumber('1')}/>
          <Button label='2' onClick={() => handleAddNumber('2')}/>
          <Button label='3' onClick={() => handleAddNumber('3')}/>
          <Button label='+' onClick={() => handleNumbersOp('+')}/>
        </Row>
        <Row>
          <Button label='+/-' onClick={negate}/>
          <Button label='0' onClick={() => handleAddNumber('0')}/>
          <Button label='.' onClick={() => handleAddNumber('.')}/>
          <Button label='=' onClick={handleEquals}/>
        </Row>
      </Content>
    </Container>
  );
}

export default App;
