'use strict';

module.exports = class defaultFilter {
  constructor() {}

  filter(socket, action, data) {
    var filters = socket.filters,
      roles = socket.roles;
    if (!this.filterRole(socket, action, data)) return false;
    if (!this.filterActions(socket, action, data)) return false;
    //if (filters.ids && filters.ids.length > 0 && !this.filterIds(filters.ids, data)) return false;
    return true;
  };

  filterRole(socket, action, data) {
    var roles = socket.roles;
    if (!roles[action]) return false;
    if (roles[action] === 'r' || roles[action] === 'a') {
      return true;
    }
    return false;
  };

  filterActions(socket, action, data) {
    if (!socket.filters.actions) return true;
    if (socket.filters.actions.indexOf(action) !== -1) return true
    return false;
  };

  filterCollections(socket, action, data) {
    var collectionName, collection;
    if (!socket.filters.collections) return true;

    collectionName = action.split('.', 1);
    collection = socket.filters.collections[collectionName];
    if (!collection) return true;
    if (collection.indexOf(data.id) !== -1) return true;
    return false;
  };

}
