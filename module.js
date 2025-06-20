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

  CONFIG.elevationruler.SPEED.useFontAwesome = true;
  CONFIG.elevationruler.SPEED.terrainSymbol = "\uf071";

  function keyForValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  /**
   * Given a token, retrieve its base speed.
   * @param {Token} token                   Token whose speed is required
   * @returns {number} Distance, in grid units
   */
  CONFIG.elevationruler.SPEED.tokenSpeed = function (token, movementType) {
    movementType ??= token.movementType;
    const speed = foundry.utils.getProperty(
      token,
      CONFIG.elevationruler.SPEED.ATTRIBUTES[
        keyForValue(CONFIG.elevationruler.MOVEMENT_TYPES, movementType)
      ]
    );
    const defaultSpeed = foundry.utils.getProperty(
      token,
      CONFIG.elevationruler.SPEED.ATTRIBUTES[
        keyForValue(
          CONFIG.elevationruler.MOVEMENT_TYPES,
          CONFIG.elevationruler.MOVEMENT_TYPES.WALK
        )
      ]
    );
    if (movementType === CONFIG.elevationruler.MOVEMENT_TYPES.TELEPORT) {
      return speed ? 100000 : defaultSpeed;
    } else {
      if (speed === null) return null;
      return Number(speed);
    }
  };
});
