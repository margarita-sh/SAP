sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("ns.sap.controller.Game", {
            gameArray: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],

            onMakeStep: function (event) {
                let idSAP = event.getSource().getId();
                console.log(idSAP);
                let id = idSAP.split('--').slice(1).join();
                let coordStep = id.split('_').slice(1).join();
                let coordString = coordStep.split('-').slice(0, 1).join();
                let coordColumn = coordStep.split('-').slice(1).join();
                /*       console.log('this.gameArray', this.gameArray); */
                if (this.gameArray[coordString][coordColumn] === 'X' || this.gameArray[coordString][coordColumn] === '0') {
                    alert('Выберите другую ячейку');
                } else {
                    this.gameArray[coordString][coordColumn] = 'X';
                    let cellUser = document.querySelector('#' + idSAP).classList.add('cross');
                    this.onStepRival();
                }
                console.log(this.gameArray);
            },



            onStepRival: function () {
                setTimeout(() => {
                    for (let i = 0; i < this.gameArray.length; i++) {
                        for (let j = 0; j < this.gameArray.length; j++) {
                                if (this.gameArray[i][j] === '') {
                                   this.gameArray[i][j] = '0';
                                   let idCell = `__xmlview0--box_${i}-${j}`;
                                   console.log(idCell);
                                   let cellRival = document.querySelector('#' + idCell).classList.add('zero');
                                   return;
                               } else {
                                   console.log('something went wrong')
                               } 
                        }
                    }
                }, 500);

            },
            checkWinner: function() {
                if(this.gameArray[0][0] =='X' && this.gameArray[0][1] =='X' && this.gameArray[0][2] =='X' || this.gameArray[1][0] =='X' && this.gameArray[1][1] =='X' && this.gameArray[1][2] =='X' || this.gameArray[2][0] =='X' && this.gameArray[2][1] =='X' && this.gameArray[2][2] =='X' || this.gameArray[0][0] =='X' && this.gameArray[1][1] =='X' && this.gameArray[2][2] =='X') {
                    alert('ТЫ победил')
                }else{
                    alert('Ты проиграл');
                }

            }
        });
    });