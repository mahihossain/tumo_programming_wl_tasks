let initialQuestion = 'Hello! How have you been?';
let userResponse = prompt(initialQuestion);

let conversationHistory = initialQuestion + '\n' + userResponse;
alert(conversationHistory);

initialQuestion = 'What are your plans for today?';

userResponse = prompt(initialQuestion);

conversationHistory += '\n' + initialQuestion + '\n' + userResponse;
alert(conversationHistory);

// Add more questions
initialQuestion = 'What is your favorite hobby?';

userResponse = prompt(initialQuestion);

conversationHistory += '\n' + initialQuestion + '\n' + userResponse;

alert(conversationHistory);