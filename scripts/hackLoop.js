/** @param {NS} ns **/
"use strict";

export async function main(ns) {
  const hackingLevel = ns.getHackingLevel();

  ns.tprint(`Current hacking level: ${hackingLevel}`);

  const targetArray = ns.scan();
  // ns.tprint(targetArray)

  for (const item of targetArray) {
    // Information Values (Rounded are non-critical.)
    const serverLevel = ns.getServerRequiredHackingLevel(item);
    const hackingChance = Math.round(ns.hackAnalyzeChance(item) * 100);
    const hackingTime = Math.round(ns.getHackTime(item) / 1000);

    if (serverLevel < hackingLevel && hackingChance > 65) {
      ns.tprint(
        `Hacking ${item} --- ${hackingTime}s | ${hackingChance}% Chance`
      );
      ns.tprint(`-----------------------------------------------`);
      // if not root, get.
      if (ns.hasRootAccess(item) == false) {
        ns.nuke(item);
        ns.tprint(`Root access granted for ${item}`);
      } else {
        ns.tprint(`Already have root access.`);
      }

      let earnedMoney = await ns.hack(item);

      ns.tprint(
        `Hack ${
          earnedMoney > 0 ? `Successful` : `Failed`
        } ${earnedMoney} earned.`
      );
      ns.tprint(``);
    } else {
      ns.tprint(`Hacking level too low for ${item}`);
    }
  }
}
