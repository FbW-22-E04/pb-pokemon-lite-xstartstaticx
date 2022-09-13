/**
 *                  things to do still:
 * 0. ENEMY ATTACKS BACK RANDOMLY????
 * 1. when a pokemon is dead, they stay dead. || "you win, play again?"
 * 2. save file? load file?
 * 2. if - max health > max health, return normal max health. (dont exceed max health, max magic?)
 * 4. make colors for pokemon name, another color for word status, hp, mp
 * pokemon attack etc.
 * 5. animate after everything else is done / when have spare time
 * 7. animate read out text in a line progressing by character, and after each line, hit "enter" to confirm, continue prompt
 *
 * 3. after game over/you win - play again -comes, do you gain exp? do you gain levels? do you evolve after enough levels?
 * 6. optional, maybe have pokeballs and try to catch pokemon as well?
 */
//  Reset = "\x1b[0m"
//  Bright = "\x1b[1m"
//  Dim = "\x1b[2m"
//  Underscore = "\x1b[4m"
//  Blink = "\x1b[5m"
//  Reverse = "\x1b[7m"
//  Hidden = "\x1b[8m"

//  FgBlack = "\x1b[30m"
//  FgRed = "\x1b[31m"
//  FgGreen = "\x1b[32m"
//  FgYellow = "\x1b[33m"
//  FgBlue = "\x1b[34m"
//  FgMagenta = "\x1b[35m"
//  FgCyan = "\x1b[36m"
//  FgWhite = "\x1b[37m"

//  BgBlack = "\x1b[40m"
//  BgRed = "\x1b[41m"
//  BgGreen = "\x1b[42m"
//  BgYellow = "\x1b[43m"
//  BgBlue = "\x1b[44m"
//  BgMagenta = "\x1b[45m"
//  BgCyan = "\x1b[46m"
//  BgWhite = "\x1b[47m"
//  console.log("\x1b[36m", "sometext", "\x1b[0m");

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
      `\x1b[36m\x1b[1m\x1b[4m${this.name}'s \x1b[33mstatus:\x1b[0m \n \x1b[32m\x1b[1mHP:\x1b[0m ${this.health} \n \x1b[32m\x1b[1mMP:\x1b[0m ${this.magic} \n`
    );
  }

  attack(idx, opponent) {
    if (this.magic >= this.skills[idx].magicRequired) {
      this.magic -= this.skills[idx].magicRequired;

      console.log(
        `\x1b[36m${this.name}\x1b[0m used \x1b[31m${this.skills[idx].attackName}\x1b[0m \x1b[32msuccessfully!\x1b[0m`
      );
      console.log("...");
      opponent.health -= this.skills[idx].attackDamage;
      console.log(
        `\x1b[31m${opponent.name} received ${this.skills[idx].attackDamage} damage!!\x1b[0m \n`
      );

      if (opponent.health <= 0) {
        console.log("...");
        console.log(`${opponent.name} fainted!`);
        return (opponent.health = 0);
      }
    } else {
      console.log(
        "\x1b[1m\x1b[31mNot enough magic, cannot launch attack!\x1b[0m \n"
      );
    }
  }

  getMagic(idx) {
    this.magic += this.skills[idx].magicRecovered;
    console.log(
      `\x1b[36m${this.name}\x1b[0m used \x1b[32m${this.skills[idx].attackName} successfully!\x1b[0m`
    );
    console.log("...");
    console.log(
      `\x1b[36m${this.name}\x1b[0m \x1b[32mrecovered ${this.skills[idx].magicRecovered} MP!!\x1b[0m \n`
    );
  }

  getHealth(idx) {
    this.health += this.skills[idx].healthRecovered;
    console.log(
      `\x1b[36m${this.name}\x1b[0m used \x1b[32m${this.skills[idx].attackName} successfully!\x1b[0m`
    );
    console.log("...");
    console.log(
      `\x1b[36m${this.name}\x1b[0m \x1b[32mrecovered ${this.skills[idx].healthRecovered} HP!!\x1b[0m \n`
    );
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
let mpGrowl = new mpSkill("MP Growl", 0, 60);
let mpTackle = new mpSkill("MP Tackle", 0, 60);
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
// squirtle.showStatus();
// console.log("-----------------");
// pikachu.showStatus();
// console.log("-----------------");
// pikachu.attack(3, squirtle);
// console.log("-----------------");
// squirtle.showStatus();
// console.log("-----------------");
// pikachu.showStatus();
// console.log("-----------------");
// pikachu.getMagic(0);
// console.log("-----------------");
// squirtle.showStatus();
// console.log("-----------------");
// pikachu.showStatus();
// pikachu.attack(2, squirtle);
// console.log("-----------------");
// squirtle.showStatus();
// console.log("-----------------");
// pikachu.showStatus();
// pikachu.getMagic(0);
// console.log("-----------------");
// squirtle.showStatus();
// console.log("-----------------");
// pikachu.showStatus();
// pikachu.attack(2, squirtle);
// console.log("-----------------");
// squirtle.showStatus();
// console.log("-----------------");
// pikachu.showStatus();
// console.log("squirtle says, 'you cant kill me that easily, mwhuhahahha!!!!'");
// squirtle.getHealth(1);
// console.log("-----------------");
// squirtle.showStatus();
// console.log("-----------------");
// pikachu.showStatus();
// squirtle.attack(3, pikachu);
// console.log("-----------------");
// squirtle.showStatus();
// console.log("-----------------");
// pikachu.showStatus();

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

console.clear();

function playGame() {
  const readLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readLine.question(
    "\x1b[1mPlease Select \x1b[36ma Pokemon: \n \x1b[33m0 - Pikachu \n \x1b[32m1 - Bulbasaur \n \x1b[34m2 - Squirtle \n \x1b[31m3 - Charmander\x1b[0m \n ",
    (answer) => {
      // User chooses Pikachu / Enemy is Bulbasaur
      if (answer == 0) {
        console.log("You chose \x1b[36mPikachu!\x1b[0m \n");
        readLine.question(
          "\x1b[1mPlease Select \x1b[31man attack \x1b[37mor \x1b[32mheal your Pokemon: \n 0 - MP Growl \n 1 - HP Heal \n \x1b[31m2 - Spark \n 3 - Thunderbolt\x1b[0m \n ",
          (answer) => {
            // console.log("You chose", answer);

            if (answer == 0) {
              console.log("You chose \x1b[32mMP Growl\x1b[0m \n");
              pikachu.getMagic(0);
              bulbasaur.getMagic(0);
              pikachu.showStatus();
              bulbasaur.showStatus();
              readLine.close();

              playGame();
            }
            if (answer == 1) {
              console.log("You chose \x1b[32mHP Heal\x1b[0m \n");
              pikachu.getHealth(1);
              bulbasaur.getMagic(0);
              pikachu.showStatus();
              bulbasaur.showStatus();
              readLine.close();

              playGame();
            }
            if (answer == 2) {
              console.log("You chose \x1b[31mSpark\x1b[0m \n");
              readLine.question(
                "\x1b[1mPlease Select \x1b[31man opponent: \n \x1b[32m0 - Bulbasaur \n \x1b[34m1 - Squirtle \n \x1b[31m2 - Charmander\x1b[0m \n ",
                (answer) => {
                  if (answer == 0) {
                    pikachu.showStatus();
                    bulbasaur.showStatus();
                    pikachu.attack(2, bulbasaur);
                    if (bulbasaur.health > 0) {
                      bulbasaur.attack(2, pikachu);
                    }
                    pikachu.showStatus();
                    bulbasaur.showStatus();
                    if (pikachu.health <= 0) {
                      console.log("LOSER!");
                    } else if (bulbasaur.health <= 0) {
                      console.log("YOU WIN!");
                    } else {
                      readLine.close();

                      playGame();
                    }
                  }
                  if (answer == 1) {
                  }
                  if (answer == 2) {
                  }
                  // readLine.close();
                }
              );
            }
            if (answer == 3) {
              console.log("You chose \x1b[31mThunderbolt\x1b[0m \n");
              readLine.question(
                "\x1b[1mPlease Select \x1b[31man opponent: \n \x1b[32m0 - Bulbasaur \n \x1b[34m1 - Squirtle \n \x1b[31m2 - Charmander\x1b[0m \n ",
                (answer) => {
                  if (answer == 0) {
                    pikachu.showStatus();
                    bulbasaur.showStatus();
                    pikachu.attack(3, bulbasaur);
                    if (bulbasaur.health > 0) {
                      bulbasaur.getHealth(1);
                    }
                    pikachu.showStatus();
                    bulbasaur.showStatus();
                    if (pikachu.health <= 0) {
                      console.log("LOSER!");
                    } else if (bulbasaur.health <= 0) {
                      console.log("YOU WIN!");
                    } else {
                      readLine.close();

                      playGame();
                    }
                  }
                  if (answer == 1) {
                  }
                  if (answer == 2) {
                  }
                  // readLine.close();
                }
              );
            }

            // readLine.close();
          }
        );
      }
      // User chooses Bulbasaur / Enemy is Pikachu
      if (answer == 1) {
        console.log("You chose \x1b[36mBulbasaur!\x1b[0m \n");
        readLine.question(
          "\x1b[1mPlease Select \x1b[31man attack \x1b[37mor \x1b[32mheal your Pokemon: \n 0 - MP Growl \n 1 - HP Heal \n \x1b[31m2 - Leech Seed \n 3 - Solar Beam\x1b[0m \n ",
          (answer) => {
            if (answer == 0) {
              console.log("You chose \x1b[32mMP Growl\x1b[0m \n");
              bulbasaur.getMagic(0);
              pikachu.getMagic(0);
              bulbasaur.showStatus();
              pikachu.showStatus();
              readLine.close();
              playGame();
            }
            if (answer == 1) {
              console.log("You chose \x1b[32mHP Heal\x1b[0m \n");
              bulbasaur.getHealth(1);
              pikachu.getMagic(0);
              bulbasaur.showStatus();
              pikachu.showStatus();
              readLine.close();
              playGame();
            }
            if (answer == 2) {
              console.log("You chose \x1b[31mLeech Seed\x1b[0m \n");
              readLine.question(
                "\x1b[1mPlease Select \x1b[31man opponent: \n \x1b[33m0 - Pikachu \n \x1b[34m1 - Squirtle \n \x1b[31m2 - Charmander\x1b[0m \n ",
                (answer) => {
                  if (answer == 0) {
                    // const random = Math.floor(Math.random() * 2 + 2);
                    bulbasaur.showStatus();
                    pikachu.showStatus();
                    bulbasaur.attack(2, pikachu);
                    if (pikachu.health > 0) {
                      pikachu.attack(2, bulbasaur);
                      // pikachu.attack(random, bulbasaur);
                      // pikachu.getMagic(0);
                    }
                    bulbasaur.showStatus();
                    pikachu.showStatus();
                    if (bulbasaur.health <= 0) {
                      console.log("LOSER!");
                    } else if (pikachu.health <= 0) {
                      console.log("YOU WIN!");
                    } else {
                      readLine.close();
                      playGame();
                    }
                  }
                  if (answer == 1) {
                  }
                  if (answer == 2) {
                  }
                }
              );
            }
            if (answer == 3) {
              console.log("You chose \x1b[31mSolar Beam\x1b[0m \n");
              readLine.question(
                "\x1b[1mPlease Select \x1b[31man opponent: \n \x1b[33m0 - Pikachu \n \x1b[34m1 - Squirtle \n \x1b[31m2 - Charmander\x1b[0m \n ",
                (answer) => {
                  if (answer == 0) {
                    bulbasaur.showStatus();
                    pikachu.showStatus();
                    bulbasaur.attack(3, pikachu);
                    if (pikachu.health > 0) {
                      pikachu.getHealth(1);
                    }
                    bulbasaur.showStatus();
                    pikachu.showStatus();
                    if (bulbasaur.health <= 0) {
                      console.log("LOSER!");
                    } else if (pikachu.health <= 0) {
                      console.log("YOU WIN!");
                    } else {
                      readLine.close();
                      playGame();
                    }
                  }
                  if (answer == 1) {
                  }
                  if (answer == 2) {
                  }
                }
              );
            }
          }
        );
      }
      // User chooses Squirtle / Enemy is Charmander
      if (answer == 2) {
        console.log("You chose \x1b[36mSquirtle!\x1b[0m \n");
        readLine.question(
          "\x1b[1mPlease Select \x1b[31man attack \x1b[37mor \x1b[32mheal your Pokemon: \n 0 - MP Tackle \n 1 - HP Recover \n \x1b[31m2 - Water Gun \n 3 - Hydro Pump\x1b[0m \n ",
          (answer) => {
            if (answer == 0) {
              console.log("You chose \x1b[32mMP Tackle\x1b[0m \n");
              squirtle.getMagic(0);
              charmander.getMagic(0);
              squirtle.showStatus();
              charmander.showStatus();
              readLine.close();
              playGame();
            }
            if (answer == 1) {
              console.log("You chose \x1b[32mHP Recover\x1b[0m \n");
              squirtle.getHealth(1);
              charmander.getMagic(0);
              squirtle.showStatus();
              charmander.showStatus();
              readLine.close();
              playGame();
            }
            if (answer == 2) {
              console.log("You chose \x1b[31mWater Gun\x1b[0m \n");
              readLine.question(
                "\x1b[1mPlease Select \x1b[31man opponent: \n \x1b[33m0 - Pikachu \n \x1b[32m1 - Bulbasaur \n \x1b[31m2 - Charmander\x1b[0m \n ",
                (answer) => {
                  if (answer == 0) {
                  }
                  if (answer == 1) {
                  }
                  if (answer == 2) {
                    squirtle.showStatus();
                    charmander.showStatus();
                    squirtle.attack(2, charmander);
                    if (charmander.health > 0) {
                      charmander.attack(2, squirtle);
                    }
                    squirtle.showStatus();
                    charmander.showStatus();
                    if (squirtle.health <= 0) {
                      console.log("LOSER!");
                    } else if (charmander.health <= 0) {
                      console.log("YOU WIN!");
                    } else {
                      readLine.close();
                      playGame();
                    }
                  }
                }
              );
            }
            if (answer == 3) {
              console.log("You chose \x1b[31mHydro Pump\x1b[0m \n");
              readLine.question(
                "\x1b[1mPlease Select \x1b[31man opponent: \n \x1b[33m0 - Pikachu \n \x1b[32m1 - Bulbasaur \n \x1b[31m2 - Charmander\x1b[0m \n ",
                (answer) => {
                  if (answer == 0) {
                  }
                  if (answer == 1) {
                  }
                  if (answer == 2) {
                    squirtle.showStatus();
                    charmander.showStatus();
                    squirtle.attack(3, charmander);
                    if (charmander.health > 0) {
                      charmander.getHealth(1);
                    }
                    squirtle.showStatus();
                    charmander.showStatus();
                    if (squirtle.health <= 0) {
                      console.log("LOSER!");
                    } else if (charmander.health <= 0) {
                      console.log("YOU WIN!");
                    } else {
                      readLine.close();
                      playGame();
                    }
                  }
                }
              );
            }
          }
        );
      }
      // User chooses Charmander / Enemy is Squirtle
      if (answer == 3) {
        console.log("You chose \x1b[36mCharmander!\x1b[0m \n");
        readLine.question(
          "\x1b[1mPlease Select \x1b[31man attack \x1b[37mor \x1b[32mheal your Pokemon: \n 0 - MP Tackle \n 1 - HP Recover \n \x1b[31m2 - Ember \n 3 - Flamethrower\x1b[0m \n ",
          (answer) => {
            if (answer == 0) {
              console.log("You chose \x1b[32mMP Tackle\x1b[0m \n");
              charmander.getMagic(0);
              squirtle.getMagic(0);
              charmander.showStatus();
              squirtle.showStatus();
              readLine.close();
              playGame();
            }
            if (answer == 1) {
              console.log("You chose \x1b[32mHP Recover\x1b[0m \n");
              charmander.getHealth(1);
              squirtle.getMagic(0);
              charmander.showStatus();
              squirtle.showStatus();
              readLine.close();
              playGame();
            }
            if (answer == 2) {
              console.log("You chose \x1b[31mEmber\x1b[0m \n");
              readLine.question(
                "\x1b[1mPlease Select \x1b[31man opponent: \n \x1b[33m0 - Pikachu \n \x1b[32m1 - Bulbasaur \n \x1b[34m2 - Squirtle\x1b[0m \n ",
                (answer) => {
                  if (answer == 0) {
                  }
                  if (answer == 1) {
                  }
                  if (answer == 2) {
                    charmander.showStatus();
                    squirtle.showStatus();
                    charmander.attack(2, squirtle);
                    if (squirtle.health > 0) {
                      squirtle.attack(2, charmander);
                    }
                    charmander.showStatus();
                    squirtle.showStatus();
                    if (charmander.health <= 0) {
                      console.log("LOSER!");
                    } else if (squirtle.health <= 0) {
                      console.log("YOU WIN!");
                    } else {
                      readLine.close();
                      playGame();
                    }
                  }
                }
              );
            }
            if (answer == 3) {
              console.log("You chose \x1b[31mFlamethrower\x1b[0m \n");
              readLine.question(
                "\x1b[1mPlease Select \x1b[31man opponent: \n \x1b[33m0 - Pikachu \n \x1b[32m1 - Bulbasaur \n \x1b[34m2 - Squirtle\x1b[0m \n ",
                (answer) => {
                  if (answer == 0) {
                  }
                  if (answer == 1) {
                  }
                  if (answer == 2) {
                    charmander.showStatus();
                    squirtle.showStatus();
                    charmander.attack(3, squirtle);
                    if (squirtle.health > 0) {
                      squirtle.getHealth(1);
                    }
                    charmander.showStatus();
                    squirtle.showStatus();
                    if (charmander.health <= 0) {
                      console.log("LOSER!");
                    } else if (squirtle.health <= 0) {
                      console.log("YOU WIN!");
                    } else {
                      readLine.close();
                      playGame();
                    }
                  }
                }
              );
            }
          }
        );
      }
    }
  );
}
playGame();
