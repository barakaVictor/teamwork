const dotenv = require('dotenv')

class Container {
  /**
   * 
   * @param {Object} options - an object that carries configuration information for the container.
   * It sets the environment within which services and the application within the container will execute
   */
  constructor(options) {
    /** An object containing service registered with the container */
    this.services = {};

    /**Immediately invoked function to set the environment of operation */
    this.config = (() => {
      if(typeof options !== "undefined" && options.config_path){
        dotenv.config({path: options.config_path});
      }else{
        dotenv.config()
      }
    })();
  }

  /**
   *@param {string} name - the name of the service to register with the container
   *@param {function} callback - the actual logic executed when a service name is called
   */ 
  service(name, callback) {
    Object.defineProperty(this, name, {
      get: () => {
        if (!Object.prototype.hasOwnProperty.call(this.services, name)) {
          this.services[name] = callback(this);
        }
        return this.services[name];
      },
      configurable: true,
      enumerable: true,
    });
    return this;
  }
}

module.exports = Container;
