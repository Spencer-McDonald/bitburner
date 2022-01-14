/** @param {NS} ns **/
"use strict";

export async function main(ns) {
  const timeCovert = function (seconds) {
    totalMinutes = Math.round(seconds) / 60;
    totalSeconds = Math.round(seconds) % 60;
    return `${totalMinutes}m ${seconds}s`;
  };

  ns.tprint(`\n ʜᴀᴄᴋʟᴏᴏᴘ \n`);

  const targetArray = ns.scan();
  // ns.tprint(targetArray)

  for (const item of targetArray) {
    let hackingLevel = ns.getHackingLevel();
    const serverLevel = ns.getServerRequiredHackingLevel(item);
    const hackingChance = Math.round(ns.hackAnalyzeChance(item) * 100);
    const hackingTime = Math.round(ns.getHackTime(item) / 1000);

    if (serverLevel < hackingLevel && hackingChance > 65) {
      ns.tprint(
        `Hacking ${item} --- ${hackingTime}s | ${hackingChance}% Chance`
      );
      ns.tprint(`-----------------------------------------------`);

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
      ns.tprint(`Current hacking level: ${hackingLevel}`);
      ns.tprint(``);
    } else {
      ns.tprint(
        `Hacking level (${hackingLevel}) too low for ${item}:${serverLevel}`
      );
      ns.tprint(
        `Weakening target: ${item} | ${timeCovert(ns.getWeakenTime(item))}s`
      );

      while (serverLevel >= hackingLevel || ns.hackAnalyzeChance(item) < 65) {
        await ns.weaken(item);
        ns.tprint(`Server weakened ${ns.getServerRequiredHackingLevel(item)}`);
        ns.tprint(
          `Current hacking chance: ${ns.hackAnalyzeChance(
            item
          )}% (Will continue at < 65%)`
        );
      }
    }
  }
}
````````````````````;
