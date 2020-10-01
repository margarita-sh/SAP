sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("ns.sap.controller.Game", {
            gameState: 'process',
            canToClick: true,

            gameArray: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            winsArray: [
                ['00', '01', '02'],
                ['10', '11', '12'],
                ['20', '21', '22'],
                ['00', '10', '20'],
                ['01', '11', '21'],
                ['02', '12', '22'],
                ['00', '11', '22'],
                ['02', '11', '20'],
            ],

            finishGame: function () {
                this.gameState = 'process';
                this.gameArray = this.gameArray.map(item => item.map(i => ''));
                this.winUser = [];
                this.winAI = [];
                document.querySelectorAll('.zero').forEach(item => item.classList.remove('zero'));
                document.querySelectorAll('.cross').forEach(item => item.classList.remove('cross'));
            },

            onMakeStep: function (event) {
                if (this.gameState !== 'process' || this.canToClick == false) {
                    return;
                }

                let idSAP = event.getSource().getId();
                let id = idSAP.split('--').slice(1).join();
                let coordStep = id.split('_').slice(1).join();
                let coordString = coordStep.split('-').slice(0, 1).join();
                let coordColumn = coordStep.split('-').slice(1).join();
                if (this.gameArray[coordString][coordColumn] === '') {
                    this.gameArray[coordString][coordColumn] = 'X';
                    document.querySelector('#' + idSAP).classList.add('cross');
                    setTimeout(() => {
                        this.checkWins();
                        if (this.gameState !== 'process') {
                            setTimeout(_ => {
                                this.finishGame();
                            }, 1000);
                        } else {
                            this.onStepRival();
                        }
                    }, 0)

                } else {
                    alert('Выберите другую ячейку');
                }
            },

            onStepRival: function () {
                this.canToClick = false;
                setTimeout(() => {
                    const check = () => {
                        this.winsArray.forEach((item) => {
                            if (this.gameArray[1][1] == '') {
                                this.gameArray[1][1] = '0';
                                document.querySelector('#__xmlview0--box_1-1').classList.add('zero');
                                return;
                            } else {
                                let count = 0;
                                item.forEach((data) => {
                                    if (this.winUser.indexOf(data) > -1) {
                                        count++
                                    }
                                })
                                if (count == 2) {
                                    let freeCell = item.filter(i => {
                                        return this.winUser.indexOf(i) === -1;
                                    });
                                    let [i, j] = freeCell.join('').split('');
                                    this.gameArray[i][j] = '0';
                                    document.querySelector(`#__xmlview0--box_${i}-${j}`).classList.add('zero');
                                    return;
                                } else {
                                    for (let i = 0; i < this.gameArray.length; i++) {
                                        for (let j = 0; j < this.gameArray.length; j++) {
                                            if (this.gameArray[i][j] === '') {
                                                console.log(this.gameArray[i][j]);
                                                this.gameArray[i][j] = '0';
                                                document.querySelector(`#__xmlview0--box_${i}-${j}`).classList.add('zero');
                                                // this.checkWins();
                                                // break;
                                            }
                                           
                                            return;
            
                                        }
                                    }
                                }
// this.checkWins();
                            }

                        })
                    };
                    // this.checkWins();
                    check();
                    this.canToClick = true;
                }, 500);
            },

            winUser: [], //filled with X after each move
            winAI: [], //filled with 0 after each move

            checkWins: function () {
                this.winUser = [];
                this.winAI = [];
                for (let i = 0; i < this.gameArray.length; i++) {
                    for (let j = 0; j < this.gameArray.length; j++) {
                        if (this.gameArray[i][j] === 'X') {
                            let cell_i = i.toString();
                            let cell_j = j.toString();
                            this.winUser.push(cell_i + cell_j);
                        } else if (this.gameArray[i][j] === '0') {
                            let cell_i = i.toString();
                            let cell_j = j.toString();
                            this.winAI.push(cell_i + cell_j);
                        }
                    }
                }

                this.winsArray.forEach(element => {
                    let countUser = 0;
                    let countRival = 0
                    element.forEach(item => {
                        if (this.winUser.indexOf(item) > -1) {
                            countUser++
                        }
                    })
                    if (countUser === 3) {
                        alert('You are win!');
                        this.gameState = 'end';
                    }
                });
            }

        });
    });