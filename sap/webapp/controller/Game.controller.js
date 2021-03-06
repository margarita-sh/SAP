sap.ui.define([
    "ns/sap/controller/BaseController"
],
    function (BaseController) {
        "use strict";

        return BaseController.extend("ns.sap.controller.Game", {
            onInit: function () {
                let oRouter, oTarget;
                oRouter = this.getRouter();
                oTarget = oRouter.getTarget("game");
                oTarget.attachDisplay(function (oEvent) {
                    this._oData = oEvent.getParameter("data");	// store the data
                }, this);

                this.getRouter().getRoute("game").attachMatched(this.onRouteMatched, this);

            },

            gameState: 'process',
            canToClick: true,
            winUser: [], //filled with X after each move
            winAI: [], //filled with 0 after each move
            user: "X",
            rival: "0",

            onRouteMatched: function () {
                let oModel = this.getView().getModel("figureUser").oData.figure;
                this.user = oModel;
                this.rival = this.user === "X" ? "O" : "X";
            },

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
                    this.gameArray[coordString][coordColumn] = this.user;
                    document.querySelector('#' + idSAP).classList.add(this.user === 'X' ? 'cross' : 'zero');
                    setTimeout(() => {
                        this.checkWins();
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
                const stepClass = this.rival === 'X' ? 'cross' : 'zero';
                setTimeout(() => {
                    const check = () => {
                        if (this.gameArray[1][1] == '') {
                            this.gameArray[1][1] = this.rival;
                            document.querySelector('#container-sap---game--box_1-1').classList.add(stepClass);
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
                                this.gameArray[i][j] = this.rival
                                document.querySelector(`#container-sap---game--box_${i}-${j}`).classList.add(stepClass);
                            } else if (lastCount_X == 2) {
                                let freeCell = lastItem_X.filter(i => {
                                    return this.winUser.indexOf(i) === -1;
                                });
                                let [i, j] = freeCell.join('').split('');
                                this.gameArray[i][j] = this.rival
                                document.querySelector(`#container-sap---game--box_${i}-${j}`).classList.add(stepClass);
                            } else {
                                for (let i = 0; i < this.gameArray.length; i++) {
                                    for (let j = 0; j < this.gameArray.length; j++) {
                                        if (this.gameArray[i][j] === '') {
                                            this.gameArray[i][j] = this.rival
                                            document.querySelector(`#container-sap---game--box_${i}-${j}`).classList.add(stepClass);
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        setTimeout(() => {
                            this.checkWins();
                            if (this.gameState !== 'process') {
                                setTimeout(() => {
                                    this.finishGame();
                                }, 500);
                            }
                        }, 0);
                    }
                    check();
                    this.canToClick = true;
                }, 500);
            },

            checkWins: function () {
                console.log('this.gameArray', this.gameArray);
                this.winUser = [];
                this.winAI = [];
                for (let i = 0; i < this.gameArray.length; i++) {
                    for (let j = 0; j < this.gameArray[i].length; j++) {
                        if (this.gameArray[i][j] === this.user) {
                            let cell_i = i.toString();
                            let cell_j = j.toString();
                            this.winUser.push(cell_i + cell_j);
                        } else if (this.gameArray[i][j] === this.rival) {
                            let cell_i = i.toString();
                            let cell_j = j.toString();
                            this.winAI.push(cell_i + cell_j);
                        }
                    }
                }
                this.winsArray.forEach(element => {
                    if (this.gameState === 'end') {
                        return;
                    }
                    let countUser = 0;
                    let countRival = 0;
                    element.forEach(item => {
                        if (this.winUser.indexOf(item) > -1) {
                            countUser++
                        } else if (this.winAI.indexOf(item) > -1) {
                            countRival++
                        }
                    })
                    if (this.gameArray.every(item => item.indexOf('') < 0)) {
                        alert('dead heat');
                        this.gameState = 'end';
                    } else if (countRival === 3) {
                        alert('you lose');
                        this.gameState = 'end';
                    } else if (countUser === 3) {
                        alert('You are win!');
                        this.gameState = 'end';
                    }
                });
            },
            onNavBack: function () {
                if (this._oData && this._oData.fromTarget) {
                    this.getRouter().getTargets().display(this._oData.fromTarget);
                    delete this._oData.fromTarget;
                    return;
                }
                BaseController.prototype.onNavBack.apply(this, arguments);
            },


        });
    });