"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Database = use("Database");

class Property extends Model {
  /**
   *
   * cálculo naval de distância através de latitude e longitude conhecido como Haversine.
   *  Esse valor é multiplicado por 6371 que o transforma em quilômetros
   *
   */
  static scopeNearBy(query, latitude, longitude, distance) {
    const haversine = `(6371 * acos(cos(radians(${latitude}))
      * cos(radians(latitude))
      * cos(radians(longitude)
      - radians(${longitude}))
      + sin(radians(${latitude}))
      * sin(radians(latitude))))`;

    return query
      .select("*", Database.raw(`${haversine} as distance`))
      .whereRaw(`${haversine} < ${distance}`);
  }

  /**
   * Um imóvel sempre pertence a um usuário
   */
  user() {
    return this.belongsTo("App/Models/User");
  }

  /**
   * Uma imóvel pode ter várias imagems
   */
  images() {
    return this.hasMany("App/Models/Image");
  }
}

module.exports = Property;
