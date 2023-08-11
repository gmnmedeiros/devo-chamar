document.addEventListener("DOMContentLoaded", function() {
    const decisionTree = {
        question: "{name} é da família?",
        yes: {
                question: "Mas {name} é família próxima mesmo??",
                    yes: { question: "E {name} mora longe?", 
                           yes: {question: "Você/seus pais teriam que pagar a passagem de {name}?", 
                                    yes:{result: "Vish... não vou me meter nessa não 😶‍🌫️"}, no: {result: "Ué, qual é o B.O. então? Chama, pô"}}, 
                        
                           no: {result: "Achei mto estranho você querer usar esse app pra decidir se convida {name}... Família próxima, po. Tem que chamar.." },
                    
                    no: { question: "Hmmm... você e {name} se falam regularmente?", yes: {result: "Ah, então chama!"},
                        no: {question: "Mas se dão bem nos eventos de família?", yes: {result: "Convida... pelos velhos tempos na casa de vó!"},
                            no: {question: "Seus pais insistem que {name} vá, né?", yes: {result: "É.. tem que chamar."},
                                    no: {result: "Hmmmm, eu não chamaria. 🫥"}}
                    }
                }
            }
        },
        no: {
            question: "{name} está em algum círculo de amigos?",
            yes: {
                question: "Você considera {name} uma amizade próxima?",
                    yes: { result: "Convida! {name} deve ser uma pessoa legal :)" },

                    no: { question: "Você e {name} se falam regularmente?",
                        yes: {question: "Você chamou pessoas do mesmo círculo de amizades que {name}?",
                                yes: {result: "Faz o esforço de chamar, se não vai ficar chato"}}, 
                        
                        no: {question: "{name} te convidou para algum evento importante? Casamento, formatura, torneio de jiu-jitsu da avó, etc?}",
                             yes: {result: "Então chama, pelo menos pela consideração!"},
                             no: {question: "{name} te convidou para os últimos 2 aniversários dela/dele?",
                                    yes: {result: "Pela consideração, 80% de mim convidaria {name}"},
                                    no: {result: "Deixa quieto, chama não kkkk deve nem saber q tu vai casar"}
                                }
                    } 
                }
            },
            no: { question: "{name} é colega de trabalho?",
                yes: { question: "{name} é uma/um BOM colega de trabalho?",
                    yes: {
                        question: "Mas {name} já marcou reunião com você no fim do expediente de uma sexta-feira?",
                            yes: {question: "Era realmente urgente?", 
                                no: {result: "{name} não é uma/um bom colega de trabalho. Não chame." },
                                yes: {question: "{name} já te ajudou o suficiente no trabalho para você sentir que lhe deve vários favores?",
                                    yes: {result: "É melhor chamar (e talvez seja bom vc se esforçar mais no seu trabalho tbm..)"},
                                    no: {question: "Você interage com {name} fora do ambiente de trabalho?", 
                                            no: {result: "Pode jogar um cara ou coroa aí, mas eu não chamaria."},
                                            yes: {result: "É... nesse caso, vale a pena chamar. Parece uma boa amizade."}}
                                }
                        },
                        no: {result: "Deixa quieto.. se {name} achar ruim, você manda reclamarem no RH 💅"}  }

                    }, 
                    no: {result: "Deixa quieto.. se {name} achar ruim, você manda reclamarem no RH 💅"}  },
                
                no: { question: "{name} é seu/sua chefe?",
                      yes: {question: "Você está perto de ganhar uma promoção?",
                            yes: {result: "Chama! Vai que seu presente de casamento não é um aumento?"}, no: {result: "Deixa quieto!"}},
                            
                no: { question: "Valha... não é amigo.. não é família.. não é do trabalho.. não é chefe.. É da tua igreja, então?",
                        no: {result: "Rapaz..  acho que vc já sabe qual é a resposta, né?"},
                        yes: {question: "{name} é seu pastor ou padre?", 
                                yes: {result: "Se for um ministro querido da sua família, eu chamaria :)"},
                            
                                no: {result: "Se {name} fosse uma pessoa próxima, você teria dito que é uma de suas amizades! 👀"}
                            }
            }

                }
        }
        }
    };

    const questionElement = document.getElementById("question");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const backBtn = document.getElementById("backBtn");

    let guestName;
    let previousQuestions = [];

    function startDecisionProcess() {
        guestName = prompt("Qual é o nome do potencial convidado?");

        const heading = document.querySelector("h1");
    heading.textContent = `Chamaremos ${guestName}?`;

        askQuestion(decisionTree);
    }

    function askQuestion(node) {
        questionElement.textContent = formatQuestion(node.question);
        yesBtn.onclick = () => navigateTree(node, "yes");
        noBtn.onclick = () => navigateTree(node, "no");
        
        yesBtn.style.display = "block"; // Garante que o botão "Sim" esteja visível
        noBtn.style.display = "block";  // Garante que o botão "Não" esteja visível
        
        backBtn.style.display = previousQuestions.length > 0 ? "block" : "none"; 
    }

    function formatQuestion(question) {
        return question.replace(/{name}/g, guestName);
    }

    function navigateTree(node, direction) {
        previousQuestions.push({ node: node, direction: direction });
        const nextNode = node[direction];

        if (nextNode.result) {
            questionElement.textContent = formatQuestion(nextNode.result);
            yesBtn.style.display = "none";
            noBtn.style.display = "none";
            backBtn.style.display = "block";
        } else {
            askQuestion(nextNode);
        }
    }

    backBtn.onclick = function() {
        if (previousQuestions.length) {
            previousQuestions.pop(); // Remova a pergunta atual
            const lastState = previousQuestions.pop(); // Obtenha o último estado

            if (lastState) {
                navigateTree(lastState.node, lastState.direction);
            } else {
                startDecisionProcess(); // Se não houver histórico, reinicie o processo
            }
        }
    }
    
    async function copyToClipboard() {
        const pixCode = document.getElementById("pixCode").value;
        try {
            await navigator.clipboard.writeText(pixCode);
            alert("Código Pix copiado!");
        } catch (err) {
            console.error('Falha ao copiar texto: ', err);
            alert("Ocorreu um erro ao copiar o código Pix.");
        }
    }
    
    
    startDecisionProcess();
    
});

document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.querySelector('.pix-box button');
    copyButton.addEventListener('click', async function() {
        const pixCode = document.getElementById("pixCode");
        pixCode.select();

        try {
            await navigator.clipboard.writeText(pixCode.value);

            // Altera a cor do botão para verde
            copyButton.classList.remove('original-color');
            copyButton.classList.add('success-color');

            // Retorna a cor original após 1 segundo
            setTimeout(function() {
                copyButton.classList.remove('success-color');
                copyButton.classList.add('original-color');
            }, 1000);

        } catch (err) {
            console.error('Falha ao copiar texto: ', err);
            alert("Ocorreu um erro ao copiar o código Pix.");
        }
    });
});





    

//     let guestName;

//     function startDecisionProcess() {
//         guestName = prompt("Qual é o nome do potencial convidado?");
//         askQuestion(decisionTree);
//     }

//     function askQuestion(node) {
//         questionElement.textContent = formatQuestion(node.question);

//         yesBtn.onclick = () => navigateTree(node, "yes");
//         noBtn.onclick = () => navigateTree(node, "no");
//     }

//     function formatQuestion(question) {
//         return question.replace(/{name}/g, guestName);
//     }

//     function navigateTree(node, direction) {
//         const nextNode = node[direction];

//         if (nextNode.result) {
//             questionElement.textContent = formatQuestion(nextNode.result);
//             yesBtn.style.display = "none";
//             noBtn.style.display = "none";
//         } else {
//             askQuestion(nextNode);
//         }
//     }

//     startDecisionProcess();
