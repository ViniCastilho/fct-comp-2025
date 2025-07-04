nonTerminals = [
    'program',
    'block',
    'variable_declaration_part',
    'variable_declaration_prime',
    'variable_declaration',
    'type',
    'identifier_list',
    'identifier_list_prime',
    'subroutine_declaration_part',
    'procedure_declaration_prime',
    'procedure_declaration',
    'formal_parameters',
    'formal_parameters_prime',
    'formal_parameters_section',
    'var',
    'compound_command',
    'compound_command_prime',
    'command',
    'command_prime',
    'assignment',
    'procedure_call',
    'procedure_call_prime',
    'conditional_command',
    'KeyWord_Else',
    'repeatable_command',
    'expression',
    'expression_prime',
    'relational',
    'simple_expression',
    'operation_a',
    'simple_expression_prime',
    'operation_b',
    'term',
    'term_prime',
    'operation_c',
    'factor',
    'variable',
    'variable_prime',
    'expression_list',
    'expression_list_prime',
    'number',
    'identifier',
];

nts = {};

for (let i = 0; i < nonTerminals.length; i++) {
    let name = nonTerminals[i];
    nts[name] = i;
}

gram = {};

gram[nts.program] = [
    ['KeyWord_Program', nts.identifier, 'Symbol_Semicolon', nts.block, 'Symbol_Dot'],
];

gram[nts.block] = [
    [nts.variable_declaration_part, nts.subroutine_declaration_part, nts.compound_command],
];

gram[nts.variable_declaration_part] = [
    [nts.variable_declaration, 'Symbol_Semicolon', nts.variable_declaration_prime],
    [],
];

gram[nts.variable_declaration_prime] = [
    [nts.variable_declaration, nts.variable_declaration_prime, 'Symbol_Semicolon'],
    [],
];

gram[nts.variable_declaration] = [
    [nts.type, nts.identifier_list]
];

gram[nts.type] = /^int|boolean$/;

gram[nts.identifier_list] = [
    [nts.identifier, nts.identifier_list_prime],
];

gram[nts.identifier_list_prime] = [
    ['Symbol_Comma', nts.identifier, nts.identifier_list_prime],
    [],
];

gram[nts.subroutine_declaration_part] = [
    [nts.procedure_declaration, 'Symbol_Semicolon', nts.procedure_declaration_prime],
    [],
];

gram[nts.procedure_declaration_prime] = [
    [nts.procedure_declaration, nts.procedure_declaration_prime, 'Symbol_Semicolon'],
    [],
];

gram[nts.procedure_declaration] = [
    ['KeyWord_Procedure', nts.identifier, nts.formal_parameters, 'Symbol_Semicolon', nts.block],
];

gram[nts.formal_parameters] = [
    ['Symbol_LeftParenthesis', nts.formal_parameters_section, nts.formal_parameters_prime, 'Symbol_RightParenthesis'],
    [],
];

gram[nts.formal_parameters_prime] = [
    ['Symbol_Semicolon', nts.formal_parameters_section, nts.formal_parameters_prime],
    [],
];

gram[nts.formal_parameters_section] = [
    [nts.var, nts.identifier_list, 'Symbol_Colon', nts.identifier]
];

gram[nts.var] = /^(var|)$/;

gram[nts.compound_command] = [
    ['KeyWord_Begin', nts.command, nts.compound_command_prime, 'KeyWord_End'],
];

gram[nts.compound_command_prime] = [
    ['Symbol_Semicolon', nts.command, nts.compound_command_prime],
    [],
];

gram[nts.command] = [
    [nts.identifier, nts.command_prime],
    [nts.conditional_command],
    [nts.repeatable_command],
    [nts.compound_command],
];

gram[nts.command_prime] = [
    ['Operator_Assignment', nts.expression],
    ['Symbol_LeftParenthesis', nts.procedure_call_prime],
];

gram[nts.assignment] = [
    [nts.variable, 'Operator_Assignment', nts.expression],
];

gram[nts.procedure_call] = [
    [nts.identifier, nts.procedure_call_prime],
    [],
];

gram[nts.procedure_call_prime] = [
    [nts.expression_list, 'Symbol_RightParenthesis'],
    [],
];

gram[nts.conditional_command] = [
    ['KeyWord_If', nts.expression, 'KeyWord_Then', nts.command, nts.else],
];

gram[nts.else] = [
    ['KeyWord_Else', nts.command],
    [],
];

gram[nts.repeatable_command] = [
    ['KeyWord_While', nts.expression, 'KeyWord_Do', nts.command],
];

gram[nts.expression] = [
    [nts.simple_expression, nts.expression_prime],
];

gram[nts.expression_prime] = [
    [nts.relational, nts.expression_prime],
    [],
];

gram[nts.relational] = [
    ['Operator_Lesser'], ['Operator_Equivalence'], ['Operator_Greater'],
    ['Operator_LesserEquals'], ['Operator_Difference'], ['Operator_GreaterEquals'],
];

gram[nts.simple_expression] = [
    [nts.operation_a, nts.term, nts.simple_expression_prime],
];

gram[nts.operation_a] = [
    ['Operator_Addition'], ['Operator_Subtraction'], [],
];

gram[nts.simple_expression_prime] = [
    [nts.operation_b, nts.term, nts.simple_expression_prime],
    [],
];

gram[nts.operation_b] = [
    ['Operator_Addition'], ['Operator_Subtraction'], ['Operator_LogicalOperatorOr'],
];

gram[nts.term] = [
    [nts.factor, nts.term_prime],
];

gram[nts.term_prime] = [
    [nts.operation_c, nts.factor, nts.term_prime],
    []
];

gram[nts.operation_c] = [
    ['Operator_Multiplication'], ['Operator_Division'], ['Operator_LogicalOperatorAnd'],
];

gram[nts.factor] = [
    [nts.variable],
    [nts.number],
    ['Symbol_LeftParenthesis', nts.expression, 'Symbol_RightParenthesis'],
    ['Operator_LogicalOperatorNot', nts.factor],
];

gram[nts.variable] = [
    [nts.identifier, nts.variable_prime],
];

gram[nts.variable_prime] = [
    ['Symbol_LeftBracket', nts.expression, 'Symbol_RightBracket'],
    ['Symbol_LeftParenthesis', nts.expression_list, 'Symbol_RightParenthesis'],
    [],
];

gram[nts.expression_list] = [
    [nts.expression, nts.expression_list_prime],
];

gram[nts.expression_list_prime] = [
    ['Symbol_Comma', nts.expression, nts.expression_list_prime],
    []
];

gram[nts.number] = /^[0-9]+$/;

gram[nts.identifier] = /^[a-zA-Z_][a-zA-Z_0-9]*$/;

for (let [k,v] of Object.entries(gram)) {
    if (k === undefined || v === undefined) {
        console.log('UNDEFINED DETECTED');
    }
}
console.log('UNDEFINED SEARCH COMPLETE');

tableTerm = [
    'KeyWord_Program',
    'Type_Int',
    'Type_Boolean',
    'Symbol_Dot',
    'Symbol_Semicolon',
    'KeyWord_Procedure',
    'KeyWord_Begin',
    'Identifier',
    'Symbol_Colon',
    'Symbol_Comma',
    'Symbol_LeftParenthesis',
    'Symbol_RightParenthesis',
    'KeyWord_Var',
    'KeyWord_End',
    'KeyWord_Else',
    'KeyWord_If',
    'KeyWord_While',
    'Operator_Assignment',
    'Operator_Addition',
    'Operator_Subtraction',
    'Number_Int',
    'Operator_LogicalOperatorNot',
    'Operator_Equivalence',
    'Operator_Difference',
    'Operator_Lesser',
    'Operator_LesserEquals',
    'Operator_GreaterEquals',
    'Operator_Greater',
    'KeyWord_Then',
    'KeyWord_Do',
    'Symbol_LeftBracket',
    'Operator_LogicalOperatorOr',
    'Operator_Multiplication',
    'Operator_Division',
    'Operator_LogicalOperatorAnd',
    'Symbol_RightBracket',
    '$',
];

gramTable = {
    'program': [
        ['KeyWord_Program', nts.identifier, 'Symbol_Semicolon', nts.block, 'Symbol_Dot'],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
    ],
    'block': [
        ERRO,
        [nts.variable_declaration_part, nts.subroutine_declaration_part, nts.compound_command],
        [nts.variable_declaration_part, nts.subroutine_declaration_part, nts.compound_command],
        [],
        [],
        [nts.variable_declaration_part, nts.subroutine_declaration_part, nts.compound_command],
        [nts.variable_declaration_part, nts.subroutine_declaration_part, nts.compound_command],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'variable_declaration_part': [
        ERRO,
        [nts.variable_declaration, 'Symbol_Semicolon', nts.variable_declaration_prime],
        [nts.variable_declaration, 'Symbol_Semicolon', nts.variable_declaration_prime],
        [],
        [],
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'variable_declaration_prime': [
        ERRO,
        [nts.variable_declaration, nts.variable_declaration_prime, 'Symbol_Semicolon'],
        [nts.variable_declaration, nts.variable_declaration_prime, 'Symbol_Semicolon'],
        [],
        [],
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'variable_declaration': [
        ERRO,
        [nts.type, nts.identifier_list],
        [nts.type, nts.identifier_list],
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'type': [
        ERRO,
        ['Type_Int'],
        ['Type_Boolean'],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'identifier_list': [
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        [nts.identifier, nts.identifier_list_prime],
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'identifier_list_prime': [
        ERRO,
        [],
        [],
        [],
        [],
        [],
        [],
        ERRO,
        [],
        ['Symbol_Comma', nts.identifier, nts.identifier_list_prime],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'subroutine_declaration_part': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [nts.procedure_declaration, 'Symbol_Semicolon', nts.procedure_declaration_prime],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'procedure_declaration_prime': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [],
        [nts.procedure_declaration, nts.procedure_declaration_prime, 'Symbol_Semicolon'],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'procedure_declaration': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        ['KeyWord_Procedure', nts.identifier, nts.formal_parameters, 'Symbol_Semicolon', nts.block],
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'formal_parameters': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ['Symbol_LeftParenthesis', nts.formal_parameters_section, nts.formal_parameters_prime, 'Symbol_RightParenthesis'],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'formal_parameters_prime': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ['Symbol_Semicolon', nts.formal_parameters_section, nts.formal_parameters_prime],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'formal_parameters_section': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [],
        ERRO,
        ERRO,
        [nts.var, nts.identifier_list, 'Symbol_Colon', nts.type],
        ERRO,
        ERRO,
        ERRO,
        [],
        [nts.var, nts.identifier_list, 'Symbol_Colon', nts.type],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'var': [
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'compound_command': [
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ['KeyWord_Begin', nts.command, nts.compound_command_prime, 'KeyWord_End'],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'compound_command_prime': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ['Symbol_Semicolon', nts.command, nts.compound_command_prime],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'command': [
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        [nts.compound_command],
        [nts.identifier, nts.command_prime],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        [nts.conditional_command],
        [nts.repeatable_command],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'command_prime': [
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ['Symbol_LeftParenthesis', nts.procedure_call_prime],
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ['Operator_Assignment', nts.expression],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'assignment': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [nts.variable, 'Operator_Assignment', nts.expression],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'procedure_call': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [nts.identifier, nts.procedure_call_prime],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'procedure_call_prime': [
        ERRO,
        ERRO,
        ERRO,
        [],
        [],
        [],
        [],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        ERRO,
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        ERRO,
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        [nts.expression_list, 'Symbol_RightParenthesis'],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'conditional_command': [
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ['KeyWord_If', nts.expression, 'KeyWord_Then', nts.command, nts.else],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'KeyWord_Else': [
        ERRO,
        ERRO,
        ERRO,
        [],
        [],
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [],
        ['KeyWord_Else', nts.command],,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'repeatable_command': [
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ['KeyWord_While', nts.expression, 'KeyWord_Do', nts.command],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'expression': [
        ERRO,
        ERRO,
        ERRO,
        [],
        [],
        [],
        [],
        [nts.simple_expression, nts.expression_prime],
        ERRO,
        [],
        [nts.simple_expression, nts.expression_prime],
        [],
        ERRO,
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        [nts.simple_expression, nts.expression_prime],
        [nts.simple_expression, nts.expression_prime],
        [nts.simple_expression, nts.expression_prime],
        [nts.simple_expression, nts.expression_prime],
        [nts.simple_expression, nts.expression_prime],
        [nts.simple_expression, nts.expression_prime],
        [nts.simple_expression, nts.expression_prime],
        [nts.simple_expression, nts.expression_prime],
        [nts.simple_expression, nts.expression_prime],
        [nts.simple_expression, nts.expression_prime],
        [],
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'expression_prime': [
        ERRO,
        ERRO,
        ERRO,
        [],
        [],
        [],
        [],
        ERRO,
        ERRO,
        [],
        ERRO,
        [],
        ERRO,
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [nts.relational, nts.expression_prime],
        [nts.relational, nts.expression_prime],
        [nts.relational, nts.expression_prime],
        [nts.relational, nts.expression_prime],
        [nts.relational, nts.expression_prime],
        [nts.relational, nts.expression_prime],
        [],
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'relational': [
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ['Operator_Equivalence'],
        ['Operator_Difference'],
        ['Operator_Lesser'],
        ['Operator_LesserEquals'],
        ['Operator_GreaterEquals'],
        ['Operator_Greater'],
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'simple_expression': [
        ERRO,
        ERRO,
        ERRO,
        [],
        [],
        [],
        [],
        [nts.operation_a, nts.term, nts.simple_expression_prime],
        ERRO,
        [],
        [nts.operation_a, nts.term, nts.simple_expression_prime],
        [],
        ERRO,
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        [nts.operation_a, nts.term, nts.simple_expression_prime],
        [nts.operation_a, nts.term, nts.simple_expression_prime],
        [nts.operation_a, nts.term, nts.simple_expression_prime],
        [nts.operation_a, nts.term, nts.simple_expression_prime],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'operation_a': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        [],
        ERRO,
        ERRO,
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ['Operator_Addition'],
        ['Operator_Subtraction'],
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'simple_expression_prime': [
        ERRO,
        ERRO,
        ERRO,
        [],
        [],
        [],
        [],
        ERRO,
        ERRO,
        [],
        ERRO,
        [],
        ERRO,
        [],
        [],
        ERRO,
        ERRO,
        ERRO,
        [nts.operation_b, nts.term, nts.simple_expression_prime],
        [nts.operation_b, nts.term, nts.simple_expression_prime],
        ERRO,
        ERRO,
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [nts.operation_b, nts.term, nts.simple_expression_prime],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'operation_b': [
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ['Operator_Addition'],
        ['Operator_Subtraction'],
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ['Operator_LogicalOperatorOr'],
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'term': [
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        [nts.factor, nts.term_prime],
        ERRO,
        TOKEN_SYNC,
        [nts.factor, nts.term_prime],
        TOKEN_SYNC,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        TOKEN_SYNC,
        TOKEN_SYNC,
        [nts.factor, nts.term_prime],
        [nts.factor, nts.term_prime],
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        TOKEN_SYNC,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
        ERRO,
    ],
    'term_prime': [
        ERRO,
		ERRO,
		ERRO,
		[],
		[],
		[],
		[],
		ERRO,
		ERRO,
		[],
		ERRO,
		[],
		ERRO,
		[],
		[],
		ERRO,
		ERRO,
		ERRO,
		[],
		[],
		ERRO,
		ERRO,
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[nts.operation_c, nts.factor, nts.term_prime],
		[nts.operation_c, nts.factor, nts.term_prime],
		[nts.operation_c, nts.factor, nts.term_prime],
		ERRO,
		ERRO
    ],
    'operation_c': [
        ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		['Operator_Multiplication'],
		['Operator_Division'],
		['Operator_LogicalOperatorAnd'],
		ERRO,
		ERRO
    ],
    'factor': [
        ERRO,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		[nts.variable],
		ERRO,
		TOKEN_SYNC,
	    ['Symbol_LeftParenthesis', nts.expression, 'Symbol_RightParenthesis'],
		TOKEN_SYNC,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
        [nts.number],
        ['Operator_LogicalOperatorNot', nts.factor],
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO
    ],
    'variable': [
        ERRO,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		[nts.identifier, nts.variable_prime],
		ERRO,
		TOKEN_SYNC,
		ERRO,
		TOKEN_SYNC,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO
    ],
    'variable_prime': [
        ERRO,
		ERRO,
		ERRO,
		[],
		[],
		[],
		[],
		ERRO,
		ERRO,
		[],
		['Symbol_LeftParenthesis', nts.expression_list, 'Symbol_RightParenthesis'],
		[],
		ERRO,
		[],
		[],
		ERRO,
		ERRO,
		[],
		[],
		[],
		ERRO,
		ERRO,
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		['Symbol_LeftBracket', nts.expression, 'Symbol_RightBracket'],
		ERRO
    ],
    'expression_list': [
        ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		[nts.expression, nts.expression_list_prime],
		ERRO,
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		[],
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		[nts.expression, nts.expression_list_prime],
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
    ],
    'expression_list_prime': [
        ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		['Symbol_Comma', nts.expression, nts.expression_list_prime],
		ERRO,
		[],
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
		ERRO,
    ],
    'number': [
        ERRO,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		ERRO,
		TOKEN_SYNC,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		['Number_Int'],
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO,
    ],
    'identifier': [
        ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		['Identifier'],
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
		ERRO,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		TOKEN_SYNC,
		ERRO,
    ],
};