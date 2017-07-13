/* JAC Group project
 * Coding Bootcamp May-Nov
 *
 * Created 6/8/2017
 * Last edited 6/8/2017
 */

//Player constructor for creating AI
function Player(Name, Image, Pokemon) {
    this.Name = Name;
    this.Image = Image;
    this.Pokemon = Pokemon;
}

//Pokemon constructor
function Pokemon(Name, ImgFront, ImgBack, ImgLarge, HP, EXP, Skills) {
    this.Name = Name;
    this.ImgFront = ImgFront;
    this.ImgBack = ImgBack;
    this.ImgLarge = ImgLarge;
    this.HP = HP;
    this.EXP = EXP;
    this.Skills = Skills;   //skills[];
}

//Pokemon skill constructor
function Skill(skillName, skillDMG) {
    this.skillName = skillName;
    this.skillDMG = skillDMG;
}

//EXAMPLE PLAYER1
/*
exampleSkill1 = new Skill('Bubble', 5);

var examplePokemonList1 = [];
examplePokemonList1.push(new Pokemon('Squirtle', 'https://cdn.bulbagarden.net/upload/3/39/007Squirtle.png', 50, 0, exampleSkill1));

var exampleBag1 = {};

var examplePlayer1 = new Player('bagelxp@gmail.com', 'Bagel', 0, 1, 100, exampleBag1, examplePokemonList1);

//EXAMPLE PLAYER2
var exampleSkillList2 = [];
exampleSkillList2.push(new Skill('Ember', 5));

var examplePokemonList2 = [];
examplePokemonList2.push(new Pokemon('Charmander', 'https://cdn.bulbagarden.net/upload/7/73/004Charmander.png', 50, 0, exampleSkill2));

var exampleBag2 = {};

var examplePlayer2 = new Player('jeremy@gmail.com', 'Jeremy', 0, 1, 100, exampleBag2, examplePokemonList2);

//EXAMPLE PLAYER3
var exampleSkill3 = new Skill('Vine Whip', 5);

var examplePokemon3 = [];
examplePokemonList3.push(new Pokemon('Bulbasaur', 'https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png', 50, 0, exampleSkill3));

var exampleBag3 = {};

var examplePlayer3 = new Player('player3@gmail.com', 'Player3', 0, 1, 100, exampleBag3, examplePokemonList3);
*/
