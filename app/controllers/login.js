import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      return this.get('session').authenticate('authenticator:oauth2', identification, password).then((memes)=>{

        console.log(memes);
      }).catch((reason) => {
        console.log(reason);
        alert("Usuario ou senha errados!!!!");
      });
    }
  }
});
