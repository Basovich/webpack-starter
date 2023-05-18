import {getLog} from "../utils/getLog";

window.addEventListener('DOMContentLoaded', function () {
  getLog('home');
  console.log(123)
  const titles = document.querySelectorAll('.h1');

  titles.forEach(title => {
    console.log(`titles: ${title.textContent}`)
  });

  [...titles].forEach(title => {
    console.log(`[...titles]: ${title.textContent}`)
  });

  class User {
    constructor(name) {
      this.name = name;
    }
    sayHi() {
      console.log(this.name);
    }
  }

  let user = new User("Іван");
  user.sayHi();
})