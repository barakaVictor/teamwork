class Container {
  constructor() {
    this.services = {};
  }

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
