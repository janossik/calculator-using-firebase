export const calculate = (firstNumber: number, secondNumber: number, operation: string) => {
  switch (operation) {
    case '+': {
      return firstNumber + secondNumber;
    }
    case '-': {
      return firstNumber - secondNumber;
    }
    case '*': {
      return firstNumber * secondNumber;
    }
    case '/': {
      if (secondNumber === 0) throw new Error('Cannot divide by zero');
      return firstNumber / secondNumber;
    }
  }
  throw new Error(`Invalid operation "${operation}"`);
};
