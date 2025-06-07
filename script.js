let fileHandle;

async function createFile() {
    document.getElementById('editor').innerText = '';
    updateLineNumbers();
    fileHandle = null;
}

console.log(gram);

async function openFile() {
    try {
        [fileHandle] = await window.showOpenFilePicker({
            types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }]
        });
        const file = await fileHandle.getFile();
        const contents = await file.text();
        document.getElementById('editor').innerText = contents;
        updateLineNumbers();
        updateHighlighting();
    } catch (err) {
        console.error('Failed to open file:', err);
    }
}

async function saveFile() {
    try {
        if (!fileHandle) {
            fileHandle = await window.showSaveFilePicker({
                suggestedName: 'untitled.txt',
                types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }]
            });
        }
        const writable = await fileHandle.createWritable();
        await writable.write(document.getElementById('editor').innerText);
        await writable.close();
    } catch (err) {
        console.error('Failed to save file:', err);
    }
}

function updateLineNumbers() {
    const editor = document.getElementById('editor');
    const lineNumbers = document.getElementById('line-numbers');

    let lines = 1;

    const childNodes = editor.childNodes;
    lines = Array.from(childNodes).filter(node => node.nodeType === 1 || node.nodeType === 3).length;

    console.log("Line count:", lines);
    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

function handlePasteEvent(event) {
    const editor = document.getElementById('editor');
    const lineNumbers = document.getElementById('line-numbers');
    
    setTimeout(() => {
        const text = editor.innerText;
        const lines = text.split(/\n|\r/).length;
        
        console.log("Pasted line count:", lines);
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    }, 0);
}

document.getElementById('editor').addEventListener('paste', handlePasteEvent);


document.getElementById('editor').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {

        insertNewLineWithZeroWidthSpace();
        updateLineNumbers();
    }
});

function insertNewLineWithZeroWidthSpace() {
    document.execCommand('insertHTML', false, '<div>&#8203;</div>');
}


function syncScroll() {
    document.getElementById('line-numbers').scrollTop = document.getElementById('editor').scrollTop;
    document.getElementById('highlighting').scrollTop = document.getElementById('editor').scrollTop;
}

const keywords = ["program", "procedure", "begin", "end", "if", "then", "else", "while", "do", "true", "false"];
const operators = ["=", "<>", "<", "<=", ">=", "/", ">", "+", "-", "*", "and", "or", "not", ":="];
const varNames = ["int", "boolean"];
const symbols = ["(", ")", ",", ".", ";",":"];
const floatRegex = /\d+\.\d+/g;
const numbersRegex = /\d+/g;
const identifiersRegex = /[a-zA-Z_][a-zA-Z0-9_]*/g;
const invalidIdentifierRegex = /\d+[a-zA-Z_]+|&\w*|%\w*|#\w*|@\w*|[a-zA-Z0-9_]{24, }/;
let lextokens;

function createSyntaxAction(stackItem, inputItem, action) {
    return {
        'stackItem': stackItem,
        'inputItem': inputItem,
        'action': action
    };
}

function updateHighlighting() {
    const editor = document.getElementById('editor');
    const highlighting = document.getElementById('highlighting');

    let text = editor.innerHTML;
    let highlightedText = text.replace(/\b(\w+)\b/g, (match) => {
        if (keywords.includes(match)) {
            return `<span id="keywords" style="color: red;">${match}</span>`;
        } if(operators.includes(match)) {
            return `<span id="keywords" style="color: blue;">${match}</span>`;
        }
        return match;
    });

    highlighting.innerHTML = highlightedText;
}



function buildTable() {
    lextokens = [];
    const text = document.getElementById('editor').innerText;
    const lines = text.split('\n');
    let tableHtml = '<table border="1"><thead><tr><th>Palavra</th><th>Token</th><th>Linha</th><th>Coluna Inicial</th><th>Coluna Final</th></tr></thead><tbody>';
    
   const tokenRegex = /\d+\.\d+|\d*[@%#&a-zA-Z_]+\d*|(program|procedure|begin|end|if|then|else|while|do|true|false)|(:=)|[a-zA-Z_][a-zA-Z0-9_]*|\d+|[=<>+\-*/();,.:]/g;
   
   let insideCommentBlock = false;
    
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        let line = lines[lineIndex];
        
        rowStyle = "";

        let commentIndex = line.indexOf('//');
        if (commentIndex !== -1) {
            line = line.substring(0, commentIndex);
        }

        let startCommentIndex = line.indexOf('{');
        let endCommentIndex = line.indexOf('}');

        if (startCommentIndex !== -1 && endCommentIndex !== -1) {
            line = line.substring(0, startCommentIndex) + line.substring(endCommentIndex + 1);
        }

        if (insideCommentBlock) {
            endCommentIndex = line.indexOf('}');
            if (endCommentIndex !== -1) {
                insideCommentBlock = false;
                line = line.substring(endCommentIndex + 1);
            } else {
                continue;
            }
        }

        startCommentIndex = line.indexOf('{');
        if (startCommentIndex !== -1) {
            insideCommentBlock = true;
            line = line.substring(0, startCommentIndex);
        }
        
        let match;
        while ((match = tokenRegex.exec(line)) !== null) {
            const word = match[0];
            let token;
            if (keywords.includes(word)) {
                if(word.includes("program"))
                {
                    token = "KeyWord_Program";
                }
                if(word.includes("procedure"))
                {
                    token = "KeyWord_Procedure";
                }
                if(word.includes("begin"))
                {
                    token = "KeyWord_Begin";
                } 
                if(word.includes("end"))
                {
                    token = "KeyWord_End";
                }
                if(word.includes("if"))
                {
                    token = "KeyWord_If";
                }
                if(word.includes("then"))
                {
                    token = "KeyWord_Then";
                }
                if(word.includes("else"))
                {
                    token = "KeyWord_Else";
                }
                if(word.includes("while"))
                {
                    token = "KeyWord_While";
                }
                if(word.includes("do"))
                {
                    token = "KeyWord_Do";
                }
                if(word.includes("true"))
                {
                    token = "KeyWord_true";
                }
                if(word.includes("false"))
                {
                    token = "KeyWord_False";
                }  
                
            } else if (operators.includes(word)) {
                if(word.includes("="))
                {
                    token = "Operator_Equivalence";
                }
                if(word.includes("<>"))
                {
                    token = "Operator_Difference";
                }
                if(word.includes("<"))
                {
                    token = "Operator_Lesser";
                }
                if(word.includes("<="))
                {
                    token = "Operator_LesserEquals";
                }
                if(word.includes(">="))
                {
                    token = "Operator_GreaterEquals";
                }
                if(word.includes(">"))
                {
                    token = "Operator_Greater";
                }
                if(word.includes("+"))
                {
                    token = "Operator_Addition";
                }
                if(word.includes("-"))
                {
                    token = "Operator_Subtraction";
                }
                if(word.includes("*"))
                {
                    token = "Operator_Multiplication";
                }
                if(word.includes("and"))
                {
                    token = "Operator_LogicalOperatorAnd";
                }
                if(word.includes("/"))
                {
                    token = "Operator_Division";
                }
                if(word.includes("or"))
                {
                    token = "Operator_LogicalOperatorOr";
                }
                if(word.includes("not"))
                {
                    token = "Operator_LogicalOperatorNot";
                }
                if(word.includes(":="))
                {
                    token = "Operator_Assignment";
                }
                
            } else if(varNames.includes(word))
            {
                if(word.includes("int"))
                {
                    token = "Type_Int";
                }
                if(word.includes("boolean"))
                {
                    token = "Type_Boolean";
                }

            } else if (symbols.includes(word)) {
                if (word === "(") {
                    token = "Symbol_LeftParenthesis";
                } else if (word === ")") {
                    token = "Symbol_RightParenthesis";
                } else if (word === ",") {
                    token = "Symbol_Comma";
                } else if (word === ".") {
                    token = "Symbol_Dot";
                } else if (word === ";") {
                    token = "Symbol_Semicolon";
                } else if (word === ":") {
                    token = "Symbol_Colon";
                }
            } else if (invalidIdentifierRegex.test(word)) {
                token = "Lexicon_Error";
                rowStyle = ' style="background-color: red; color: white;"';
            } else if (floatRegex.test(word)) {
                token = "Number_Float";
            } else if (!isNaN(word)) {
                token = "Number_Int";
            } else {
                token = "Identifier";
            } 

            if (!token.includes("Lexicon_Error"))
            {
                rowStyle = ' style="background-color: white; color: black;"';
            }

            if (word.length > 30) {
                token = "Lexicon_Error";
                rowStyle = ' style="background-color: red; color: white;"';
            }

            const startCol = match.index + 1;
            const endCol = startCol + word.length - 1;
            
            tableHtml += `<tr${rowStyle}><td>${word}</td><td>${token}</td><td>${lineIndex + 1}</td><td>${startCol}</td><td>${endCol}</td></tr>`;
            lextokens.push({'word':word,'token':token});
        }
    }
    
    console.log(lextokens);
    tableHtml += '</tbody></table>';
    document.getElementById('table-container').innerHTML = tableHtml;
}

//function syntAnalysis()
//{
//    let pairs = [];
//    for (let i = 0; i < lextokens.length; i++) {
//        let lex = lextokens[i];

//    }

//}

function updatedSyntaxAnalysis() {

}

function syntAnalysis() {
    if (!lextokens || lextokens.length === 0) {
        alert('Clique em Build antes por favor');
        return;
    }

    let i = 0;
    let stack = ['$', 0];
    let trace = [];
    let ErrorCount = 0;

    function nextToken() {
        return lextokens[i] ? lextokens[i] : { token: '$', word: '$' };
    }

    function getStackContent(stack) {
        return stack.slice().reverse().join(' ');
    }

    function getInputContent() {
        let entrada = [];
        /** /// OLD
        for (let j = i; j < lextokens.length; j++) {
            entrada.push(getTerminal(lextokens[j].token));
        }
        //*/
        for (let j = i; j < lextokens.length; j++) {
            entrada.push(lextokens[j].word);
        }
        entrada.push('$');
        return entrada.join(' ');
    }

    function sincronize(nonTerm) {
        while (i < lextokens.length) {
            let lookahead = nextToken().token;

            if (lookahead === 'type' || lookahead === ';') {
                return;
            }

            trace.push({
                stack: getStackContent(stack),
                input: getInputContent(),
                action: 'Erro (SINC)',
                comment: `Descartando "${nextToken().word}" para recuperar.`
            });
            i++;
        }
    }

    //let debugStackCount = 0;
    while (stack.length > 0) {
        let top = stack.pop();
        let lookahead = nextToken().token;

        trace.push({
            stack: getStackContent(stack.concat([top])),
            input: getInputContent(),
            action: '',
            comment: ''
        });

        console.log(`TOP IS ${top}, LOOKAHEAD is ${lookahead}`);

        if (top === undefined) {
            trace[trace.length - 1].action = 'Produção ε';
            continue;
        } else if (top === '$' && lookahead === '$') {
            trace[trace.length - 1].action = 'Aceitação';
            trace[trace.length - 1].comment = 'Análise concluída com sucesso.';
            break;
        } else if (tableTerm.includes(top)) {
            console.log(`TOP ${top} IS INCLUDED, LOOKAHEAD IS ${lookahead}`);
            if (top === lookahead) {
                console.log(`CONSUMING ${top}`);
                trace[trace.length - 1].action = `Consome "${nextToken().word}"`;
                i++;
            } else {
                trace[trace.length - 1].action = 'Erro (Consumo)';
                trace[trace.length - 1].comment = `Esperado "${top}", encontrado "${nextToken().word}".`;
                ErrorCount++;
                i++;
            }
        } else { 
            let pos = tableTerm.indexOf(lookahead);
            let topName = nonTerminals[top];
            let production = gramTable[topName]?.[pos];
            console.log(`Production #${pos} of ${lookahead} with top #${top} (${topName}) is [${production}]`);
            if (pos < 0 || production.constructor !== Array) {
                trace[trace.length - 1].action = 'Erro (Produção Inválida)';
                trace[trace.length - 1].comment = `Produção inválida para "${topName}".`;
                ErrorCount++;
                sincronize(top);
            } else {
                trace[trace.length - 1].action = `Produção ${top} → ${production.join(' ')}`;
                for (let j = production.length - 1; j >= 0; j--) {
                    //console.log('production add', j, production[j]);
                    stack.push(production[j]);
                }
                //console.log(stack);
            }
        }
        //console.log(`REPEAT COUNT ${debugStackCount}`);
        console.log(stack);
        //if (debugStackCount >= 30) { return; }
        //debugStackCount++;
    }

    buildTraceTable(trace);

    alert(`Erros sintáticos encontrados: ${ErrorCount}`);
}



function buildTraceTable(trace) {
    let tableHtml = '<h3>Tabela Sintática</h3><table border="1"><thead><tr><th>Pilha</th><th>Entrada</th><th>Ação</th><th>Comentário</th></tr></thead><tbody>';

    for (let step of trace) {
        let rowColor = '';
        if (step.action.includes('Erro')) rowColor = ' style="background-color: #f8d7da;"';
        else if (step.action.includes('Consome')) rowColor = ' style="background-color: #d1ecf1;"';
        else if (step.action.includes('Produção')) rowColor = ' style="background-color: #d4edda;"';
        else if (step.action.includes('Aceitação')) rowColor = ' style="background-color: #c3e6cb;"';

        tableHtml += `<tr${rowColor}><td>${step.stack}</td><td>${step.input}</td><td>${step.action}</td><td>${step.comment}</td></tr>`;
    }

    tableHtml += '</tbody></table>';

    document.getElementById('table-container').innerHTML = tableHtml;
}


//Adicionar uma forma de vizualizar a tabela sintática

