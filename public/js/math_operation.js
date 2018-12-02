function calculate()  {
  var oper1 = parseFloat(document.getElementById('operand1').value);
  var oper2 = parseFloat(document.getElementById('operand2').value);
  var operator = document.getElementById('operator').value;

  if (operator === 'add') {
    document.getElementById('output').value = oper1 + oper2;
  }
  else if (operator === 'substract') {
    document.getElementById('output').value = oper1 - oper2;
  }
  else if (operator === 'multiply') {
    document.getElementById('output').value = oper1 * oper2;
  }
  else {
    document.getElementById('output').value = oper1 / oper2;
  }
}

document.getElementById('equal').addEventListener('click', calculate);