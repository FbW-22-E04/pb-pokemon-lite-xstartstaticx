/**
 * things to do still:
 * 1. when a pokemon is dead, they stay dead. || "you win, play again?"
 * 2. if - max health > max health, return normal max health. (dont exceed max health, max magic?)
 * 3. after game over/you win - play again -comes, do you gain exp? do you gain levels? do you evolve after enough levels?
 * 4. make colors for pokemon name, another color for word status, hp, mp
 * pokemon attack etc.
 * 5. animate after everything else is done / when have spare time
 *
 */
class Pokemon {
  constructor(name, health, magic) {
    this.name = name;
    this.health = health;
    this.magic = magic;
    this.skills = []; // or {} ?
  }

  learnAttackSkill(obj) {
    this.skills.push(obj);
  }

  showStatus() {
    console.log(
      `${this.name}'s status: \n HP: ${this.health} \n MP: ${this.magic}`
    );
  }

  attack(idx, opponent) {
    if (this.magic >= this.skills[idx].magicRequired) {
      this.magic -= this.skills[idx].magicRequired;
      console.log(
        `${this.name} used ${this.skills[idx].attackName} successfully!`
      );
      console.log("...");
      opponent.health -= this.skills[idx].attackDamage;
      console.log(
        `${opponent.name} received ${this.skills[idx].attackDamage} damage!!`
      );
      if (opponent.health <= 0) {
        console.log("...");
        console.log(`${opponent.name} fainted!`);
        return (opponent.health = 0);
      }
    } else {
      console.log("Not enough magic, cannot launch attack!");
    }
  }

  getMagic(idx, opponent) {
    this.magic += this.skills[idx].magicRecovered;
    opponent.health -= this.skills[idx].attackDamage;
    console.log(
      `${this.name} used ${this.skills[idx].attackName} successfully!`
    );
    console.log("...");
    console.log(
      `${this.name} recovered ${this.skills[idx].magicRecovered} MP!!`
    );
    if (opponent.health <= 0) {
      console.log("...");
      console.log(`${opponent.name} fainted!`);
      return (opponent.health = 0);
    }
  }
  // i think this section is good
  getHealth(idx) {
    this.health += this.skills[idx].healthRecovered;
    // opponent.health -= this.skills[idx].attackDamage;
    console.log(
      `${this.name} used ${this.skills[idx].attackName} successfully!`
    );
    console.log("...");
    console.log(
      `${this.name} recovered ${this.skills[idx].healthRecovered} HP!!`
    );
    // if (opponent.health <= 0) {
    //   console.log("...");
    //   console.log(`${opponent.name} fainted!`);
    //   return (opponent.health = 0);
    // }
  }
}
class AttackSkill {
  constructor(attackName, attackDamage, magicRequired) {
    this.attackName = attackName;
    this.attackDamage = attackDamage;
    this.magicRequired = magicRequired;
  }
}
class mpSkill {
  constructor(attackName, attackDamage, magicRecovered) {
    this.attackName = attackName;
    this.attackDamage = attackDamage;
    this.magicRecovered = magicRecovered;
  }
}
class hpSkill {
  constructor(attackName, attackDamage, healthRecovered) {
    this.attackName = attackName;
    this.attackDamage = attackDamage;
    this.healthRecovered = healthRecovered;
  }
}

//  mp/hp skills shared among pokemon
let mpGrowl = new mpSkill("MP Growl", 10, 50);
let mpTackle = new mpSkill("MP Tackle", 10, 50);
let hpHeal = new hpSkill("HP Heal", 0, 60);
let hpRecover = new hpSkill("HP Recover", 0, 60);

// pikachu
let pikachu = new Pokemon("Pikachu", 100, 70);
let spark = new AttackSkill("Spark", 20, 30);
let thunderbolt = new AttackSkill("Thunderbolt", 50, 70);
pikachu.learnAttackSkill(mpGrowl);
pikachu.learnAttackSkill(hpHeal);
pikachu.learnAttackSkill(spark);
pikachu.learnAttackSkill(thunderbolt);
// console.log(pikachu);
// pikachu.showStatus();

// bulbasaur
let bulbasaur = new Pokemon("Bulbasaur", 90, 80);
let leechSeed = new AttackSkill("Leech Seed", 20, 30);
let solarBeam = new AttackSkill("Solar Beam", 60, 80);
bulbasaur.learnAttackSkill(mpGrowl);
bulbasaur.learnAttackSkill(hpHeal);
bulbasaur.learnAttackSkill(leechSeed);
bulbasaur.learnAttackSkill(solarBeam);
// console.log(bulbasaur);
// bulbasaur.showStatus();

// charmander
let charmander = new Pokemon("Charmander", 110, 60);
let ember = new AttackSkill("Ember", 20, 20);
let flamethrower = new AttackSkill("Flamethrower", 40, 60);
charmander.learnAttackSkill(mpTackle);
charmander.learnAttackSkill(hpRecover);
charmander.learnAttackSkill(ember);
charmander.learnAttackSkill(flamethrower);
// console.log(charmander);
// charmander.showStatus();

// squirtle
let squirtle = new Pokemon("Squirtle", 100, 70);
let waterGun = new AttackSkill("Water Gun", 20, 30);
let hydroPump = new AttackSkill("Hydro Pump", 50, 70);
squirtle.learnAttackSkill(mpTackle);
squirtle.learnAttackSkill(hpRecover);
squirtle.learnAttackSkill(waterGun);
squirtle.learnAttackSkill(hydroPump);
// console.log(squirtle);
// squirtle.showStatus();

// battling/testing methods
squirtle.showStatus();
console.log("-----------------");
pikachu.showStatus();
console.log("-----------------");
pikachu.attack(3, squirtle);
console.log("-----------------");
squirtle.showStatus();
console.log("-----------------");
pikachu.showStatus();
console.log("-----------------");
pikachu.getMagic(0, squirtle);
console.log("-----------------");
squirtle.showStatus();
console.log("-----------------");
pikachu.showStatus();
pikachu.attack(2, squirtle);
console.log("-----------------");
squirtle.showStatus();
console.log("-----------------");
pikachu.showStatus();
pikachu.getMagic(0, squirtle);
console.log("-----------------");
squirtle.showStatus();
console.log("-----------------");
pikachu.showStatus();
pikachu.attack(2, squirtle);
console.log("-----------------");
squirtle.showStatus();
console.log("-----------------");
pikachu.showStatus();
console.log("squirtle says, 'you cant kill me that easily, mwhuhahahha!!!!'");
squirtle.getHealth(1);
console.log("-----------------");
squirtle.showStatus();
console.log("-----------------");
pikachu.showStatus();
squirtle.attack(3, pikachu);
console.log("-----------------");
squirtle.showStatus();
console.log("-----------------");
pikachu.showStatus();

// animation test

// function animateDots() {
//   let string = ".";
//   // console.log(this)
//   const interval = setInterval(() => {
//     // console.clear();
//     // process.stdout.clearLine(); // clear current text
//     process.stdout.cursorTo(0); // move cursor to beginning of line
//     string += " .";
//     // console.log(string);
//     process.stdout.write(string);
//   }, 100);
//   setTimeout(() => clearInterval(interval), 4000);
// }
// animateDots();

// setTimeout(() => {}, 40);
// // let spaces = "";
// // let arr = ["|", "/", "\\"];
// // let counter = 1;
// let animation2 = setInterval(() => {
//   console.clear();
//   const i = counter % 3;
//   console.log(" +-------+ ");
//   console.log(" | o   o | ");
//   console.log(" |  www  | ");
//   console.log(" +-------+ ");
//   spaces += " ";
//   counter++;
//   if (spaces.length > 100) spaces = "";
// }, 1000);

// setTimeout(() => {}, 40);
// let spaces = "";
// let arr = ["|", "/", "\\"];
// let counter = 1;
// let animation = setInterval(() => {
//   console.clear();
//   const i = counter % 3;
//   console.log(spaces + ",___,");
//   console.log(spaces + "{o,o}");
//   console.log(spaces + arr[i] + ")_)");
//   console.log(spaces + ' ")"');
//   spaces += " ";
//   counter++;
//   if (spaces.length > 100) spaces = "";
// }, 100);
