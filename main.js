// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,
    mutate (base) {
      let newBase = Math.floor(Math.random() * this.dna.length); //selects random base in dna
      let changeBase = returnRandBase(); //generates random dna base

      if (changeBase === this.dna[newBase]) { // rerolls if previous dna base is equal to the changed value
        changeBase = returnRandBase();
      } else {
        this.dna[newBase] = changeBase; // changes selected base to the new value
      }
      return this.dna; //returns changed array
      },

      compareDNA (object) {
        let sameValue = 0;
        for (let i = 0; i <= this.dna.length-1; i++) {
          for (let j = 0; j <= object.dna.length-1; j++) {
            if (object.dna[j] === this.dna[i] && j === i) {
              sameValue++;
            }
          }
        }
        let samePercentage = ((sameValue / this.dna.length) * 100).toFixed(0); //calculates percantage of identical dna 
        console.log(`Specimen ${this.specimenNum} and specimen ${object.specimenNum} share ${samePercentage}% of their dna`);
      },

      willLikelySurvive () {
        let numOfCG = 0;
        for (let i = 0; i <= this.dna.length-1; i++) {
          if ((this.dna[i] === 'C') || (this.dna[i] === 'G')) {
            numOfCG++;
          }
        }
        let cGPercentage = ((numOfCG / this.dna.length) * 100).toFixed();
        if (cGPercentage > 60) {
          return true;
        } else {
          return false;
        }
      },
    }
  };


let willSurvive = [];
const generate30 = () => {
  for (let i = 0; willSurvive.length < 30; i++) {
    let pAequor = pAequorFactory(i, mockUpStrand());
    if (pAequor.willLikelySurvive() === true) {
      willSurvive.push(pAequor);
    }
  }
  return willSurvive;
}

//console.log(pAequorFactory(1, mockUpStrand()));
//const pAequor1 = (pAequorFactory(1, mockUpStrand()));
//const pAequor2 = (pAequorFactory(2, mockUpStrand()));
console.log(generate30());
//pAequor1.compareDNA(pAequor2);
//console.log(pAequor1.willLikelySurvive());
//console.log(pAequor1);
//console.log(pAequor1.mutate());