1️⃣ What is the difference between var, let, and const? <br>
Let, var, and const are used to declare variable. But they have some differences.
1. var is function scoped and let and const are block scoped.
2. Variables declared with var can be accessed even before the declaration is executed in the code. But it is not possible for let and const.
3. Variables declared with var and let can be reassign with new value. But it can not be done for const.

2️⃣ What is the spread operator (...)? <br>
Spread operator is an operator that provides the individual element of an array, object or string. We can say spread operator brings out all the elements of an array, object or string for using them. Spread function is mainly used for copying (creating a new copy without copying the reference), merging and sending the elements of an array as arguments of a function.

3️⃣ What is the difference between map(), filter(), and forEach()?<br>
map(), filter() and forEach() are array method that loop through arrays to conduct different operations. But all of them does not work in the same manner.
1. map() is used to do any operation to the each element of an array. map() returns a new array after conducting the operation.
2. filter() is used to select the elements that fulfill the given condition. then it returns the selected elements of the array.
3. forEach() does not return any value. It loops through each element and execute the code.

4️⃣ What is an arrow function?<br>
An arrow function is a function that is declared using the following syntax:
```js
const functionName = () => return value;
```
It is a useful way to write small functions to reduce code length.

5️⃣ What are template literals?<br>
Template literal is a way of writing string inside backticks ``. It has some benefits which can not be gained using "" or ''. Using template literals we can directly use any variable inside the string using the following syntax: ${variableName}. It also plays important role in conditional rendering inside a string. Thus this helps to make the code cleaner and easy to understand.