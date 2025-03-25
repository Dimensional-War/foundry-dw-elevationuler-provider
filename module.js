Hooks.once("setup", () => {
  const walk = {
    name: "Walk",
    color: Color.from(0x00ff00),
    multiplier: 1
  };
  const run = {
    name: "Dash",
    color: Color.from(0xff8000),
    multiplier: 2
  };
  const max = {
    name: "Maximum",
    color: Color.from(0xff0000),
    multiplier: Infinity
  };

  CONFIG.elevationruler.SPEED.CATEGORIES.splice(
    0,
    CONFIG.elevationruler.SPEED.CATEGORIES.length,
    ...[walk, run, max]
  );

  CONFIG.elevationruler.MOVEMENT_TYPES.SWIM = 3; // Increment by 1 from the highest-valued movement type
  CONFIG.elevationruler.MOVEMENT_TYPES.ACROBATICS = 4;
  CONFIG.elevationruler.MOVEMENT_TYPES.TELEPORT = 5;

  // These labels are from Font Awesome
  CONFIG.elevationruler.SPEED.ATTRIBUTES.WALK =
    "actor.system.props.walkingSpeed";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.BURROW =
    "actor.system.props.burrowingSpeed";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.FLY = "actor.system.props.flyingSpeed";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.SWIM =
    "actor.system.props.swimmingSpeed";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.ACROBATICS =
    "actor.system.props.acrobaticsSpeed";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.TELEPORT =
    "actor.system.props.hasTeleport";

  CONFIG.elevationruler.MOVEMENT_BUTTONS[
    CONFIG.elevationruler.MOVEMENT_TYPES.SWIM
  ] = "person-swimming";

  CONFIG.elevationruler.MOVEMENT_BUTTONS[
    CONFIG.elevationruler.MOVEMENT_TYPES.ACROBATICS
  ] = "person-running-fast";

  CONFIG.elevationruler.MOVEMENT_BUTTONS[
    CONFIG.elevationruler.MOVEMENT_TYPES.TELEPORT
  ] = "portal-enter";

  // CONFIG.elevationruler.pathfindingCheckTerrains = true;

  // CONFIG.elevationruler.SPEED.useFontAwesome = true;
  // CONFIG.elevationruler.SPEED.terrainSymbol = "\uf071";

  // /**
  //  * Given a token, get the maximum distance the token can travel for a given type.
  //  * Distance measured from 0, so types overlap. E.g.
  //  *   WALK (x1): Token speed 25, distance = 25.
  //  *   DASH (x2): Token speed 25, distance = 50.
  //  *
  //  * @param {Token} token                   Token whose speed should be used
  //  * @param {SpeedCategory} speedCategory   Category for which the maximum distance is desired
  //  * @param {number} [tokenSpeed]           Optional token speed to avoid repeated lookups
  //  * @returns {number}
  //  */
  // CONFIG.elevationruler.SPEED.maximumCategoryDistance = function (
  //   token,
  //   speedCategory,
  //   tokenSpeed
  // ) {
  //   tokenSpeed ??= CONFIG.elevationruler.SPEED.tokenSpeed(token);
  //   if (token.actor.system.props.hasParkour) {
  //     return speedCategory.multiplier * tokenSpeed;
  //   } else {
  //     return speedCategory.multiplier * tokenSpeed;
  //   }
  // };

  /**
   * Given a token, retrieve its base speed.
   * @param {Token} token                   Token whose speed is required
   * @returns {number} Distance, in grid units
   */
  CONFIG.elevationruler.SPEED.tokenSpeed = function (token) {
    const speedAttribute =
      CONFIG.elevationruler.SPEED.ATTRIBUTES[token.movementType] ??
      CONFIG.elevationruler.SPEED.ATTRIBUTES.WALK;
    const speed = Number(foundry.utils.getProperty(token, speedAttribute));
    if (speedAttribute === CONFIG.elevationruler.MOVEMENT_TYPES.TELEPORT) {
      return Boolean(foundry.utils.getProperty(token, speedAttribute))
        ? Infinity
        : speed;
    } else {
      return speed;
    }
  };
});
