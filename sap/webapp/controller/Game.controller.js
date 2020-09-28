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
            // cellRival : '',
            // cellUser : '',


            onMakeStep: function (event) {
                let idSAP = event.getSource().getId();
                // console.log('idSAP', idSAP);
                let id = idSAP.split('--').slice(1).join();
                let coordStep = id.split('_').slice(1).join();
                let coordString = coordStep.split('-').slice(0, 1).join();
                let coordColumn = coordStep.split('-').slice(1).join();
                if (this.gameArray[coordString][coordColumn] === 'X' || this.gameArray[coordString][coordColumn] === '0') {
                    alert('Выберите другую ячейку');
                } else {
                    this.gameArray[coordString][coordColumn] = 'X';
                    let cellUser = document.querySelector('#' + idSAP).classList.add('cross');
                    this.checkWins();
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

            checkWins: function () {
                let c = [];
                for (let i = 0; i < this.gameArray.length; i++) {
                    for (let j = 0; j < this.gameArray.length; j++) {
                        if (this.gameArray[i][j] === 'X') {
                            let cell_i = i.toString();
                            let cell_j = j.toString();
                            c.push(cell_i + cell_j);
                        }
                    }
                }

                this.winsArray.forEach(element => {
                     if(JSON.stringify(element) == JSON.stringify(c)){
                         alert('ТЫ ПОБЕДИИИЛ');
                        //  console.log(this.cellUser);
                        // this.cellUser.className.remove();
                        // this.cellRival.className.remove('zero');
                     }
                });

            }

           
        });
    });