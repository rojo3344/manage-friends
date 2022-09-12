import { InMemoryDbService } from "angular-in-memory-web-api";


export class FriendsData implements InMemoryDbService {
  createDb() {

    const friends = [
      { id: 1, name: "Henry", age: 40, weight: 245, friends: ["Jean", "Joseph", "Cling"]},
      { id: 2, name: "Brad", age: 42, weight: 235, friends: ["Jeff", "Johnny", "Lavel"]},
      { id: 3, name: "Sha", age: 36, weight: 135, friends: ["Riv", "Corina", "Lee"]},
      { id: 4, name: "Esther", age: 46, weight: 155, friends: ["Ryan", "Rust ", "Junior", "Corina", "Lee"]},
      { id: 5, name: "Tania", age: 34, weight: 135, friends: ["Jeff", "Jean", "Luis", "Fred"]},
      { id: 6, name: "Naomie", age: 32, weight: 125, friends: ["Blia", "Tus", "Renaldo", "Joseph", "Cling"]},
      { id: 7, name: "Rob", age: 44, weight: 235, friends: ["Jeff", "Johnny", "Guerby", "Ricot", "Ricardo", "Ben", "Fred", "Donald"]},
      { id: 8, name: "Rick", age: 52, weight: 265, friends: ["Lev", "Harry ", "Brendon", "Thomas", "Favi"]},
      { id: 9, name: "Oscar", age: 47, weight: 256, friends: ["Mick", "Jordi", "Pau", "Toni"]},
      { id: 10, name: "Jason", age: 57, weight: 235, friends: ["Richard", "Matia", "Lidya"]},
      { id: 11, name: "Biel", age: 40, weight: 235, friends: ["Medi", "Rita", "Xavi"]},
      { id: 12, name: "Ricardo", age: 30, weight: 205, friends: ["Viny", "Lino", "Lopez", "Will", "Mark"]},
    ];

    return { friends };
  }

}
