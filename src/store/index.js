import { createStore } from 'vuex'
import cards from "./modules/cards";
import login from "./modules/login";
import user from "./modules/user";

export default createStore({

  modules: {
    cards,
    login,
    user
  }
})
