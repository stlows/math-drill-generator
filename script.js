var app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    settings: {
      numbers: [4,4],
      operands: ["+", "–","×","÷"],
      jsOperands: ["+", "-","*","/"],
      colonnes: 3,
      afficherReponses: false,
      titreDocument: "Exercices"
    },
    numbers: [[1,2,3,4,5,6,7,8,9,10,11,12],[1,2,3,4,5,6,7,8,9,10,11,12]],
    operands:["+","–"],
    numberOfQuestion: 40,
    allowNegativeAnswer: false,
    results: [],
    showExercices: false,
    erreurSoustraction: false,
    erreurNombresVides: false,
    erreurOperandesVides: false,
  },
  created(){
    console.log("v1.0.2")
    console.log("Created by Vincent Beaulieu")
  },
  methods: {
    notValid(){
      if(this.operands.indexOf("–") > -1 && !this.allowNegativeAnswer && Math.max(...this.numbers[0]) - Math.min(...this.numbers[1]) < 0){
        this.erreurSoustraction = true
        return true
      }
      if(this.numbers[0].length == 0 || this.numbers[1].length == 0){
        this.erreurNombresVides = true
        return true
      }
      if(this.operands.length == 0){
        this.erreurOperandesVides = true
        return true
      }
    },
    generate(){
      this.erreurNombresVides = false
      this.erreurSoustraction = false
      this.erreurOperandesVides = false
      if(this.notValid()){
        this.showExercices = false
        return
      }
      this.results = []
      for(let i = 0; i < this.numberOfQuestion; i++){
        let operand = this.operands[Math.floor(Math.random()*this.operands.length)];
        let twoNumbers = this.getTwoNumbers();

        if(operand === "–"){
          if(!this.allowNegativeAnswer){
            while(twoNumbers.first - twoNumbers.second < 0){
              twoNumbers = this.getTwoNumbers()
            }
          }
        }
        if(operand === "÷"){
          let result = twoNumbers.first * twoNumbers.second
          twoNumbers.first = result
        }
        this.results.push(
          {
            q:`${twoNumbers.first} ${operand} ${twoNumbers.second} = `,
            a: eval(`${twoNumbers.first} ${this.settings.jsOperands[this.settings.operands.indexOf(operand)]} ${twoNumbers.second}`)
          })
      }
      this.showExercices = true
    },
    getTwoNumbers(){
      return {
        first: this.numbers[0][Math.floor(Math.random()*this.numbers[0].length)],
        second: this.numbers[1][Math.floor(Math.random()*this.numbers[1].length)]
      }
    },
    selectAllNumbers(idx){
      this.$set(this.numbers, idx, [])
      for(let i = 0; i < this.settings.numbers[idx] * 5; i++){
        this.numbers[idx].push(i + 1)
      }
    },
    unselectAllNumbers(idx){
      this.$set(this.numbers, idx, [])
    },
    pdf(){
      var sTable = document.getElementById('exercices').innerHTML;
        var style = "<style>";
        style = style + "body {font: 25px Calibri;}";
        style = style + "table {width: 100%;border-collapse: collapse;}";
        style = style + "td {border: solid 1px #bbb; padding: 10px; text-align: right;}";
        style = style + "td.answer {width:100px;text-align:center;}";
        style = style + "</style>";

        // CREATE A WINDOW OBJECT.
        var win = window.open('', '', 'height=700,width=700');

        win.document.write('<html><head>');
        win.document.write('<title>' + this.settings.titreDocument + '</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');

        win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    }
  }
})