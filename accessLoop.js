// First attempt at script for bitburner.
/*
Goals:
- Scan network, map results.
- Compare security score against current player level.
    - If greater than current ability, remove from map.

- If greater, connect and run NUKE.exe for root access.
- Check current overall health of target.
    - If (security > TBD) weaken
    - If ($ < TBD) grow
    - Else hack 

This is to be run from home first, may deploy on accessed systems later.
Would need to work out how this game handles replication.
*/

// Initial required variables.
let currentHackingLevel = getHackingLevel();
const targets = new Map();

const networkScan = function () {
  targets.set(scan(currentHost));
  console.log(targets);
};
