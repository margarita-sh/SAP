sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("ns.sap.controller.Game", {
            gameState: 'process',
            canToClick: true,
            winUser: [], //filled with X after each move
            winAI: [], //filled with 0 after each move

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
                this.checkWins();
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
                        // this.checkWins();
                        if (this.gameState !== 'process') {
                            setTimeout(() => {
                                this.finishGame();
                            }, 1000);
                        } else {
                            this.onStepRival();
                        }
                    }, 0);
                } else {
                    alert('Выберите другую ячейку');
                }
            },

            onStepRival: function () {
                this.canToClick = false;
                setTimeout(() => {
                    this.checkWins();
                      if (this.gameState !== 'process') {
                        setTimeout(() => {
                            this.finishGame();
                        }, 1000);
                    } else {
                        // this.checkWins();
                    const check = () => {
                        //  this.checkWins();
                        if (this.gameArray[1][1] == '') {
                            this.gameArray[1][1] = '0';
                            document.querySelector('#__xmlview0--box_1-1').classList.add('zero');
                        } else {
                            let lastCount_X = 0;
                            let lastCount_0 = 0;
                            let lastItem_X = [];
                            let lastItem_0 = [];
                            for (let item of this.winsArray) {
                                let count_X = 0;
                                let count_0 = 0;
                                let totalCount = 0;
                                item.forEach((data) => {
                                    if (this.winUser.indexOf(data) > -1) {
                                        count_X++;
                                    } else if (this.winAI.indexOf(data) > -1) {
                                        count_0++;
                                    }
                                    const [i, j] = data.split('');
                                    if (this.gameArray[i][j]) {
                                        totalCount++;
                                    }
                                });

                                if (count_0 > lastCount_0 && totalCount < 3) {
                                    lastCount_0 = count_0;
                                    lastItem_0 = item;
                                } else if (count_X > lastCount_X && totalCount < 3) {
                                    lastCount_X = count_X;
                                    lastItem_X = item;
                                }
                            }
                            if (lastCount_0 == 2) {
                                let freeCell = lastItem_0.filter(i => {
                                    return this.winAI.indexOf(i) === -1;
                                });
                                let [i, j] = freeCell.join('').split('');
                                this.gameArray[i][j] = '0';
                                document.querySelector(`#__xmlview0--box_${i}-${j}`).classList.add('zero');
                            } else if (lastCount_X == 2) {
                                let freeCell = lastItem_X.filter(i => {
                                    return this.winUser.indexOf(i) === -1;
                                });
                                let [i, j] = freeCell.join('').split('');
                                this.gameArray[i][j] = '0';
                                document.querySelector(`#__xmlview0--box_${i}-${j}`).classList.add('zero');
                            } else {
                                for (let i = 0; i < this.gameArray.length; i++) {
                                    for (let j = 0; j < this.gameArray.length; j++) {
                                        if (this.gameArray[i][j] === '') {
                                            this.gameArray[i][j] = '0';
                                            document.querySelector(`#__xmlview0--box_${i}-${j}`).classList.add('zero');
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                     check();
                        // this.checkWins();
                        this.canToClick = true;
                }
     
                }, 500);
            },

            checkWins: function () {
                /*  this.winUser = [];
                this.winAI = [];
                for (let i = 0; i < this.gameArray.length; i++) {
                    for (let j = 0; j < this.gameArray[i].length; j++) {
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
                let lastCount_User = 0;
                let lastCount_Rival = 0;
                let lastItem_User = [];
                let lastItem_Rival = [];

                for (let element of this.winsArray) {
                    let countUser = 0;
                    let countRival = 0;
                    let totalCount = 0;
                    for (let item of element) {
                        if (this.winUser.indexOf(item) > -1) {
                            countUser++
                        } else if (this.winAI.indexOf(item) > -1) {
                            countRival++
                        }
                        const [i, j] = item.split('');
                        if (this.gameArray[i][j]) {
                            totalCount++;
                        }
                    }
                        if (countRival > lastCount_Rival && totalCount < 3) {
                            lastCount_Rival = countRival;
                            lastItem_Rival = element;
                        } else if (countUser > lastCount_User && totalCount < 3) {
                            lastCount_User = countUser;
                            lastItem_User = element;
                        }

                    }


                    if (this.gameArray.indexOf('') > -1) {
                        alert('ничья');
                        this.gameState = 'end';
                    } else if (lastCount_Rival === 3) {
                        alert('you lose');
                        this.gameState = 'end';
                    } else if (lastCount_User === 3) {
                        alert('You are win!');
                        this.gameState = 'end';
                    }
                    console.log('lastCount_Rival', lastCount_Rival);
                    console.log('lastCount_User', lastCount_User);

                }
 */
                this.winUser = [];
                this.winAI = [];
                for (let i = 0; i < this.gameArray.length; i++) {
                    for (let j = 0; j < this.gameArray[i].length; j++) {
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
                    let countRival = 0;
                    element.forEach(item => {
                        if (this.winUser.indexOf(item) > -1) {
                            countUser++
                        } else if (this.winAI.indexOf(item) > -1) {
                            countRival++
                        }
                    })
                    if (this.gameArray.indexOf('') > -1) {
                        alert('ничья');
                        this.gameState = 'end';
                    } else if (countRival === 3) {
                        alert('you lose');
                        this.gameState = 'end';
                    } else if (countUser === 3) {
                        alert('You are win!');
                        this.gameState = 'end';
                    }
                });

            }

        });
    });